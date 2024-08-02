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
import Dashboard from './pages/Dashboard';
import UnverifiedPage from './pages/UnverifiedPage';

function App() {
  const { isAuthenticated, userData } = useAuth();
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
                userData?.role === "admin" ? <Dashboard /> :
                !isAuthenticated ? <Navigate to='/login' /> :
                userData?.isVerified?
                <HomePage /> : <UnverifiedPage />
              }  
            />
            <Route 
              path= '/principale' 
              element={
                isAuthenticated 
                ? <Spreadsheet 
                    selectedCell={selectedCell} 
                    setSelectedCell={setSelectedCell}
                  /> 
                : <Navigate to='/login' />
              }  
            />
            <Route 
              path= '/colis' 
              element={
                isAuthenticated ? <ColisSpreadsheet selectedCell={selectedCell} setSelectedCell={setSelectedCell}/> : <Navigate to='/login' />
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