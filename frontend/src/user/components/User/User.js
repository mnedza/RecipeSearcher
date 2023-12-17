import React, { useContext, useEffect, useState } from "react";

import UserInfo from "./UserInfo";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingAnimation from "../../../shared/components/UIElements/LoadingAnimation";
import { AuthContext } from "../../../shared/context/auth-context";

const User = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUser, setLoadedUser] = useState();

  const usersId = auth.userId;

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
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [usersId, auth.token]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading ? <LoadingAnimation /> : <UserInfo userData={loadedUser} />}
    </>
  );
};

export default User;
