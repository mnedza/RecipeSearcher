import React from "react";
import User from "../components/User/User";

const Profile = (props) => {
  return (
    <>
      <User>{props.children}</User>
    </>
  );
};

export default Profile;
