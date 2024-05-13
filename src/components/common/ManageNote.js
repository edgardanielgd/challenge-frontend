import { FormGroup, FormLabel, FormText, Button, Form, Col, Row, Container, Modal } from "react-bootstrap";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";

import Loading from "./Loading";
import { noteSchema } from "./../../schemas/notesSchemas"

import Markdown from 'react-markdown'

import { createNote, updateNoteById } from "../../services/note";
import SwitchButton from "./SwitchButton";

export default function ManageNote({ show, note, onSubmit, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        note_name: note ? note.note_name : "",
        note_content: note ? note.note_content : "",
        note_content_type: note ? note.note_content_type : "Plaintext",
        note_archived: note ? note.note_archived : false,
        note_color: note ? note.note_color : "#000000"
    });

    const adding = !note;

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const error = noteSchema.validate(data).error;
        if (error) {
            toast.error(error.details[0].message);
            setLoading(false);
            return;
        }

        if (adding) {
            createNote(data).then((response) => {
                toast.success("Note created successfully");
                onSubmit({
                    ...response,
                    categories: []
                });
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                toast.error("Error creating note");
                setLoading(false);
            });
        } else {
            updateNoteById(note.note_id, data).then((response) => {
                toast.success("Note edited successfully");
                onSubmit({
                    ...response,
                    categories: note.categories
                });
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                toast.error("Error editing note");
                setLoading(false);
            });
        }
    }

    const modalTitle = adding ? "Add Note" : "Edit Note";
    const submitButton = adding ? "Add Note" : "Edit Note";

    return (
        <Modal show={show} onHide={onCancel}>
            {
                loading ? <Loading /> :
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h1 className="subtitle">
                                    {modalTitle}
                                </h1>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Container>
                                    <Row>
                                        <Col>
                                            <FormGroup className="form-control-group">
                                                <FormLabel className="form-control-label">
                                                    Note Title
                                                </FormLabel>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Note Title"
                                                    onChange={(event) => {
                                                        setData({
                                                            ...data,
                                                            note_name: event.target.value
                                                        });
                                                    }}
                                                    value={data.note_name}
                                                />
                                                <FormText>
                                                    Type a note title
                                                </FormText>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup className="form-control-group">
                                                <FormLabel className="form-control-label">
                                                    Note Content Type
                                                </FormLabel>
                                                <SwitchButton
                                                    options={[
                                                        "Plaintext", "Markdown"
                                                    ]}
                                                    currentValue={data.note_content_type}
                                                    onChange={(value) => {
                                                        setData({
                                                            ...data,
                                                            note_content_type: value
                                                        });
                                                    }}
                                                />
                                                <FormText>
                                                    Choose the content type of your note
                                                </FormText>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup className="form-control-group">
                                                <FormLabel className="form-control-label">
                                                    Note Content
                                                </FormLabel>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={10}
                                                    placeholder="Enter Note Content"
                                                    onChange={(event) => {
                                                        setData({
                                                            ...data,
                                                            note_content: event.target.value
                                                        });
                                                    }}
                                                    value={data.note_content}
                                                />
                                                <FormText>
                                                    Write your note content
                                                </FormText>
                                                {
                                                    data.note_content_type === "Markdown" &&
                                                    <div>
                                                        <div className="form-control-label">
                                                            Markdown preview:
                                                        </div>
                                                        <Markdown>{data.note_content}</Markdown>
                                                    </div>
                                                }

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {
                                        !adding && <Row>
                                            <Col>
                                                <FormGroup className="form-control-group">
                                                    <FormLabel className="form-control-label">
                                                        Note Archived State
                                                    </FormLabel>
                                                    <SwitchButton
                                                        options={[
                                                            "Archived", "Unarchived"
                                                        ]}
                                                        currentValue={
                                                            (data.note_archived ? "Archived" : "Unarchived")
                                                        }
                                                        onChange={(value) => {
                                                            setData({
                                                                ...data,
                                                                note_archived: value === "Archived"
                                                            });
                                                        }}
                                                    />
                                                    <FormText>
                                                        Archive or unarchive your note
                                                    </FormText>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    }
                                    <Row>
                                        <Col>
                                            <FormGroup className="form-control-group text-cemter">
                                                <FormLabel className="form-control-label">
                                                    Note Color
                                                </FormLabel>
                                                <HexColorPicker
                                                    className="color-picker"
                                                    color={data.note_color}
                                                    onChange={(color) => {
                                                        setData({
                                                            ...data,
                                                            note_color: color
                                                        });
                                                    }}
                                                />
                                                <FormText>
                                                    Note Color: {data.note_color}
                                                </FormText>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer className="text-center">
                            <Col>
                                <Button onClick={handleSubmit} className="general-button">
                                    {submitButton}
                                </Button>
                                <Button onClick={onCancel} className="general-button">
                                    Close
                                </Button>
                            </Col>
                        </Modal.Footer>
                    </>
            }


        </Modal>
    );
}