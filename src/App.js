import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Registration from './components/pages/student/Registration';
import Instructions from './components/pages/student/Instructions';
import Exam from './components/pages/student/Exam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test/:linkCode" element={<Registration/>} />
        <Route path="/test/:linkCode/instructions" element={<Instructions />} />
        <Route path="/test/:linkCode/attempt" element={<Exam />} />
      </Routes>
    </Router>
  );
}

export default App;
