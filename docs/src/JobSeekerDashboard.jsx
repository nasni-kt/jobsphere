import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'; // Import the + icon


function JobSeekerDashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error fetching user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleResumeUpload = async (event) => {
    const formData = new FormData();
    formData.append('resume', event.target.files[0]);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/user/uploadResume', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Resume uploaded successfully');
    } catch (err) {
      console.error('Error uploading resume:', err);
      setError('Error uploading resume.');
    }
  };

  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        {user ? (
          <div className="text-center">
            <h1 className="mb-4">
              Welcome, <span style={{ color: '#7b7bc4ef' }}>{user.username}</span>
            </h1>
            <img 
              src={user.profilePicture 
                ? `http://localhost:3001/uploads/${user.profilePicture}` 
                : 'client/public/download.jpeg'
              } 
              alt="Profile" 
              className="img-fluid rounded-circle mb-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
            />
            <p className="lead">Email: {user.email}</p>
            <p className="lead">Phone: {user.phone || 'Not provided'}</p>
            <p className="lead">Location: {user.location || 'Not provided'}</p>

            <div className="d-flex justify-content-center mt-4">
              <button 
                className="btn btn-secondary me-3"
                onClick={() => window.location.href = '/find-jobs'}
                style={{ backgroundColor: "#7b7bc4ef" }}
              >
                Find Jobs
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => fileInputRef.current.click()}
                style={{ backgroundColor: '#c1c1eeef', borderColor: '#c1c1eeef', color: 'black' }}
              >
                Upload Resume
              </button>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                ref={fileInputRef} 
                onChange={handleResumeUpload} 
                style={{ display: 'none' }} 
              />
            </div>

            <div className="mt-4">
              <div className="input-container">
                <FaPlus className="input-icon" />
                <input 
                  type="text" 
                  value="Improve your job matches" 
                  className="form-control mb-2" 
                  readOnly 
                  onClick={() => window.location.href = '/improve-job-matches'} 
                  style={{ cursor: 'pointer' }} 
                />
              </div>
              <div className="input-container">
                <FaPlus className="input-icon" />
                <input 
                  type="text" 
                  value="Qualifications" 
                  className="form-control mb-2" 
                  readOnly 
                  onClick={() => window.location.href = '/qualifications'} 
                  style={{ cursor: 'pointer' }} 
                />
              </div>
              <div className="input-container">
                <FaPlus className="input-icon" />
                <input 
                  type="text" 
                  value="Job preferences" 
                  className="form-control mb-2" 
                  readOnly 
                  onClick={() => window.location.href = '/job-preferences'} 
                  style={{ cursor: 'pointer' }} 
                />
              </div>
              <div className="input-container">
                <FaPlus className="input-icon" />
                <input 
                  type="text" 
                  value="Hide jobs with these details" 
                  className="form-control mb-2" 
                  readOnly 
                  onClick={() => window.location.href = '/hide-jobs'} 
                  style={{ cursor: 'pointer' }} 
                />
              </div>
              <div className="input-container">
                <FaPlus className="input-icon" />
                <input 
                  type="text" 
                  value="Ready to work" 
                  className="form-control mb-2" 
                  readOnly 
                  onClick={() => window.location.href = '/ready-to-work'} 
                  style={{ cursor: 'pointer' }} 
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobSeekerDashboard;
