import React, { useEffect, useState } from "react";
import "./About.css";
import UserInfo from "../../Types/UserInfo";

const About = () => {
  let emptyInfo: UserInfo = {
    firstname: "",
    surname: "",
    about: "",
    extra: "",
    dribble: "",
    twitter: "",
    linkedin: "",
    github: "",
    role: "",
    id: 0,
  };
  const [userinfo, setUserInfo] = useState<UserInfo>(emptyInfo);
  const [dataLoaded, setDataLoaded] = useState(false);

  //fetch data
  useEffect(() => {
    try {
      fetch("/api/info")
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data[0]);
          setDataLoaded(true);
        });
    } catch (err) {
      console.error(err.message);
      setDataLoaded(false);
    }
  }, []);

  return dataLoaded ? (
    <section id="about">
      <article className="aboutContainer">
        <div className="aboutLeft">
          <h1>Hi, i'm {userinfo.firstname}</h1>
          <span>{userinfo.role}</span>
          <br />
          <br />
          <p>{userinfo.about}</p>
          <p>{userinfo.extra}</p>
          <a href="#contact">
            <button>Contact</button>
          </a>
        </div>
        <div className="aboutRight">
          <div>
            <img
              src={process.env.PUBLIC_URL + "/selfie.png"}
              alt="Ruben Winant"
            />
          </div>
        </div>
      </article>
    </section>
  ) : (
    <div></div>
  );
};

export default About;
