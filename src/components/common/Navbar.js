import { Row, Col, Container, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import Profile from "./../../images/Profile.png";
import { me } from "../../services/auth";
import "../../styles/navbar.css";

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        me().then((response) => {
            setUser(response);
        }).catch((error) => {
            setUser(null);
        });
    }, []);

    return (
        <Container
            className="navbar-container"
        >
            <Row>
                <Col md={9} className="d-flex"
                    onClick={() => window.location.href = "/"}
                >
                    <p className="navbar-title">Quickest Notes</p>
                </Col>
                <Col md={2} className="d-flex">
                    <Dropdown
                        className="navbar-dropdown"
                    >
                        <Dropdown.Toggle
                            className="navbar-dropdown-toggle"
                        >
                            <img className="navbar-img"
                                alt="Profile Menu"
                                src={Profile}
                            />
                        </Dropdown.Toggle>
                        {
                            <Dropdown.Menu>
                                {
                                    user ?
                                        <>
                                            <Dropdown.Item href="notes" className="navbar-item">
                                                Notes
                                            </Dropdown.Item>
                                            <Dropdown.Item href="logout" className="navbar-item">
                                                Logout
                                            </Dropdown.Item>
                                        </>
                                        :
                                        <>
                                            <Dropdown.Item href="login" className="navbar-item">
                                                Login
                                            </Dropdown.Item>
                                            <Dropdown.Item href="register" className="navbar-item">
                                                Register
                                            </Dropdown.Item>
                                        </>
                                }

                            </Dropdown.Menu>
                        }

                    </Dropdown>
                </Col>
            </Row>
        </Container>
    );
}