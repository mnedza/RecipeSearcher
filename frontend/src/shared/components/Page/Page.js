import React from "react";

const Page = (props) => {
  return (
    <section className={`${props.className} section`}>{props.children}</section>
  );
};

export default Page;
