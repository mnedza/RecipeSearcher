import React, { useContext, useEffect, useState } from "react";

import Profile from "./Profile";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingAnimation from "../../../shared/components/UIElements/LoadingAnimation";
import { AuthContext } from "../../../shared/context/auth-context";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Modal from "../../../shared/components/UIElements/Modal";

const User = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState();
  const [loadedUser, setLoadedUser] = useState(null);

  const usersId = useParams().userId;

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/profile/${usersId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedUser(responseData.user);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [usersId, auth.token]);

  const errorHandler = () => {
    setError(null);
  };

  const showModalHandler = () => {
    setIsDeleting(true);
  };

  const closeModalHandler = () => {
    setIsDeleting(false);
  };

  const deletingAccountHandler = async () => {
    try {
      const response = await fetch(`http://localhost:5000/profile/${usersId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to delete user.");
      }

      console.log("User deleted successfully");
      setIsDeleting(false);
      auth.signOut();
      history.push("/");
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  if (!auth.isSignedIn) {
    history.push("/sign-in");
    return null;
  }

  if (!auth.isAdmin && usersId !== auth.userId) {
    history.push("/");
    return null;
  }

  return (
    <>
      <Link
        to={{
          pathname: `/edit-profile/${usersId}`,
          state: { userData: loadedUser },
        }}
      >
        Edit Profile
      </Link>
      <button onClick={showModalHandler}>Delete Profile</button>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && !loadedUser && <LoadingAnimation />}
      {!isLoading && loadedUser && <Profile userData={loadedUser} />}
      {!isLoading && loadedUser && isDeleting && (
        <Modal
          message="Are you sure you want to delete this account?"
          onClear={closeModalHandler}
          onConfirm={deletingAccountHandler}
        />
      )}
    </>
  );
};

export default User;
