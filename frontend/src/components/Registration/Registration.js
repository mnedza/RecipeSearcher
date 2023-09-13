import React from "react";
import classes from "./Registration.module.css";

const Registration = () => {
  return (
    <div className={`${classes.registration} wrapper`}>
      <div className={classes.container}>
        <h2 className={classes.h2}>Register</h2>
        <form>
          <div className={classes["form-group"]}>
            <label className={classes.label} htmlFor="email">
              Email:
            </label>
            <input
              className={classes.input}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <label className={classes.label} htmlFor="password">
              Password:
            </label>
            <input
              className={classes.input}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <label className={classes.label} htmlFor="confirm-password">
              Confirm Password:
            </label>
            <input
              className={classes.input}
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>
          <button className={classes.button} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
