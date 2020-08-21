import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ConteudoPrincipal from "./components/ConteudoPrincipal/ConteudoPrincipal";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ConteudoPrincipal />
    </div>
  );
}

export default App;
