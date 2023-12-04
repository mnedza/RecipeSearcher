import React from "react";

import SignUpComponent from "../components/SignUp/SignUpComponent";

const SignUp = (props) => {
  return (
    <>
      <SignUpComponent>{props.children}</SignUpComponent>
    </>
  );
};

export default SignUp;
