import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [notMatched, setMatch] = useState(false);
  //sets up the formData object
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //sets up the addUser mutation
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  if (Auth.loggedIn()) {
    navigate("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password === formData.confirmPassword) {
        setMatch(false);
        //adds user with the formData
        const { data } = await addUser({
          variables: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
        });
        //logs user in
        Auth.login(data.addUser.token);
      } else {
        setMatch(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Sign Up</button>
      </form>
      {notMatched === true ? (
        <p>Passwords don't match. Please try again</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Signup;
