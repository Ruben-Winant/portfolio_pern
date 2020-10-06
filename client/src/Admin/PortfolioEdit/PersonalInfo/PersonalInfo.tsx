import React, { ChangeEvent, useEffect, useState } from "react";
import "./PersonalInfo.css";

const PersonalInfo = () => {
  //basic user info
  const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [extra, setExtra] = useState<string>("");
  const [id, setId] = useState(0);

  //links
  const [twitter, setTwitter] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [dribbble, setDribbble] = useState<string>("");
  const [resMsg, setResMsg] = useState<string>("");

  //fetch personal data
  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/info")
        .then((response) => response.json())
        .then((data) => {
          //personal info
          setFirstname(data[0].firstname);
          setLastname(data[0].surname);
          setRole(data[0].role);
          setAbout(data[0].about);
          setExtra(data[0].extra);
          setId(data[0].id);

          //set links data
          setDribbble(data[0].dribble);
          setGithub(data[0].github);
          setLinkedin(data[0].linkedin);
          setTwitter(data[0].twitter);
          setUserDataLoaded(true);
        });
    } catch (err) {
      console.error(err.message);
      setUserDataLoaded(false);
    }
  }, []);

  //input change handlers basic info
  const handleFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };
  const handleLastnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };
  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };
  const handleAboutChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(event.target.value);
  };
  const handleExtraChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setExtra(event.target.value);
  };

  //input handlers links
  const handleGithubChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGithub(event.target.value);
  };
  const handleTwitterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTwitter(event.target.value);
  };
  const handleLinkedinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLinkedin(event.target.value);
  };
  const handleDribbbleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDribbble(event.target.value);
  };

  const handleSubmit = () => {
    try {
      let accessToken = localStorage.getItem("accesToken");
      let myHeaders: Headers = new Headers();
      myHeaders.append("Content-Type", "application/json");

      if (accessToken) {
        myHeaders.append("authorization", "Bearer " + accessToken.toString());
      }

      //update personal stuff
      fetch("http://localhost:5000/admin/info/" + id, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          firstname: firstname,
          surname: lastname,
          role: role,
          about: about,
          extra: extra,
          twitter: twitter,
          github: github,
          linkedin: linkedin,
          dribble: dribbble,
        }),
      })
        .then((res) => res.json())
        .then((val) =>
          val.message ? (setResMsg(val.message), alert(resMsg)) : null
        );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <article>
      {userDataLoaded ? (
        <form>
          <div className="pi-input" onClick={() => handleSubmit()}>
            <h2>Personal info</h2>
            <span>
              Update <i style={{ fontSize: 15 }} className="fa fa-refresh" />
            </span>
          </div>
          <div className="pi-outer">
            <div className="pi-inner">
              <div className="pi-input">
                <label>First name</label>
                <input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={(text) => handleFirstnameChange(text)}
                />
              </div>
              <div className="pi-input">
                <label>Last name</label>
                <input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={(text) => handleLastnameChange(text)}
                />
              </div>
              <div className="pi-input">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={role}
                  onChange={(text) => handleRoleChange(text)}
                />
              </div>
              <div className="pi-input">
                <label>About</label>
                <textarea
                  name="about"
                  value={about}
                  onChange={(text) => handleAboutChange(text)}
                />
              </div>
              <div className="pi-input">
                <label>Extra</label>
                <textarea
                  name="extra"
                  value={extra}
                  onChange={(text) => handleExtraChange(text)}
                />
              </div>
              <div className="pi-input">
                <label>Github</label>
                <input
                  type="url"
                  name="github"
                  value={github}
                  onChange={(text) => handleGithubChange(text)}
                />
              </div>
              <div className="pi-input">
                <label>Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  value={twitter}
                  onChange={(text) => handleTwitterChange(text)}
                />
              </div>
              <div className="pi-input">
                <label>LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={linkedin}
                  onChange={(text) => handleLinkedinChange(text)}
                />
              </div>
              <div className="pi-input">
                <label>Dribbble</label>
                <input
                  type="url"
                  name="dribbble"
                  value={dribbble}
                  onChange={(text) => handleDribbbleChange(text)}
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <h2>Loading data</h2>
      )}
    </article>
  );
};

export default PersonalInfo;
