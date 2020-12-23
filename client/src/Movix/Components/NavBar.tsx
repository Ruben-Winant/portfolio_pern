import React from "react";

const NavBar = () => {
  return (
    <header className="App-header" style={{ marginTop: 55, zIndex: 1 }}>
      <nav
        className="menu"
        style={{ alignItems: "center", width: "55%", maxWidth: "55%" }}
      >
        <a href="#" className="navMain">
          <img
            style={{ width: 100 }}
            alt="Movix logo"
            src={process.env.PUBLIC_URL + "/movix_logo_solo.png"}
          />
        </a>
        <ul className="navList">
          <li>
            <a href="https://github.com/Ruben-Winant/Movix" className="navItem">
              <b style={{ color: "#FFFFFF" }}>Feedback</b>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
