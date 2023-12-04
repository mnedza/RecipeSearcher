import React from "react";
import UserInfo from "./UserInfo";

const User = () => {
  
  const userData = {
    userId: "u1",
    name: "Marcel Nędza",
    avatar:
      "https://cdn.pixabay.com/photo/2019/12/12/16/27/dog-4691167_960_720.jpg",
    email: "test@test.com",
    recipes: 3,
  };

  return (
    <>
      <UserInfo userData={userData} />
    </>
  );
};

export default User;
