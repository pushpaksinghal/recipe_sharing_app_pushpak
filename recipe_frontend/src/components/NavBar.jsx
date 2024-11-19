import React from "react";
import cook from "../assets/cooking.png";
import profile from "../assets/profile.png";
import plus from "../assets/plus.png";

function NavBar({ onPlusClick, onProfileClick }) {
  return (
    <div className="nav" style={{ backgroundColor: "black", height: "70px" }}>
      <div className="logo">
        <img src={cook} alt="Cooking" />
      </div>
      <div className="menu">
        <img
          src={profile}
          alt="Profile"
          onClick={onProfileClick}
          style={{ cursor: "pointer" }}
        />
        <img
          src={plus}
          alt="Add"
          onClick={onPlusClick}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default NavBar;
