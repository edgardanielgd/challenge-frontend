import { Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import Markdown from "react-markdown";

import { CategoryBadge } from "./CategoryBadge";
import ManageNote from "./ManageNote";
import AddNoteCategory from "./AddNoteCategory";
import { deleteNoteById } from "../../services/note";
import Loading from "./Loading";

export function NoteCard({ note, categories, onNoteDelete, onNoteUpdate }) {
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handeDelete = () => {
        deleteNoteById(note.note_id).then(() => {
            toast.success("Note deleted successfully");
            onNoteDelete(note);
            setLoading(false);
        }
        ).catch((error) => {
            toast.error("Error deleting note");
            setLoading(false);
        });
    }

    // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    var r = parseInt(note.note_color.substr(1, 2), 16);
    var g = parseInt(note.note_color.substr(3, 2), 16);
    var b = parseInt(note.note_color.substr(5, 2), 16);

    return <>
        <div
            className="note-card text-center"
            style={{
                backgroundColor: `rgba(${r},${g},${b},0.2)`
            }}
        >
            <div className="note-card-header"
                style={{
                    backgroundColor: note.note_color
                }}
            />
            <div className="subtitle">
                {note.note_name}
            </div>
            {
                loading ? <Loading /> :
                    <>
                        <Row className="m-2">
                            {
                                note.categories && note.categories.map(category => (
                                    <Col sm={6}>
                                        <CategoryBadge
                                            key={"note_" + note.note_id + "_" + category.cat_id}
                                            category={category}
                                            parentNoteId={note.note_id}
                                            onCategoryDelete={() => {
                                                onNoteUpdate({
                                                    ...note,
                                                    categories: note.categories.filter(c => c.cat_id !== category.cat_id)
                                                });
                                            }}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                        {
                            note.note_content_type === "Markdown" ?
                                <Markdown>{note.note_content}</Markdown>
                                :
                                <p>{note.note_content}</p>
                        }

                        <Button className="general-button button-short" onClick={
                            () => setEditing(true)
                        }>
                            Edit
                        </Button>
                        <AddNoteCategory
                            noteId={note.note_id}
                            categories={categories}
                            onNoteCategoryAdd={(newNoteCategory) => {
                                onNoteUpdate({
                                    ...note,
                                    categories: [
                                        ...note.categories,
                                        categories.find(c => c.cat_id === newNoteCategory.cat_id)
                                    ]
                                });
                            }}
                        />
                        <Button className="general-button button-short" onClick={
                            handeDelete
                        }>
                            Delete
                        </Button>
                    </>
            }
        </div>
        <ManageNote
            show={editing}
            note={note}
            onSubmit={(newNote) => {
                onNoteUpdate(newNote);
                setEditing(false);
            }}
            onCancel={() => setEditing(false)}
        />
    </>
}