import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Registration from './components/pages/student/Registration';
import Instructions from './components/pages/student/Instructions';
import Exam from './components/pages/student/Exam';
import AdminDashboard from './components/pages/admin/Dashboard';
import CreateTest from './components/pages/admin/CreateTest';
import ManageLinks from './components/pages/admin/ManageLinks';
import Monitor from './components/pages/admin/Monitor';
import Results from './components/pages/admin/Results';
import AdminLogin from './components/pages/admin/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test/:linkCode" element={<Registration/>} />
        <Route path="/test/:linkCode/instructions" element={<Instructions />} />
        <Route path="/test/:linkCode/attempt" element={<Exam />} />
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tests/create" element={<CreateTest />} />
        <Route path="/admin/tests/:testId/links" element={<ManageLinks />} />
        <Route path="/admin/tests/:testId/monitor" element={<Monitor />} />
        <Route path="/admin/tests/:testId/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
