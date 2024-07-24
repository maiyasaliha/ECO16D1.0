import React, { createContext, useContext, useState } from 'react';
import { getYear, getQuarter, getNewPage } from '../EcoSetup';

const DateContext = createContext();

export function DateProvider({ children }) {
  const [year, setYear] = useState(getYear());
  const [quarter, setQuarter] = useState(getQuarter());
  const [newPage, setnewPage] = useState(getNewPage());



  return (
    <DateContext.Provider value={{ year, setYear, quarter, setQuarter, newPage, setnewPage }}>
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
  return useContext(DateContext);
}
