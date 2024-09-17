// src/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleDashboardRedirect = () => {
    if (userRole === 'jobseeker') {
      navigate('/JobSeekerDashboard');
    } else if (userRole === 'employer') {
      navigate('/EmployerDashboard'); 
    } else {
      navigate('/home'); // Redirect to home if no role is found
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <header className="header bg-light border-bottom">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand px-4 px-md-5 mt-2 fw-bold" href="#">
          <h3 style={{ color: '#5A5EAB', fontWeight: '600' }}>JOBSPHERE</h3>
        </a>
        <button
          className="navbar-toggler collapsed d-md-none flex-column justify-content-around mt-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="toggler-icon bottom-bar"></span>
          <span className="toggler-icon top-bar"></span>
          <span className="toggler-icon middle-bar"></span>
        </button>

        <div className="collapse navbar-collapse px-5" id="navbarNav">
          <ul className="navbar-nav ms-auto">
          <li className="nav-item me-md-4 me-lg-5">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item me-md-4 me-lg-5">
              <Link className="nav-link" to="/job-listing">Job Listings</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item me-md-4 me-lg-5">
                  <Link className="nav-link" to="#" onClick={(e) => {
                    e.preventDefault();
                    handleDashboardRedirect();
                  }}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="login-btn btn">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-md-2">
                  <Link className="login-btn btn" to="/login">Login</Link>
                </li>
                <li className="nav-item me-md-4 me-lg-5">
                  <Link className="register-btn btn btn-light" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
