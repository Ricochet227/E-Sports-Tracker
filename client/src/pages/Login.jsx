import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import "./login.css";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  //on change updates formState
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const navigateHome = () => {
    navigate("/");
  };

  if (Auth.loggedIn()) {
    navigateHome;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      // Save the token to local storage and redirect to the home page
      Auth.login(data.login.token);
    } catch (error) {
      // Handle login error (show error message, etc.)
      console.error("Login failed:", error);
    }
    //sets formState back to empty
    setFormState({
      email: "",
      password: "",
    });
  };
  return (
    <div className="div-login">
      <div className="div-login-logo"></div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="email..."
            required
            value={formState.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password..."
            required
            value={formState.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
