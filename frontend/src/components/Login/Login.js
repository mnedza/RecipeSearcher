import React from "react";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={`${styles.registration} wrapper`}>
      <div className={styles.container}>
        <h2 className={styles.h2}>Login</h2>
        <form>
          <div className={styles["form-group"]}>
            <label className={styles.label} htmlFor="email">
              Email:
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label className={styles.label} htmlFor="password">
              Password:
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
