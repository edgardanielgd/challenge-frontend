import { FormGroup, FormLabel, FormText, Button, Form, Col, Row, Container } from "react-bootstrap";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";
import { createCategory } from "../../services/category";

import { categorySchema } from "./../../schemas/notesSchemas"
import Loading from "./Loading";

export default function AddCategory({ onCategoryAdd, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        cat_name: "",
        cat_color: "#000000"
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const error = categorySchema.validate(data).error;
        if (error) {
            toast.error(error.details[0].message);
            setLoading(false);
            return;
        }

        createCategory(data).then((response) => {
            toast.success("Category created successfully");
            onCategoryAdd(response);
        }).catch((error) => {
            console.log(error);
            toast.error("Error logging-in user");
            setLoading(false);
        });
    }

    return (
        <>
            {
                loading ? <Loading />
                    :
                    <div className="page-blur-background">

                        <Form>
                            <Container>
                                <Row className="text-center">
                                    <Col xs={12}>
                                        <Button onClick={onCancel} className="general-button">
                                            - Cancel
                                        </Button>
                                        <h1 className="subtitle">
                                            Add Category
                                        </h1>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup className="form-control-group">
                                            <FormLabel className="form-control-label">
                                                Category Name
                                            </FormLabel>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Category Name"
                                                onChange={(event) => {
                                                    setData({
                                                        ...data,
                                                        cat_name: event.target.value
                                                    });
                                                }}
                                                value={data.cat_name}
                                            />
                                            <FormText>
                                                Type a cool note category name!
                                            </FormText>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup className="form-control-group text-cemter">
                                            <FormLabel className="form-control-label">
                                                Category Color
                                            </FormLabel>
                                            <HexColorPicker
                                                className="color-picker"
                                                color={data.cat_color}
                                                onChange={(color) => {
                                                    setData({
                                                        ...data,
                                                        cat_color: color
                                                    });
                                                }}
                                            />
                                            <FormText>
                                                Category Color: {data.cat_color}
                                            </FormText>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="text-center">
                                    <Col xs={12}>
                                        <Button onClick={handleSubmit} className="general-button">
                                            + Add
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </div >
            }
        </>

    );
}