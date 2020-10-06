import React from "react";
import "./NavBar.css";

export default function NavBar() {
  const MobileMenuClick = () => {
    let menuBtn = document.getElementById("popUpMenu");

    menuBtn
      ? menuBtn.style.display === "none"
        ? (menuBtn.style.display = "flex")
        : (menuBtn.style.display = "none")
      : console.log("No popup menu button found");
  };

  return (
    <header className="App-header">
      <nav className="menu">
        <a href="#" className="navMain">
          Home
        </a>
        <ul className="navList">
          <li>
            <a href="#about" className="navItem">
              About
            </a>
          </li>
          <li className="navItem">|</li>
          <li>
            <a href="#skills" className="navItem">
              Skills
            </a>
          </li>
          <li className="navItem">|</li>
          <li>
            <a href="#portfolio" className="navItem">
              Portfolio
            </a>
          </li>
          <li className="navItem">|</li>
          <li>
            <a href="#contact" className="navItem">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <nav
        onClick={MobileMenuClick}
        className="mobileMenuButton"
        id="mobileMenuButton"
      >
        <div className="rectangle"></div>
        <div className="rectangle hiderec"></div>
        <div className="rectangle"></div>
      </nav>
      <nav onClick={MobileMenuClick} className="popUpMenu" id="popUpMenu">
        <ul className="navListPopUp">
          <li>
            <a href="#about" className="navItemPopUp">
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="navItemPopUp">
              Skills
            </a>
          </li>
          <li>
            <a href="#portfolio" className="navItemPopUp">
              Portfolio
            </a>
          </li>
          <li>
            <a href="#contact" className="navItemPopUp">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
