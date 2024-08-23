import React from "react";
import "./App.css";
import FormComponent from "./components/FormComponent";
import ControllerComponent from "./components/ControllerComponent";

function App() {
  return (
    <div className="dom-app">
      <FormComponent />
      <ControllerComponent />
    </div>
  );
}

export default App;
