import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Loading from "./Components/Loading";
import Error from './Components/Error';
import Report from './Components/Report';
import Selection from './Components/Selection';
import SSS from './Components/SSS';
import SSA from './Components/SSA';
import SAA from './Components/SAA';
import React, { useState } from "react";

function App() {
    const [myForm, setMyForm] = useState({
      hypotenuse: "",
      opposite: "",
      adjacent: "",
      topAngle: "",
      rightAngle: "",
      leftAngle: "",
      classification: ""
    });
    const onChangeHandler = e => {
      setMyForm({ ...myForm, [e.target.name]: e.target.value })
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Loading />
          </Route>
          <Route path="/error">
            <Error />
          </Route>
          <Route path="/report">
            <Report myForm={myForm} />
          </Route>
          <Route path="/selection">
            <Selection />
          </Route>
          <Route path="/SSS">
            <SSS myForm={myForm} onChangeHandler={onChangeHandler} />
          </Route>
          <Route path="/SSA">
            <SSA myForm={myForm} onChangeHandler={onChangeHandler} />
          </Route>
          <Route path="/SAA">
            <SAA myForm={myForm} onChangeHandler={onChangeHandler} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
}

export default App;
