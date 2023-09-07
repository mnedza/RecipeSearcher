import React from "react";
import styles from "./Main.module.css";
import Filters from "./Filters";

function Main() {
  return (
    <section className={styles.main}>
      <div className="wrapper">
        <Filters />
        
      </div>
    </section>
  );
}

export default Main;
