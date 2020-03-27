import React from "react";
import {Route, Link} from 'react-router-dom';
import Home from "./components/Home/Home";
import PizzaForm from "./components/PizzaForm/PizzaForm";

const App = () => {
  return (
    <>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/pizza_form">
      <PizzaForm />
    </Route>
    </>
  );
};
export default App;
