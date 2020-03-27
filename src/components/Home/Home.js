import React from 'react';
import {
    Link,
  } from "react-router-dom";


const Home = () => {


    return (
        <>
            <h1>Lambda Eats</h1>
            <Link to={'./pizza_form'}><button>Make your own!</button></Link>
        </>
    )
}

export default Home;