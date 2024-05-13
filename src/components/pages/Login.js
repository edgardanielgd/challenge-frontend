import { FormGroup, FormLabel, FormText, Button, Form, Col, Row, Container } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../services/auth";
import { loginSchema } from "./../../schemas/authSchemas";
import Loading from "../common/Loading";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        identifier: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const error = loginSchema.validate(data).error;
        if (error) {
            toast.error(error.details[0].message);
            setLoading(false);
            return;
        }

        login(data).then((_) => {
            window.location.href = "/";
        }).catch((error) => {
            console.log(error);
            toast.error("Error logging-in user");
            setLoading(false);
        });
    }

    return (
        <>
            {loading ?
                <Loading />
                :
                <div>
                    <h1 className="page-title">
                        Login
                    </h1>

                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <FormGroup className="form-control-group">
                                        <FormLabel className="form-control-label">
                                            Username or Email
                                        </FormLabel>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username"
                                            onChange={(event) => {
                                                setData({
                                                    ...data,
                                                    identifier: event.target.value
                                                });
                                            }}
                                            value={data.identifier}
                                        />
                                        <FormText>
                                            Type your username or email, both of them work!
                                        </FormText>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="form-control-group">
                                        <FormLabel className="form-control-label">
                                            Password
                                        </FormLabel>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
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
                            </Row>
                            <Row className="text-center">
                                <Col xs={12}>
                                    <Button onClick={handleSubmit} className="general-button">
                                        Login
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