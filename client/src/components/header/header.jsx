import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import Auth from "../../utils/auth";
import esportImg from "../../assets/images/e-sports-tracker.jpeg";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    Auth.logout();
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <header className="header">
      <ul>
        {Auth.loggedIn() ? (
          <li>
            <a onClick={handleLogoutClick}>Signout</a>
          </li>
        ) : (
          <>
            <li>
              <a onClick={handleLoginClick}>login</a>
            </li>
            <li>
              <a onClick={handleSignupClick}>Signup</a>
            </li>
          </>
        )}
      </ul>
      <img src={esportImg} alt="Logo" />
    </header>
  );
};

export default Header;
