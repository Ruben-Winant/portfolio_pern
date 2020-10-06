import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./Admin.css";
import PersonalInfo from "./PortfolioEdit/PersonalInfo/PersonalInfo";
import EditPortfolio from "./PortfolioEdit/Portfolio/EditPortfolio";
import EditSkills from "./PortfolioEdit/Skills/EditSkills";

const Admin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resultmsg, setResMsg] = useState<string>("");
  const [authValid, setAuthValid] = useState<boolean>(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    try {
      fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((val) =>
          val.message
            ? (setResMsg(val.message), setAuthValid(false))
            : (localStorage.setItem("accesToken", val.token),
              setAuthValid(true))
        );
    } catch (error) {
      console.log(error.message);
    }

    event.preventDefault();
  };

  useEffect(() => {
    const token = localStorage.getItem("accesToken");
    token && token !== "" ? setAuthValid(true) : setAuthValid(false);
  }, []);

  return !authValid ? (
    <section>
      <article>
        <div className="outer-login">
          <div className="inner-login">
            <h1>Admin login</h1>
            <form
              className="form-login"
              onSubmit={(event) => handleSubmit(event)}
            >
              <div className="input-login">
                <label>Username </label>
                <input
                  required={true}
                  type="text"
                  name="username"
                  value={username}
                  onChange={(text) => handleUsernameChange(text)}
                />
              </div>
              <div className="input-login">
                <label>Password </label>
                <input
                  required={true}
                  type="password"
                  name="password"
                  onChange={(text) => handlePasswordChange(text)}
                />
              </div>
              <button type="submit">log in</button>
            </form>
          </div>

          {resultmsg ? (
            <div className="error">
              <p>{resultmsg}</p>
            </div>
          ) : null}
        </div>
      </article>
    </section>
  ) : (
    <section>
      <article>
        <h1>Edit portfolio content</h1>
      </article>
      <PersonalInfo />
      <br />
      <br />
      <EditSkills />
      <br />
      <br />
      <EditPortfolio />
    </section>
  );
};

export default Admin;
