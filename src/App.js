import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Registration from './components/pages/student/Registration';
import Instructions from './components/pages/student/Instructions';
import Exam from './components/pages/student/Exam';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import CreateTest from './pages/admin/CreateTest';
import ManageLinks from './pages/admin/ManageLinks';
import Monitor from './pages/admin/Monitor';
import Results from './pages/admin/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test/:linkCode" element={<Registration/>} />
        <Route path="/test/:linkCode/instructions" element={<Instructions />} />
        <Route path="/test/:linkCode/attempt" element={<Exam />} />
        <Route path="/admin/login" element={<AdminLogin />} />
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
