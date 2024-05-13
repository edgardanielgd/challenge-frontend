
import { Spinner } from "react-bootstrap";
import React from "react";

export default function Loading() {
    return (
        <div className="loading">
            <div className="loading-spinner">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </div>
    );
}