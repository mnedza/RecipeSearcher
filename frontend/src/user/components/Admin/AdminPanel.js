import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <>
      <Link to="/admin/users">Users</Link>
      <br></br>
      <Link to="/admin/recipes">Receips</Link>
    </>
  );
};

export default AdminPanel;
