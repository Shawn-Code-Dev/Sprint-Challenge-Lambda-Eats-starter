import React, {useState} from 'react';
import * as yup from "yup";
import axios from 'axios';
import { Link } from 'react-router-dom';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."), 
    pizzaSize: yup.string(),
    pizzaSauce: yup.string(),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    onions: yup.boolean(),
    mushrooms: yup.boolean(),
    pineapple: yup.boolean(),
    chicken: yup.boolean(),
    specialInstructions: yup.string()
});

const PizzaForm = () => {
    // const [buttonDisabled, setButtonDisabled] = useState(true);

    const [formState, setFormState] = useState({
        name: "",
        pizzaSize: "Personal",
        pizzaSauce: "Original",
        pepperoni: "",
        sausage: "",
        onions: "",
        mushrooms: "",
        pineapple: "",
        chicken: "",
        specialInstructions: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        pizzaSize: "Personal",
        pizzaSauce: "Original",
        pepperoni: "",
        sausage: "",
        onions: "",
        mushrooms: "",
        pineapple: "",
        chicken: "",
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
    
    const [post, setPost] = useState([]);

    const formSubmit = e => {
        e.preventDefault();
        axios
          .post("https://reqres.in/api/users", formState)
          .then(res => {
            setPost(res.data);
            setFormState({
                name: "",
                pizzaSize: "",
                pizzaSauce: "",
                pepperoni: "",
                sausage: "",
                onions: "",
                mushrooms: "",
                pineapple: "",
                chicken: "",
                specialInstructions: ""
            });
          })
          .catch(err => console.log(err.response));
      };
    

    // useEffect(() => {
    //     formSchema.isValid(formState).then(valid => {
    //     //   setButtonDisabled(!valid);
    //     });
    //   }, [formState]);

    return (
        <>
            <h1>Build Your Own Pizza</h1>
            <Link to={'./'}><button>Back Home</button></Link>
            <br/>
            <br/>
            <form action="#" method="post" id="pizzaForm" onSubmit={formSubmit}>
                <label htmlFor="name">
                    Name 
                    <br/>
                    <input
                        type="text"
                        name="name"
                        minLength='2'
                        value={formState.name}
                        onChange={inputChange}
                    />
                </label>
                <br/>
                <label htmlFor="pizzaSize">
                    What pizza size?
                    <br/>
                    <select id="pizzaSize" name="pizzaSize" onChange={inputChange}>
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
                    <select id="pizzaSauce" name="pizzaSauce" onChange={inputChange}>
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
                        <label><input type="checkbox" name="pepperoni" checked={formState.pepperoni} onChange={inputChange}/> pepperoni</label>
                        <label><input type="checkbox" name="sausage" checked={formState.sausage} onChange={inputChange} /> sausage</label>
                        <label><input type="checkbox" name="onions" checked={formState.onions} onChange={inputChange} /> onions</label>
                        <label><input type="checkbox" name="mushrooms" checked={formState.mushrooms} onChange={inputChange} /> mushrooms</label>
                        <label><input type="checkbox" name="pineapple" checked={formState.pineapple} onChange={inputChange} /> pineapple</label>
                        <label><input type="checkbox" name="chicken" checked={formState.chicken} onChange={inputChange} /> chicken</label>
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
                <pre>{JSON.stringify(post, null, 2)}</pre>
                <button type="submit">Submit your Order</button>
            </form>
        </>
    )
}

export default PizzaForm;