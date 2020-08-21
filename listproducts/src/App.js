import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ConteudoPrincipal from "./components/ConteudoPrincipal/ConteudoPrincipal";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ConteudoPrincipal />
      <Footer />
    </div>
  );
}

export default App;
