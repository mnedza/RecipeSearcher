import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import Page from "../../../shared/components/Page/Page";
import LoadingAnimation from "../../../shared/components/UIElements/LoadingAnimation";
import { Link } from "react-router-dom";
import UserAdmin from "./UserAdmin";
import styles from "./AdminPanel.module.css";

const AdminUsers = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/admin/users`, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, [auth.token, apiUrl]);

  return (
    <Page className={`${styles["admin-navigation"]}`}>
      <div className={`${styles["admin-navigation-box"]}`}>
      <h1>All Users</h1>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <ul>
            {users.map((user) => (
              <Link to={`/admin/users/${user._id}`} key={user._id}>
                <UserAdmin user={user}></UserAdmin>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </Page>
  );
};

export default AdminUsers;
