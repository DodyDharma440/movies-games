import React, { useState, createContext } from "react";

export const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [pageTable, setPageTable] = useState(0);

  return (
    <TableContext.Provider value={{ pageTable, setPageTable }}>
      {children}
    </TableContext.Provider>
  );
};
