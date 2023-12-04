import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";
import classes from "./SignUpComponent.module.css";

const SignUpComponent = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const minPassLength = 6;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const emailRegex =
      /^(([^<>()[\].,;:s@"]+(.[^<>()[\].,;:s@"]+)*)|(".+"))@(([^<>()[\].,;:s@"]+.)+[^<>()[\].,;:s@"]{2,})$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= minPassLength;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors({ ...errors, [name]: "" });

    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setErrors({
        ...errors,
        email: isValidEmail ? "" : "Invalid email format",
      });
    } else if (name === "password") {
      const isValidPassword = validatePassword(value);
      setErrors({
        ...errors,
        password: isValidPassword
          ? ""
          : "Password must be at least 6 characters long",
      });
    } else if (name === "confirmPassword") {
      const isValidConfirmPassword = value === formData.password;
      setErrors({
        ...errors,
        confirmPassword: isValidConfirmPassword ? "" : "Passwords do not match",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Invalid email format" });
      return;
    } else if (!validatePassword(formData.password)) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters long",
      });
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return;
    }

    console.log(formData);
    auth.signIn();
    history.push("/");
  };

  return (
    <div className={`${classes["sign-up"]} wrapper section`}>
      <div className={classes.container}>
        <h2 className={classes.h2}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes["form-group"]}>
            <label className={classes.label} htmlFor="email">
              Email:
            </label>
            <input
              className={classes.input}
              type="email"
              id="email"
              name="email"
              placeholder="enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <p
              className={`${classes.error} ${
                errors.email && classes["show-error"]
              }`}
            >
              {errors.email}
            </p>
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
              placeholder="enter password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <p
              className={`${classes.error} ${
                errors.password && classes["show-error"]
              }`}
            >
              {errors.password}
            </p>
          </div>
          <div className={classes["form-group"]}>
            <label className={classes.label} htmlFor="confirm-password">
              Confirm Password:
            </label>
            <input
              className={classes.input}
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <p
              className={`${classes.error} ${
                errors.confirmPassword && classes["show-error"]
              }`}
            >
              {errors.confirmPassword}
            </p>
          </div>
          <button className={classes.button} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
