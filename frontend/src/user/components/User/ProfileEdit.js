import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useLocation } from "react-router-dom";

const ProfileEdit = (props) => {
  const location = useLocation(); // Użyj useLocation jako funkcji

  const auth = useContext(AuthContext);
  const userId = auth.userId;

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state && location.state.userData) {
      // Sprawdź, czy userData istnieje w location.state
      const userData = location.state.userData;
      setName(userData.name || ""); // Ustaw odpowiednie wartości dla stanów danych
      setSurname(userData.surname || "");
      setEmail(userData.email || "");
    }
  }, [location.state]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

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
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update user.");
      }

      console.log("User updated successfully:", responseData.user);
      // Aktualizacja stanu użytkownika po stronie klienta może być przeprowadzona
      // za pomocą funkcji przekazanej przez props z rodzica
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
