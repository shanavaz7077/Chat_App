import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/profile")
      .then((response) => {
        setId(response.data.userId);
        setUsername(response.data.username);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    // Here, you might also want to invalidate the session on the server
    axios
      .post("/logout")
      .then(() => {
        setId(null);
        setUsername(null);
        // Redirect to login page or do other cleanup
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        id,
        setId,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
