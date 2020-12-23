import React from "react";
import { Link } from "react-router-dom";

const Details = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignSelf: "center",
        width: "55%",
        zIndex: 5,
        margin: "auto",
        marginTop: 180,
      }}
    >
      <article
        style={{
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          margin: 0,
          zIndex: 5,
        }}
      >
        <h1
          style={{
            fontWeight: 100,
            fontSize: "4em",
          }}
        >
          MOVIX
        </h1>
        <p
          style={{
            fontSize: "1.4em",
            paddingTop: 0,
            marginTop: 0,
            fontWeight: 500,
          }}
        >
          Discover your next favorite movie.
        </p>
        <div
          style={{
            width: 300,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link
            to={process.env.PUBLIC_URL + "movix_001.apk"}
            target="_blank"
            style={{
              width: 150,
              color: "#FFFFFF",
              borderRadius: 5,
              height: 50,
              backgroundColor: "#2AC6D8",
              fontWeight: "bold",
              boxShadow: "9px 9px 0px 0px #23838E",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Download .apk
          </Link>
          <button
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
            }}
          >
            .apk info
          </button>
        </div>
      </article>
      <img
        style={{ width: 300, height: 360, zIndex: 5 }}
        alt="illustration of movis homescreen"
        src={process.env.PUBLIC_URL + "/illustrationHome.png"}
      />
    </div>
  );
};

export default Details;
