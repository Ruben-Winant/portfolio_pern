import React from "react";
import { Link } from "react-router-dom";

import "./DatailsStyling.css";

const Details = () => {
  return (
    <section className="detailsOuterContainer">
      <div className="detailsContainer">
        <article>
          <img
            className="mobileLogo"
            style={{ width: 170 }}
            alt="Movix logo"
            src={process.env.PUBLIC_URL + "/movix_logo_solo.png"}
          />
          <h1>MOVIX</h1>
          <p>Discover your next favorite movie.</p>
          <div className="buttonRow">
            <Link
              className="downloadButton"
              to={process.env.PUBLIC_URL + "movix_002.apk"}
              target="_blank"
            >
              Download .apk
            </Link>
            <h6>Latest version: 002</h6>
          </div>
        </article>
        <img
          className="sampleImage"
          alt="illustration of movix homescreen"
          src={process.env.PUBLIC_URL + "/illustrationHome.png"}
        />
      </div>
      <svg
        className="movixAbout"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox="0 0 1920 345.028"
      >
        <path d="M0 337.011L1920 0v606.028H0z" fill="#23838e" />
      </svg>
    </section>
  );
};

export default Details;
