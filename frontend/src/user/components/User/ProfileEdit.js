import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useLocation, useHistory } from "react-router-dom";
import ImageUpload from "../../../shared/components/ImageUpload/ImageUpload";

import styles from "./ProfileEdit.module.css";

const ProfileEdit = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const currentUserId = auth.userId;
  const isAdmin = auth.isAdmin;

  const [userId, setUserId] = useState(currentUserId);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  // eslint-disable-next-line
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [editedImage, setEditedImage] = useState(null);

  const [isAdminUser, setIsAdminUser] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const updatePreviewUrl = (imageUrl) => {
    setPreviewUrl(imageUrl);
  };

  useEffect(() => {
    if (location.state && location.state.userData) {
      const userData = location.state.userData;
      setName(userData.name || "");
      setSurname(userData.surname || "");
      setEmail(userData.email || "");
      setIsAdminUser(userData.isAdmin || false);
      if (isAdmin && userData._id) {
        setUserId(userData._id);
      }
      updatePreviewUrl(userData.image || "");
      setEditedImage(null);
    }
  }, [location.state, isAdmin]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAdminStatusChange = (e) => {
    setIsAdminUser(e.target.checked);
  };

  const handleImageInputChange = (id, pickedFile, fileIsValid) => {
    if (pickedFile instanceof File) {
      setFile(pickedFile);
      setEditedImage(pickedFile);
      updatePreviewUrl(URL.createObjectURL(pickedFile));
    } else if (typeof pickedFile === "string" && fileIsValid) {
      setFile(null);
      setEditedImage(null);
      updatePreviewUrl(pickedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!previewUrl) {
      console.error("Image not loaded. Please select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("surname", surname);
      formData.append("email", email);
      formData.append("isAdminUser", isAdminUser);

      if (editedImage) {
        formData.append("image", editedImage);
      }

      const response = await fetch(`${apiUrl}/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update user.");
      }

      history.push(`/profile/${userId}`);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <form className={`${styles.form} `} onSubmit={handleSubmit}>
      {isAdmin && (
        <div className={styles.checkboxGroup}>
          <label className={styles.label} htmlFor="isAdmin">
            Administrator privileges:
          </label>
          <input
            className={styles.checkbox}
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            onChange={handleAdminStatusChange}
          />
        </div>
      )}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="name">
          Name:
        </label>
        <input
          className={styles.inputField}
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="surname">
          Surname:
        </label>
        <input
          className={styles.inputField}
          type="text"
          id="surname"
          name="surname"
          value={surname}
          onChange={handleSurnameChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="email">
          Email:
        </label>
        <input
          className={styles.inputField}
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <ImageUpload
        mode="edit"
        id="image"
        onInput={(file, isValid) =>
          handleImageInputChange("image", file, isValid)
        }
        image={`${apiUrl}/${previewUrl}`}
      />
      <button className={styles.button} type="submit" disabled={!previewUrl}>
        Save Changes
      </button>
    </form>
  );
};

export default ProfileEdit;
