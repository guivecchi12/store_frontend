import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import axios from "axios";
import * as Yup from 'yup';
import { UserContext } from '../contexts/UserContext'


const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const defaultState = {
    username: "",
    password: "",
    terms: false,
  };

  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState({ ...defaultState, message:'' });
  const [buttonDisabled, setButtonDisabled] = useState(true);


  let formSchema = Yup.object().shape({
    username: Yup.string().required("Please provide username."),
    password: Yup.string().required("Please enter a correct Password"),
    terms: Yup.boolean().oneOf(
      [true],
      "Please agree to the terms and conditions"
    ),
  });


  // disable button until all fields are filled
  useEffect(() => {
    if(formState.username.length > 0 & formState.password.length > 0){
      setButtonDisabled(!formState.terms);
    }
    else{
      setButtonDisabled(true);
    }
  }, [formState]);

  //this is use for the onsubmit function
  const formSubmit = (e) => {
    e.preventDefault();

    let loginAttempt = { username: formState.username, password: formState.password };
    console.log(formState)
    
    axios
      .post("https://my-cool-book-store.herokuapp.com/api/user/login", loginAttempt)
      .then((res) => {
        console.log("MY DATA:", res.data)
        const data = res.data;

        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        
        setUser(localStorage.getItem("name"));
        navigate("/");

        console.log("Form Submitted");
        // to reset form
        setFormState({
          username: "",
          password: "",
          terms: false,
        }) 
      })

      .catch((err) => {
        console.log("This is the Error", err);
        setErrors({...errors, message: "Incorect Login Information"})
      });
      
  };

  const validateChange = (e) => {
    e.persist();

    if(e.target.type === "checkbox"){
      Yup.reach(formSchema, e.target.name)
        .validate(e.target.checked)
        .then(() =>
          setErrors({
            ...errors,
            [e.target.name]: "",
          })
        )
        .catch((error) =>
          setErrors({
            ...errors,
            [e.target.name]: error.errors[0],
          })
        );
    }

    else{
      Yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(() =>
          setErrors({
            ...errors,
            [e.target.name]: "",
          })
        )
        .catch((error) =>
          setErrors({
            ...errors,
            [e.target.name]: error.errors[0],
          })
        );
    }
  };

  // onChange function
  const handleChange = (e) => {
    //ternary operator to determine the form value
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
    validateChange(e);
  };

  return (
    <div className="login">
        <form onSubmit={formSubmit} className="form">
            <h1>LOG IN</h1>
            {errors.message.length > 0 ? <div className="errorMessage">{errors.message}</div> : null}
            <div className="userInfo">
                <label htmlFor="username">
                    Username
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={formState.username}
                        label="Username"
                        errors={errors}
                    />
                    {errors.username.length !== 0 && (
                        <p className="error">{errors.username}</p>
                    )}
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formState.password}
                        label="Password"
                        errors={errors}
                    />
                    {errors.password.length !== 0 && (
                        <p className="error">{errors.password}</p>
                    )}
                </label>
                <label className="terms" htmlFor="terms">
                    <input name="terms" type="checkbox" onChange={handleChange}/>
                    <Popup 
                      trigger={<button> Terms of Service </button>} 
                      modal
                      closeOnDocumentClick
                    >
                      <div>These products are for personal enjoyment and not for resale</div>
                    </Popup> 
                </label>

                <button disabled={buttonDisabled}>SUBMIT</button>
            </div>  
        </form>
    </div>
    
  );
};

export default Login;