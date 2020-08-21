import React from "react";
import "./Navbar.css";
import Logo from "./images/image1.svg";

function Navbar() {
  return (
    <div className="barranavegacao">
      <img src={Logo} alt="oi"></img>
      <h3>List Products</h3>
    </div>
  );
}

export default Navbar;
