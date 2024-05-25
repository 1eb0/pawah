import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Verification from './components/Verification';
import MainDetails from './components/MainDetails';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/main-details" element={<MainDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
