import React, { useState } from "react";
import { Link } from "react-router-dom";
import Details from "./Components/Details";
import NavBar from "./Components/NavBar";

const MovixLandingPage = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <div
      style={{
        backgroundColor: "#363333",
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <div>
        <NavBar />
        <Details />
        <p
          style={{
            color: "#FFFFFF",
            position: "absolute",
            bottom: 25,
            zIndex: 5,
            marginLeft: "22%",
          }}
        >
          Made with love by{" "}
          <Link to="/" style={{ color: "#23838e" }}>
            <b>Ruben Winant</b>
          </Link>
        </p>

        <svg
          style={{ zIndex: 0, position: "absolute", bottom: 0 }}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 1920 605.028"
        >
          <path d="M0 337.011L1920 0v606.028H0z" fill="#23838e" />
        </svg>
        <svg
          style={{ zIndex: 0, position: "absolute", bottom: 0 }}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 1920 407.526"
        >
          <path
            data-name="Path 4"
            d="M0 0l1920 230.07v177.456H0z"
            fill="#2ac6d8"
          />
        </svg>
      </div>
    </div>
  );
};

export default MovixLandingPage;
