import React from "react";

import SignInComponent from "../components/SignIn/SignInComponent";

const SignIn = (props) => {
  return (
    <>
      <SignInComponent>{props.children}</SignInComponent>
    </>
  );
};

export default SignIn;
