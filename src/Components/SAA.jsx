import { useState } from 'react';
import { Redirect } from "react-router-dom";
import saaImage from '../Img/saa.jpg';

const SAA = (props) => {
    // Object properties 
    const [myAtt, setMyAtt] = useState({
        hypotenuse: 0,
        adjacent: 0,
        opposite: 0,
        angleA: 0,
        angleC: 0,
        angleB: 0,
        classification: "",
        errorMessage: ""
    })
    // Error flag
    const [error, setError] = useState({ foundError: false })
    // Report flag
    const [redirecter, setRedirect] = useState({ redirect: false })
    // Setting props
    const updateAtt = e => {
        setMyAtt({...myAtt, [e.target.name]: e.target.value});
    }
    // Validation and error handeling 
    const createAttFunction = e => {
        e.preventDefault();
        // Validation
        if(myAtt.hypotenuse <= 0 || myAtt.angleB <= 0 || myAtt.angleC <= 0){
            myAtt.errorMessage = "All inputs must be a positive number greater then 0";
            props.setAtt(myAtt);
            return setError({ foundError: true });
        }
        // Error handling
        if(myAtt.angleB + myAtt.angleC <= 180){
            myAtt.errorMessage = "Angles must be less then 180 degrees";
            props.setAtt(myAtt);
            return setError({ foundError: true });
        }
        // Aglo to find sides 
        myAtt.angleA = 180 - myAtt.angleB - myAtt.angleC;
		var sinA = Math.sin(myAtt.angleA / 180 * Math.PI);
		var sinB = Math.sin(myAtt.angleB / 180 * Math.PI);
		var sinC = Math.sin(myAtt.angleC / 180 * Math.PI);
		var ratio = myAtt.hypotenuse / sinB;
		myAtt.opposite = ratio * sinA;
		myAtt.adjacent = ratio * sinC;
        // Classification
        if (myAtt.adjacent == myAtt.hypotenuse && myAtt.adjacent == myAtt.opposite) myAtt.classification = "Equilateral";
        else if(myAtt.adjacent == myAtt.hypotenuse) myAtt.classification = "Isosceles";
        else if(myAtt.hypotenuse == myAtt.opposite) myAtt.classification = "Isosceles";
        else if(myAtt.adjacent == myAtt.opposite) myAtt.classification = "Isosceles";
        else myAtt.classification = "Scalence";
        // Set props
        props.setAtt(myAtt);
        // Flip report flag 
        setRedirect({ redirect: true });
    }
    return (
        <div className="container">            
            <form onSubmit={createAttFunction}>
                <div><label htmlFor="hypotenuse">Enter Length of side A of the triangle in millimetres</label></div>
                <div><input type="text" name="hypotenuse" onChange={updateAtt}/><span> MM</span></div>
                <div><label htmlFor="angleB">Enter the Angle B of the triangle in degrees</label></div>
                <div><input type="text" name="angleB" onChange={updateAtt}/><span> &#176;</span></div>
                <div><label htmlFor="angleC">Enter the Angle C of the triangle in degrees</label></div>
                <div><input type="text" name="angleC" onChange={updateAtt}/><span> &#176;</span></div>
                <div><input className="btn btn-outline-primary buttonPad" type="submit" value="Submit" /><img src={saaImage} /></div>
            </form>
            {error.foundError ? (<Redirect push to = "/error"/>) : null}
            {redirecter.redirect ? (<Redirect push to = "/report"/>) : null}
        </div>
    );
}

export default SAA;