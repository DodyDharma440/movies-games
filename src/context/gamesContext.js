import React, { useState, createContext } from "react";

export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  const [pageTable, setPageTable] = useState(0);

  return (
    <GamesContext.Provider value={{ games, setGames, pageTable, setPageTable }}>
      {children}
    </GamesContext.Provider>
  );
};
