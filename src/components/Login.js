import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import axios from "axios";
import * as Yup from 'yup';
import { UserContext } from '../contexts/UserContext'


const Login = () => {
  const { setUser, setLoggedIn } = useContext(UserContext)
  const navigate = useNavigate()

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

  const formSubmit = (e) => {
    e.preventDefault()

    let loginAttempt = { username: formState.username, password: formState.password }
    
    axios
      .post("/api/user/login", loginAttempt)
      .then((res) => {
        const data = res.data

        localStorage.setItem("token", data.token)
        localStorage.setItem("name", data.name)
        localStorage.setItem("userID", data.userID)
        
        setUser(localStorage.getItem("name"))
        navigate("/")

        setLoggedIn(true)
        setFormState(defaultState) 
      })

      .catch(() => {
        setErrors({...errors, message: "Incorect Login Information"})
        setFormState({...defaultState, terms: true})
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

  const handleChange = (e) => {
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
            <div className="myFlex">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                placeholder="Enter Username"
                type="text"
                name="username"
                onChange={handleChange}
                value={formState.username}
                label="Username"
                errors={errors}
              />
            </div> 

            <div className="myFlex"> 
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                placeholder="Enter Password"
                type="password"
                name="password"
                onChange={handleChange}
                value={formState.password}
                label="Password"
                errors={errors}
              />
            </div>
                
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

            <button disabled={buttonDisabled} className="submit">SUBMIT</button>
            </div>  
        </form>
    </div>
    
  );
};

export default Login;