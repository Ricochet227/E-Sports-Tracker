import React from "react";
import "./header.css";
import esportImg from "../../assets/images/e-sports-tracker.jpeg";

// Functional component
const Header = () => {
  return (
    <header className="header">
      <li><a href="../../pages/login.jsx">login</a></li>
      <img src={esportImg} alt="Logo" />
    </header>
  );
};

export default Header;
