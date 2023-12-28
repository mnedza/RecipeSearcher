import React from "react";
import { Link } from "react-router-dom";

import Page from "../../../shared/components/Page/Page";

import styles from "./AdminPanel.module.css";

const AdminPanel = () => {
  return (
    <Page className={`${styles["admin-navigation"]}`}>
      <h1>Admin Panel</h1>
      <div className={`${styles["admin-navigation-box"]}`}>
        <Link to="/admin/users" className={styles.link}>
          Show Users
        </Link>
        <Link to="/admin/recipes" className={styles.link}>
          Show Recipes
        </Link>
        <Link to="/admin/recipes/add-recipe" className={styles.link}>
          Add New Recipe
        </Link>
      </div>
    </Page>
  );
};

export default AdminPanel;
