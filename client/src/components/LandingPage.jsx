import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import Logo from "../assets/Logo.png";

export default function LandingPage() {
  return (
    <div className="container">
      <img src={Logo} alt="Logo" />
      <div>
        <Link to="/home">
          <button class="cta">
            <span>Get Started</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
