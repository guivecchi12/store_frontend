import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import axiosWithAuth from "../utilities/axiosWithAuth";
// import { useHistory } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
import Popup from 'reactjs-popup';

const Login = () => {
//   const { setUser } = useContext(UserContext);

  //this is the react state
  const defaultState = {
    username: "",
    password: "",
    terms: false,
  };

  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState({ ...defaultState });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // const { push } = useHistory();


  useEffect(() => {
    // disable button until all fields are filled
    setButtonDisabled(!formState.terms);
  }, [formState.terms]);

  //this is use for the onsubmit function
  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");

    // to reset form
    setFormState({
      username: "",
      password: "",
      terms: false,
    });

    // let user = { username: formState.username, password: formState.password };
    // axiosWithAuth()
    //   .post("/auth/login", user)
    //   .then((res) => {
    //     const data = res.data;
    //     // console.log("form submitted success", data);
    //     localStorage.setItem("token", data.token);
    //     localStorage.setItem("userID", data.id);
    //     //I set setUser here so it can retrieve the user data to the DOM
    //     setUser(data);
    //     push("/protected");
    //   })
    //   .catch((err) => {
    //     console.log("This is the Error", err);
    //   });
  };

  const validateChange = (e) => {
    e.persist();
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
                    <input name="terms" type="checkbox" onChange={handleChange} />
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