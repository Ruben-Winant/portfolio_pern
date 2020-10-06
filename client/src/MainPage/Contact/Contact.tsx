import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact">
      <article className="contactContainer">
        <div>
          <h2>Contact</h2>
          <span>I'll try to come back to you as quickly as possible.</span>
        </div>
        <div className="contactButton">
          <a href="mailto:ruben.winant@hotmail.com?SUBJECT=portfolio">
            <button>Email</button>
          </a>
        </div>
      </article>
    </section>
  );
};

export default Contact;
