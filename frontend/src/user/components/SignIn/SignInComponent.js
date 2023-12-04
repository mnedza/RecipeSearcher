import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

import styles from "./SignInComponent.module.css";

const SignInComponent = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const signInHandler = (event) => {
    event.preventDefault();

    const loginData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    auth.signIn();
    history.push("/");
    console.log(loginData);
  };

  return (
    <div className={`${styles["sign-in"]} wrapper section`}>
      <div className={styles.container}>
        <h2 className={styles.h2}>Sign In</h2>
        <form onSubmit={signInHandler}>
          <div className={styles["form-group"]}>
            <label className={styles.label} htmlFor="email">
              Email:
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              placeholder="enter email"
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
              placeholder="enter password"
              required
            />
          </div>
          <button className={styles.button} type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInComponent;
