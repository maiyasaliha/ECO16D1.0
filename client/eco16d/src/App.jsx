import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import Spreadsheet from './components/Spreadsheet';

function App() {
  return (
    <Router>
        <Routes>
            <Route path= '/' element={<Register />} />
            <Route path= '/login' element={<Login />} />
            <Route path= '/principale' element={<Spreadsheet />} />
        </Routes>
    </Router>
  )
}

export default App