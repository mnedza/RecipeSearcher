import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

import LoadingAnimation from "../../../shared/components/UIElements/LoadingAnimation";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";

import styles from "./SignInComponent.module.css";

const apiUrl = process.env.REACT_APP_API_URL;

const SignInComponent = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const signInHandler = async (event) => {
    event.preventDefault();

    const loginData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const response = await fetch(`${apiUrl}/sign-in`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: loginData.email,
              password: loginData.password,
            }),
          });
          const responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          setIsLoading(false);
          auth.signIn(
            responseData.userId,
            responseData.token,
            responseData.isAdmin
          );
          history.push("/");
        } catch (err) {
          setIsLoading(false);
          setError(err.message || "Something went wrong, please try again.");
        }
      }, 500);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Something went wrong, please try again.");
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading ? (
        <LoadingAnimation />
      ) : (
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
      )}
    </>
  );
};

export default SignInComponent;
