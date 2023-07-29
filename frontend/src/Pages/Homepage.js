// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../components/layouts/MetaData/Metadata";
import "./Homepage.css";
function HomePage() {
  return (
    <>
      <MetaData title="LetsChat | Home" />
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="#">
            <div className="navbar-logo">LetsChat</div>
          </Link>
         
        </div>
      </nav>
    </>
  );
}

export default HomePage;
