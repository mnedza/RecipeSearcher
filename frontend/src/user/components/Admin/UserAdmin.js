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
          <p>
            Name: <span>{user.name}</span>{" "}
          </p>
          <p>
            Surname: <span>{user.surname}</span>
          </p>
          <p>
            Email: <span>{user.email}</span>
          </p>
          <p>
            Account type: <span>{displayUserType(user.isAdmin)}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserAdmin;
