import React from "react";
import "./header.css";
import esportImg from "../../assets/images/e-sports-tracker.jpeg";

// Functional component
const Header = () => {
  return (
    <header className="header">
      <img src={esportImg} alt="Logo" />
      <h1>e-sports tracker</h1>
    </header>
  );
};

export default Header;
