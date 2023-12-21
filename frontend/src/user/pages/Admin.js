import React from "react";
import AdminPanel from "../components/Admin/AdminPanel";

const Admin = (props) => {
  return (
    <>
      <AdminPanel>{props.children}</AdminPanel>
    </>
  );
};

export default Admin;
