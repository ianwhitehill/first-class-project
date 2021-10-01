import React, { useState } from "react";
import ssaImage from '../Img/ssa.jpg';

const SSA = (props) => {
    const { onChangeHandler, myForm } = props;
    const onSubmitHandler = e => {
        e.preventDefault();
        this.props.onChangeHandler(myForm);
    }
    return (
        <div className="container">
            <form onSubmit={onSubmitHandler}>
                <div><label htmlFor="hypotenuse">Enter Length of side A of the triangle in millimetres</label></div>
                <div><input type="text" name="hypotenuse" onChange={onChangeHandler} value={myForm.hypotenuse} /><span> MM</span></div>
                <div><label htmlFor="adjacent">Enter Length of side B of the triangle in millimetres</label></div>
                <div><input type="text" name="adjacent" onChange={onChangeHandler} value={myForm.adjacent} /><span> MM</span></div>
                <div><label htmlFor="leftAngle">Enter the Angle C of the triangle in degrees</label></div>
                <div><input type="text" name="leftAngle" onChange={onChangeHandler}  value={myForm.leftAngle}/><span> &#176;</span></div>
                <div><input className="btn btn-light buttonPad" type="submit" value="Submit" /><img src={ssaImage} /></div>
            </form>
        </div>
    );
}

export default SSA;