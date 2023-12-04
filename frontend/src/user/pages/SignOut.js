import React from "react";

import SignOutComponent from "../components/SignOut/SignOutComponent";

const SignOut = (props) => {
  return (
    <>
      <SignOutComponent>{props.children}</SignOutComponent>
    </>
  );
};

export default SignOut;
