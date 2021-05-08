import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("user")) || [];
  const initiateUser = currentUser ? currentUser : null;

  const [userData, setUserData] = useState(initiateUser);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
