import React from "react";

import classes from "./User.module.css";

const UserAdmin = ({ user }) => {
  const displayUserType = (isAdmin) => {
    return isAdmin ? "Admin" : "User";
  };

  return (
    <>
      <div className={classes["user-content"]}>
        <img
          src={`http://localhost:5000/${user.image}`}
          
          alt={user.name}
          className={classes["user-avatar"]}
        />
        <div className={classes["user-description"]}>
          <p>Name: {user.name}</p>
          <p>Surname: {user.surname}</p>
          <p>Email: {user.email}</p>
          <p>Account type: {displayUserType(user.isAdmin)}</p>
        </div>
      </div>
    </>
  );
};

export default UserAdmin;
