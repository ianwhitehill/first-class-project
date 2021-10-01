import React from "react";

const Loading = (props) => {
    return (
        <div className="container text-center">
            <h1 className="loadPad">Triangle Classifier</h1>
            <h2>By Genuen</h2>
            <h2 className="loadPad">Version 1.0</h2>
            <div><a href="http://localhost:3000/selection" className="btn btn-light buttonPad">Load Application</a></div>
            <h3>Copyright 2021 by Genuen LLC</h3>
        </div>
    );
}

export default Loading;