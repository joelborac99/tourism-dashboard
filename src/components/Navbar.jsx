import React, { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">✦</span> SAN NARCISO
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link className="Linkin" to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          className="Linkin"
          to="/Dashboard"
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          className="Linkin"
          to="/Destination"
          onClick={() => setMenuOpen(false)}
        >
          Destination
        </Link>
        <Link className="Linkin" to="/About" onClick={() => setMenuOpen(false)}>
          About
        </Link>

        <Link
          className="Linkin"
          to="/Contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
      </ul>

      <div className="nav-right">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <FiSearch />
        </div>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
