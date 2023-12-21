import React from "react";
import ProfileEdit from "../components/User/ProfileEdit";

const EditProfile = (props) => {
  return (
    <>
      <ProfileEdit>{props.children}</ProfileEdit>
    </>
  );
};

export default EditProfile;
