import React from "react";
import "./Navbar.css";
import Logo from "./images/image1.svg";

function Navbar() {
  return (
    <div className="barranavegacao">
      <a href="">
        <img src={Logo} alt="oi"></img>
      </a>
      <a href="">
        <h3>List Products</h3>
      </a>
    </div>
  );
}

export default Navbar;
