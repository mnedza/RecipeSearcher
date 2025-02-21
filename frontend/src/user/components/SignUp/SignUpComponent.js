import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

import LoadingAnimation from "../../../shared/components/UIElements/LoadingAnimation";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import ImageUpload from "../../../shared/components/ImageUpload/ImageUpload";

import classes from "./SignUpComponent.module.css";

const SignUpComponent = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const apiUrl = process.env.REACT_APP_API_URL;

  const minPassLength = 6;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    image: null,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    image: "",
  });

  const validateEmail = (email) => {
    const emailRegex =
      /^(([^<>()[\].,;:s@"]+(.[^<>()[\].,;:s@"]+)*)|(".+"))@((([^<>()[\].,;:s@"]+.)+[^<>()[\].,;:s@"]{2,})|localhost)$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= minPassLength;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

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
      const isValidConfirmPassword = value === userData.password;
      setErrors({
        ...errors,
        confirmPassword: isValidConfirmPassword ? "" : "Passwords do not match",
      });
    }
  };

  const handleImageInputChange = (file, isValid) => {
    setUserData({ ...userData, image: file });

    if (!isValid) {
      setErrors({ ...errors, image: "Please pick a valid image." });
    } else {
      setErrors({ ...errors, image: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(userData.email)) {
      setErrors({ ...errors, email: "Invalid email format" });
      return;
    } else if (!validatePassword(userData.password)) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters long",
      });
      return;
    } else if (userData.password !== userData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return;
    } else if (!userData.image) {
      setErrors({ ...errors, image: "Please pick an image." });
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", userData.firstName);
      formData.append("surname", userData.lastName);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("image", userData.image);

      const response = await fetch(`${apiUrl}/sign-up`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      auth.signIn(responseData.userId, responseData.token);
      history.push("/");
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
      <div className={`${classes["sign-up"]} wrapper section`}>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div className={classes.container}>
            <h2 className={classes.h2}>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className={`${classes["name-surname"]}`}>
                <div
                  className={`${classes["form-group"]} ${classes["form-name-surname"]} `}
                >
                  <label className={classes.label} htmlFor="firstName">
                    First Name:
                  </label>
                  <input
                    className={`${classes.input} ${classes["name-surname-input"]}`}
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="enter first name"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <p
                    className={`${classes.error} ${
                      errors.firstName && classes["show-error"]
                    }`}
                  >
                    {errors.firstName}
                  </p>
                </div>

                <div
                  className={`${classes["form-group"]} ${classes["form-name-surname"]} `}
                >
                  <label className={classes.label} htmlFor="lastName">
                    Last Name:
                  </label>
                  <input
                    className={`${classes.input} ${classes["name-surname-input"]}`}
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="enter last name"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <p
                    className={`${classes.error} ${
                      errors.lastName && classes["show-error"]
                    }`}
                  >
                    {errors.lastName}
                  </p>
                </div>
              </div>

              <div className={classes["form-group"]}>
                <label
                  className={`${classes.label} ${classes["label-image"]}`}
                  htmlFor="image"
                >
                  Image:
                </label>
                <ImageUpload
                  id="image"
                  mode="add"
                  onInput={handleImageInputChange}
                />
                {errors.image && (
                  <p
                    className={`${classes.error} ${classes["show-error"]} ${classes["show-error-centered"]}`}
                  >
                    {errors.image}
                  </p>
                )}
              </div>

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
                  value={userData.email}
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
                  value={userData.password}
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
                  value={userData.confirmPassword}
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
        )}
      </div>
    </>
  );
};

export default SignUpComponent;
