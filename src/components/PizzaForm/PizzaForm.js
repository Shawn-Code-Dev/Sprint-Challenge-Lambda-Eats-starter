import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."), 
    pizzaSize: yup.string(),
    specialInstructions: yup.string()
});

const PizzaForm = () => {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [formState, setFormState] = useState({
        name: "",
        pizzaSize: "",
        pizzaSauce: "",
        toppings: [],
        specialInstructions: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        pizzaSize: "",
        pizzaSauce: "",
        toppings: [],
        specialInstructions: ""
    });

    const validateChange = e => {
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrors({
              ...errors,
              [e.target.name]: err.errors[0]
            });
          });
      };

    const inputChange = e => {
        e.persist();
        const newFormData = {
          ...formState,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
    
        validateChange(e);
        setFormState(newFormData);
    };
    
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [formState]);

    return (
        <>
            <h1>Build Your Own Pizza</h1>
            <form action="#" method="post" id="pizzaForm">
                <label htmlFor="name">
                    Name 
                    <br/>
                    <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={inputChange}
                    />
                </label>
                <br/>
                <label htmlFor="pizzaSize">
                    What pizza size?
                    <br/>
                    <select id="pizzaSize" name="pizzaSize">
                        <option value="Personal">Personal</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </label>
                <br/>
                <label htmlFor="pizzaSauce">
                    What pizza sauce?
                    <br/>
                    <select id="pizzaSauce" name="pizzaSauce">
                        <option value="Original">Original</option>
                        <option value="Ranch">Ranch</option>
                        <option value="BBQ">BBQ</option>
                        <option value="Alfredo">Alfredo</option>
                    </select>
                </label>
                <br/>
                <br/>
                <fieldset>
                    <p>Check the toppings you'd like to add to your pizza</p>

                    <div>
                        <label><input type="checkbox" name="toppings[]" value="pepperoni" /> pepperoni</label>
                        <label><input type="checkbox" name="toppings[]" value="sausage" /> sausage</label>
                        <label><input type="checkbox" name="toppings[]" value="onions" /> onions</label>
                        <label><input type="checkbox" name="toppings[]" value="mushrooms" /> mushrooms</label>
                        <label><input type="checkbox" name="toppings[]" value="pineapple" /> pineapple</label>
                        <label><input type="checkbox" name="toppings[]" value="chicken" /> chicken</label>
                    </div>
                </fieldset>
                <br/>
                <label htmlFor="specialInstructions">
                    Any special instructions?
                    <br/>
                    <textarea
                        name="specialInstructions"
                        value={formState.specialInstructions}
                        onChange={inputChange}
                    />
                </label>
                <br/>
                <button>Submit your Order</button>
            </form>
        </>
    )
}

export default PizzaForm;