import { FormGroup, FormLabel, FormText, Button, Form, Col, Row, Container } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../../services/auth";
import { registerSchema } from "./../../schemas/authSchemas";
import Loading from "../common/Loading";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const error = registerSchema.validate(data).error;
        if (error) {
            toast.error(error.details[0].message);
            setLoading(false);
            return;
        }

        register(data).then((_) => {
            toast.success("User registered successfully");
            window.location.href = "/login";
        }).catch((error) => {
            toast.error("Error registering user");
            setLoading(false);
        });
    }
    return (
        <>
            {
                loading ?
                    <Loading />
                    :
                    <div>
                        <h1 className="page-title">
                            Register
                        </h1>

                        <Form>
                            <Container>
                                <Row>
                                    <Col>
                                        <FormGroup className="form-control-group">
                                            <FormLabel className="form-control-label">
                                                Username
                                            </FormLabel>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter username"
                                                className="form-control"
                                                onChange={(event) => {
                                                    setData({
                                                        ...data,
                                                        username: event.target.value
                                                    });
                                                }}
                                                value={data.username}
                                            />
                                            <FormText>
                                                Type an unique username
                                            </FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className="form-control-group">
                                            <FormLabel className="form-control-label">
                                                E-mail
                                            </FormLabel>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter email"
                                                className="form-control"
                                                onChange={(event) => {
                                                    setData({
                                                        ...data,
                                                        email: event.target.value
                                                    });
                                                }}
                                                value={data.email}
                                            />
                                            <FormText>
                                                Type an unique email
                                            </FormText>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup className="form-control-group">
                                            <FormLabel className="form-control-label">
                                                Password
                                            </FormLabel>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter password"
                                                className="form-control"
                                                onChange={(event) => {
                                                    setData({
                                                        ...data,
                                                        password: event.target.value
                                                    });
                                                }}
                                                value={data.password}
                                            />
                                            <FormText>
                                                Type your password
                                            </FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className="form-control-group">
                                            <FormLabel className="form-control-label">
                                                Password Confirmation
                                            </FormLabel>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter your password again"
                                                className="form-control"
                                                onChange={(event) => {
                                                    setData({
                                                        ...data,
                                                        passwordConfirmation: event.target.value
                                                    });
                                                }}
                                                value={data.passwordConfirmation}
                                            />
                                            <FormText>
                                                Confirm your password
                                            </FormText>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="text-center">
                                        <Button onClick={handleSubmit} className="general-button">
                                            Register
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