import React from "react";
import "./Navbar.css";
import Logo from "../../imgs/div-logo.png";
import { FaGlobeAmericas } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav>
      <div className="nav-left">
        <a href="/dashboard" className="logo">
          <img src={Logo} alt="" />
        </a>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink
              to="students"
              className={({ isActive }) => (isActive ? "active" : "nav-links")}
            >
              Tələbələr
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "nav-links")}
              to="teachers"
            >
              Müəllimlər
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <a href="https://divacademy.az/" target="_blank" className="web">
          <span>Əsas sayta bax</span>
          <FaGlobeAmericas color="#919191" />
        </a>
        <span className="notify">
          <i className="notify-icon"></i>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
