import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Registration from './pages/student/Registration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test/:linkCode" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
