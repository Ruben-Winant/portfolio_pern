import React from "react";
import UserForm from "./UserForm/UserForm";
import UserList from "./UserList/UserList";
import "./Users.css";

const Users = () => {
  return (
    <section>
      <article>
        <UserList />
      </article>
      <article>
        <UserForm />
      </article>
    </section>
  );
};

export default Users;
