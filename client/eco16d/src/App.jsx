import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import Spreadsheet from './components/Principale/Spreadsheet';
import { useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import ColisSpreadsheet from './components/Colis/ColisSpreadsheet';
import EcoSpreadsheet from './components/Eco/EcoSpreadsheet';

function App() {
  const { isAuthenticated } = useAuth();
  return (
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
                // isAuthenticated ? <HomePage /> : <Navigate to='/login' />
                <HomePage />
              }  
            />
            <Route 
              path= '/principale' 
              element={
                // isAuthenticated ? <Spreadsheet /> : <Navigate to='/login' />
                <Spreadsheet />
              }  
            />
            <Route 
              path= '/colis' 
              element={
                // isAuthenticated ? <Spreadsheet /> : <Navigate to='/login' />
                <ColisSpreadsheet />
              }  
            />
            <Route 
              path= '/eco' 
              element={
                // isAuthenticated ? <Spreadsheet /> : <Navigate to='/login' />
                <EcoSpreadsheet />
              }  
            />
        </Routes>
    </Router>
  )
}

export default App