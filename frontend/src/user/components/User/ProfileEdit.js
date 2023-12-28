import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useLocation, useHistory } from "react-router-dom";

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
  const [isAdminUser, setIsAdminUser] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          isAdmin: isAdminUser,
        }),
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
    <form onSubmit={handleSubmit}>
      {isAdmin && (
        <div>
          <label htmlFor="isAdmin">Administrator privileges:</label>
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={isAdminUser}
            onChange={handleAdminStatusChange}
          />
        </div>
      )}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={surname}
          onChange={handleSurnameChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ProfileEdit;
