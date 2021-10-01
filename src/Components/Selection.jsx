import React from "react";
import { Switch, BrowserRouter, Link } from "react-router-dom";

const Selection = (props) => {
    return (
        <div className="container">
            <h1>Select Mathod for Classification</h1>
            <div><a href="http://localhost:3000/SSS" className="btn btn-light buttonPad">Length of all sides know</a></div>
            <div><a href="http://localhost:3000/SSA" className="btn btn-light buttonPad">Length of Two sides and One Angle</a></div>
            <div><a href="http://localhost:3000/SAA" className="btn btn-light buttonPad">Length of One side and Two Angle</a></div>
        </div>
    );
}

export default Selection;