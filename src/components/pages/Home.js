import { Button, Col, Row, Container } from "react-bootstrap";
import "./../../styles/home.css";

export default function Home() {
    return (
        <div>
            <h1 className="page-title">
                Home
            </h1>
            <Container>
                <Row>
                    <Col className="text-center">
                        <p className="home-Paragraph">
                            Welcome to Quickest Notes! This is a simple note-taking app that allows you to create, edit, and delete notes. You can also categorize your notes in a color-coded way.
                        </p>
                        <p className="home-Paragraph">
                            To get started click on the Notes link in the profile profile dropdown menu while logged in.
                        </p>
                        <Row>
                            <Col xs={6}>
                                <Button className="general-button home-button" href="/notes">
                                    Already logged in? Go to Notes
                                </Button>
                            </Col>
                            <Col xs={6}>
                                <Button className="general-button home-button" href="/login">
                                    Have an account? Log in
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}