import { Row, Col, Container, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import AddCategory from "../common/AddCategory";
import ManageNote from "../common/ManageNote";
import SwitchButton from "../common/SwitchButton";
import { CategoryBadge } from "../common/CategoryBadge";
import { NoteCard } from "../common/NoteCard";
import { getNotes } from "../../services/note";
import { getCategories } from "./../../services/category";
import Loading from "../common/Loading";

import "./../../styles/notes.css";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [notesType, setNotesType] = useState("Unarchived"); // ["All", "Archived", "Unarchived"
    const [selectedCategories, setSelectedCategories] = useState([]); // [cat_id, cat_id, ...
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingCategory, setAddingCategory] = useState(false);
    const [addingNote, setAddingNote] = useState(false);

    useEffect(() => {
        setLoading(true);
        Promise.all(
            [getNotes(notesType, selectedCategories), getCategories()]
        ).then(data => {
            setNotes(data[0]);
            setCategories(data[1]);
            setLoading(false);
        }).catch(error => {
            toast.error("Error loading notes");
            window.location.href = "/";
            setLoading(false);
        });
    }, [notesType, selectedCategories]);

    return (
        <>
            {
                loading ? <Loading /> :
                    <>
                        <Container className="contents-container">
                            <Row>
                                <Col md={3} className="categories-container text-center">
                                    <p className="section-title">
                                        Categories
                                    </p>
                                    <p>
                                        Click each filter to filter notes, when multiple filters are clicked, notes that have any of the selected categories will be shown.
                                    </p>
                                    {
                                        addingCategory ?
                                            <AddCategory
                                                onCategoryAdd={(category) => {
                                                    setCategories([...categories, category]);
                                                    setAddingCategory(false);
                                                }}

                                                onCancel={() => setAddingCategory(false)}
                                            />
                                            :
                                            <Button onClick={() => setAddingCategory(true)} className="general-button">
                                                + Add Category
                                            </Button>
                                    }
                                    <Row className="text-center">
                                        {
                                            categories.map((category) => <Col lg={6} key={"cat_bad_" + category.cat_id}>
                                                <CategoryBadge
                                                    category={category}
                                                    selected={selectedCategories.includes(category.cat_id)}
                                                    onCategoryDelete={() => {
                                                        setCategories(categories.filter(c => c.cat_id !== category.cat_id));

                                                        setNotes(notes.map(note => {
                                                            note.categories = note.categories.filter(c => c.cat_id !== category.cat_id);
                                                            return note;
                                                        }));
                                                    }}
                                                    onCategoryClick={() => {
                                                        if (selectedCategories.includes(category.cat_id))
                                                            setSelectedCategories(selectedCategories.filter(c => c !== category.cat_id));
                                                        else
                                                            setSelectedCategories([...selectedCategories, category.cat_id]);

                                                    }}
                                                />
                                            </Col>
                                            )
                                        }
                                    </Row>
                                </Col>
                                <Col md={9} className="notes-container text-center">
                                    <p className="section-title">
                                        Notes
                                    </p>
                                    <Button onClick={() => {
                                        setAddingNote(true);
                                    }} className="general-button">
                                        + Add Note
                                    </Button>
                                    <SwitchButton
                                        options={[
                                            "All", "Unarchived", "Archived",
                                        ]}
                                        currentValue={notesType}
                                        onChange={setNotesType}
                                    />
                                    <Row>
                                        {
                                            notes.map((note) => {
                                                return (
                                                    <Col lg={4} md={6} sm={6} key={note.note_id}>
                                                        <NoteCard
                                                            note={note}
                                                            categories={categories}
                                                            onNoteDelete={(note) => {
                                                                setNotes(notes.filter(n => n.note_id !== note.note_id));
                                                            }}
                                                            onNoteUpdate={(newNote) => {
                                                                if (newNote.note_archived === note.note_archived || notesType === "All")
                                                                    setNotes(notes.map(n => n.note_id === newNote.note_id ? newNote : n));
                                                                else
                                                                    setNotes(notes.filter(n => n.note_id !== newNote.note_id));
                                                            }}
                                                        />
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                        <ManageNote
                            show={addingNote}
                            categories={categories}
                            onSubmit={(note) => {
                                setNotes([...notes, note]);
                                setAddingNote(false);
                            }}
                            onCancel={() => setAddingNote(false)}
                        />
                    </>
            }
        </>
    );
}