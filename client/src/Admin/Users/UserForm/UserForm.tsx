import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Role from "../../../Types/Role";
import "./UserForm.css";

const UserForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [chosenroleid, setChosenRoleid] = useState<number>(1);
  const [roles, setRoles] = useState<Role[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [resultmsg, setResMsg] = useState<string>("");

  //fetch role data
  useEffect(() => {
    try {
      fetch("/api/roles")
        .then((response) => response.json())
        .then((data) => {
          setRoles(data);
          setDataLoaded(true);
        });
    } catch (err) {
      console.error(err.message);
      setDataLoaded(false);
    }
  }, []);

  const getAllRoles = () => {
    let roleOptions: any = [];
    roles?.forEach((role) => {
      roleOptions.push(
        <option key={role.roleid} value={role.roleid.toString()}>
          {role.name}
        </option>
      );
    });
    return roleOptions;
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setChosenRoleid(roles[event.target.options.selectedIndex].roleid);
  };

  const handleSubmit = (event: FormEvent) => {
    try {
      let accessToken = localStorage.getItem("accesToken");
      let myHeaders: Headers = new Headers();
      myHeaders.append("Content-Type", "application/json");

      if (accessToken) {
        myHeaders.append("authorization", "Bearer " + accessToken.toString());
      }

      fetch("/admin/users/add", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          username: username,
          password: password,
          roleid: chosenroleid,
        }),
      }).then((res) => {
        res.text().then((val) => {
          setResMsg(JSON.parse(val).message);
        });
      });
    } catch (error) {
      console.log(error.message);
    }

    event.preventDefault();
  };

  return dataLoaded ? (
    <div className="outer-register-user">
      <div className="inner-register-user">
        <h1>Register new user</h1>
        <form
          className="form-register-user"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="input-register-user">
            <label>Username * </label>
            <input
              required={true}
              type="text"
              name="username"
              value={username}
              onChange={(text) => handleUsernameChange(text)}
            />
          </div>
          <div className="input-register-user">
            <label>Password * </label>
            <input
              required={true}
              type="password"
              name="password"
              onChange={(text) => handlePasswordChange(text)}
            />
          </div>
          <div className="input-register-user">
            <label>Role * </label>
            <select
              defaultValue={chosenroleid}
              required={true}
              onChange={(val) => handleRoleChange(val)}
            >
              {getAllRoles()}
            </select>
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
      {resultmsg ? (
        <div className="error">
          <p>{resultmsg}</p>
        </div>
      ) : null}
    </div>
  ) : (
    <div></div>
  );
};

export default UserForm;
