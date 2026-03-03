import React from "react";
import heroImg from "../assets/ggg.jpg";
import { FaPinterestP, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

const Home = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <h2 className="bg-text">Explore</h2>
        <h1>
          <span>San Narciso</span>
        </h1>

        <h2 className="light-text">WITH US!</h2>

        <p>
          San Narciso offers pristine beaches, scenic landscapes, vibrant local
          culture, and a relaxing coastal atmosphere, making it a perfect
          getaway for adventure and leisure.
        </p>

        <button className="btn">Get Started</button>

        <div className="socials">
          <FaPinterestP />
          <FaLinkedinIn />
          <FaFacebookF />
        </div>
      </div>
    </section>
  );
};

export default Home;
