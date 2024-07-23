import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import Spreadsheet from './components/Principale/Spreadsheet';
import { useAuth } from './contexts/AuthContext';
import { DateProvider } from './contexts/DateContext';
import HomePage from './pages/HomePage';
import ColisSpreadsheet from './components/Colis/ColisSpreadsheet';
import EcoSpreadsheet from './components/Eco/EcoSpreadsheet';

function App() {
  const { isAuthenticated } = useAuth();
  const [selectedCell, setSelectedCell] = useState(null);

  return (
    <DateProvider>
      <Router>
        <Routes>
            <Route 
              path= '/' 
              element={
                !isAuthenticated ? <Register /> : <Navigate to='/home' />
              } 
            />
            <Route 
              path= '/login' 
              element={
                !isAuthenticated ? <Login /> : <Navigate to='/home' />
              } 
            />
            <Route 
              path= '/home' 
              element={
                isAuthenticated ? <HomePage /> : <Navigate to='/login' />
              }  
            />
            <Route 
              path= '/principale' 
              element={
                isAuthenticated ? <Spreadsheet selectedCell={selectedCell} setSelectedCell={setSelectedCell}/> : <Navigate to='/login' />
              }  
            />
            <Route 
              path= '/colis' 
              element={
                isAuthenticated ? <ColisSpreadsheet /> : <Navigate to='/login' />
              }  
            />
            <Route 
              path= '/eco' 
              element={
                isAuthenticated ? <EcoSpreadsheet /> : <Navigate to='/login' />
              }  
            />
        </Routes>
      </Router>
    </DateProvider>
  )
}

export default App