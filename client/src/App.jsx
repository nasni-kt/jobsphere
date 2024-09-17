// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from './home';
import JobSeekerDashboard from './JobSeekerDashboard';
import EmployerDashboard from './EmployeeDashboard';
import DashboardRedirect from './DashboardRedirect';
import JobListing from './JobListing';
import Navbar from './Navbar'; // Import Navbar component

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Include Navbar component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobseekerdashboard" element={<JobSeekerDashboard />} />
        <Route path="/employerdashboard" element={<EmployerDashboard />} />
        <Route path="/dashboardredirect" element={<DashboardRedirect />} />
        <Route path="/job-listing" element={<JobListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
