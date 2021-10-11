import { useState } from 'react';
import { Redirect } from "react-router-dom";
import sssImage from '../Img/sss.jpg';

const SSS = (props) => {
    // Object properties 
    const [myAtt, setMyAtt] = useState({
        hypotenuse: 0,
        adjacent: 0,
        opposite: 0,
        classification: "",
        errorMessage: ""
    })
    // Error Flag
    const [error, setError] = useState({ foundError: false })
    // Report Flag
    const [redirecter, setRedirect] = useState({ redirect: false })
    // Setting props 
    const updateAtt = e => {
        setMyAtt({...myAtt, [e.target.name]: e.target.value});
    }
    // Validation and redirect 
    const createAttFunction = e => {
        e.preventDefault();
        // Error checking 
        if(myAtt.hypotenuse <= 0 || myAtt.adjacent <= 0 || myAtt.opposite <= 0){
            myAtt.errorMessage = "All inputs must be a positive number greater then 0";
            props.setAtt(myAtt);
            // Flipping Error flag
            return setError({ foundError: true });
        }
        // Set classification 
        if (myAtt.adjacent == myAtt.hypotenuse && myAtt.adjacent == myAtt.opposite) myAtt.classification = "Equilateral";
        else if(myAtt.adjacent == myAtt.hypotenuse) myAtt.classification = "Isosceles";
        else if(myAtt.hypotenuse == myAtt.opposite) myAtt.classification = "Isosceles";
        else if(myAtt.adjacent == myAtt.opposite) myAtt.classification = "Isosceles";
        else myAtt.classification = "Scalence";
        // Setting Props 
        props.setAtt(myAtt);
        // Flip Report flag
        setRedirect({ redirect: true });
    }
    return (
        <div className="container">
            {error.foundError ? (<Redirect push to = "/error"/>) : null}
            <form onSubmit={createAttFunction}>
                <div><label htmlFor="hypotenuse">Enter Length of side A of the triangle in millimetres</label></div>
                <div><input type="text" name="hypotenuse" onChange={updateAtt}/><span> MM</span></div>
                <div><label htmlFor="adjacent">Enter Length of side B of the triangle in millimetres</label></div>
                <div><input type="text" name="adjacent" onChange={updateAtt}/><span> MM</span></div>
                <div><label htmlFor="opposite">Enter Length of side C of the triangle in millimetres</label></div>
                <div><input type="text" name="opposite" onChange={updateAtt}/><span> MM</span></div>
                <div><input className="btn btn-outline-primary buttonPad" type="submit" value="Submit" /><img src={sssImage} /></div>
            </form>
            {redirecter.redirect ? (<Redirect push to = "/report"/>) : null}
        </div>
    );
}

export default SSS;
