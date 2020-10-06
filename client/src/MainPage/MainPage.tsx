import React from "react";
import "./MainPage.css";
import NavBar from "../MainPage/Navigation/NavBar";
import About from "../MainPage/About/About";
import Skills from "../MainPage/Skills/Skills";
import Portfolio from "../MainPage/Portfolio/Portfolio";
import Contact from "../MainPage/Contact/Contact";
import Footer from "../MainPage/Footer/Footer";

function MainPage() {
  return (
    <div>
      <NavBar />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

export default MainPage;
