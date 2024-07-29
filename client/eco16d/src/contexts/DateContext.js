import React, { createContext, useContext, useState } from 'react';
import { getYear, getQuarter } from '../EcoSetup';

const DateContext = createContext();

export function DateProvider({ children }) {
  const [year, setYear] = useState(getYear());
  const [quarter, setQuarter] = useState(getQuarter());



  return (
    <DateContext.Provider value={{ year, setYear, quarter, setQuarter }}>
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
  return useContext(DateContext);
}
