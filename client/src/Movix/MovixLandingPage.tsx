import React from "react";
import "./MovixLandingPageStyling.css";
import { Link } from "react-router-dom";
import Details from "./Components/Details";
import NavBar from "./Components/NavBar";

const MovixLandingPage = () => {
  return (
    <div className="MovixLandingContainer">
      <NavBar />

      <Details />

      <section className="movixAboutContainer">
        <div id="about" className="movixAboutContent">
          <h2>About</h2>
          <details>
            <summary>Why isn't the app available on the play store?</summary>
            <p>
              As i am not yet eligible to create a google play developer account
              i'm forced to share the .apk itself via my own site. I can promise
              you that the file is safe but don't have to take my word for it,
              check the file itself on sites such as:{" "}
              <a href="https://www.virustotal.com/gui/">www.virustotal.com</a>.
            </p>
          </details>
          <details>
            <summary>Why did i make this?</summary>
            <p>
              It came to my attention that many people including myself,
              struggle to find new movies to watch. So i build this app in order
              to try and solve this problem by making it easy to go through
              hundreds of movies and easily determine if you like them or not.
            </p>
          </details>
          <details>
            <summary>How does this app work?</summary>
            <p>
              Movix gathers data collected from{" "}
              <Link to="www.tmdb.com">The Movie Database</Link> and uses it to
              display all the info you need onto easy to read cards that you can
              swipe through.
            </p>
          </details>
          <details>
            <summary>How many movies are on Movix</summary>
            <p>
              At this point in time there are close to 4000 movies to go
              through. I'm currently planning on creating a way to easily add
              many more.
            </p>
          </details>
          <details>
            <summary>
              How can i report an error or submit a new feature?
            </summary>
            <p>
              You can <a href="#errorForm">go here</a> and select either
              "feature" or "error" and fill in the form as detailed as possible.
              I then will use all this info to improve the app in later updates.
            </p>
          </details>
        </div>
      </section>

      <footer className="movixFooter">
        <p className="author">
          Made with love by{" "}
          <Link className="authorName" to="/">
            <b> Ruben Winant</b>
          </Link>
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 1920 380.505"
          style={{ marginBottom: -10 }}
        >
          <path
            data-name="Path 4"
            d="M1 0l1920 250.01v200.466H0z"
            fill="#2ac6d8"
          />
        </svg>
      </footer>
    </div>
  );
};

export default MovixLandingPage;
