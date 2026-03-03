import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Destination from "./pages/Destination";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <div className="main">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Destination" element={<Destination />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
