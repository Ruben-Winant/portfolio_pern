import React, { useEffect, useState } from "react";
import "./Footer.css";
import UserInfo from "../../Types/UserInfo";

const Footer = () => {
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
      fetch("http://localhost:5000/api/info")
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
    <footer id="footer">
      <h1>Get in touch</h1>
      <br />
      <div className="footerContent">
        <a href={userinfo.dribble}>
          <div className="mediaCell">
            <i className="dribbble fa fa-dribbble fa-3x" />
            <span className="mediaName">Dribbble</span>
          </div>
        </a>

        <a href={userinfo.linkedin}>
          <div className="mediaCell">
            <i className="linkedin fa fa-linkedin fa-3x" />
            <span className="mediaName">LinkedIn</span>
          </div>
        </a>

        <a href={userinfo.twitter}>
          <div className="mediaCell">
            <i className="twitter fa fa-twitter fa-3x" />
            <span className="mediaName">Twitter</span>
          </div>
        </a>
        <a href={userinfo.github}>
          <div className="mediaCell">
            <i className="github fa fa-github fa-3x" />
            <span className="mediaName">Github</span>
          </div>
        </a>
      </div>
      <br />
      <br />
      <span>Copyright © 2020 Ruben Winant. All rights reserved.</span>
    </footer>
  ) : (
    <div></div>
  );
};

export default Footer;
