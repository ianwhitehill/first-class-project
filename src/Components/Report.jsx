import React, { useState } from "react";
import sssImage from '../Img/sss.jpg';

const Report = (props) => {
    const{ myForm } = props;
    return (
        <div className="container">
            <h3>Length of side A of the triangle is {myForm.hypotenuse} millimetres</h3>
            <h3>Length of side B of the triangle is {myForm.adjacent} millimetres</h3>
            <h3>Length of side C of the triangle is {myForm.opposite} millimetres</h3>
            <h2>Triangle Classification {myForm.classification}</h2>
            <div><a href="http://localhost:3000/selection" className="btn btn-light buttonPad">Finished</a><img src={sssImage} /></div>
        </div>
    );
} 

export default Report;