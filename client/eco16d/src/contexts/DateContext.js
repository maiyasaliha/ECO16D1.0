import React, { createContext, useContext, useState } from 'react';
import { getYear, getQuarter, getAdd } from '../EcoSetup';

const DateContext = createContext();

export function DateProvider({ children }) {
  const [year, setYear] = useState(getYear());
  const [quarter, setQuarter] = useState(getQuarter());
  const [add, setadd] = useState(getAdd());

  return (
    <DateContext.Provider value={{ year, setYear, quarter, setQuarter, add, setadd }}>
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
  return useContext(DateContext);
}
