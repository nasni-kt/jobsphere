import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [role, setRole] = useState('jobseeker'); // Default role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('location', location);
    formData.append('profilePicture', profilePicture);
    formData.append('role', role);

    axios.post('http://localhost:3001/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(result => {
        console.log('Registration successful:', result);
        setSuccess('Registration successful! You can now log in.');
        // Reset form fields
        setEmail('');
        setUsername('');
        setPassword('');
        setPhone('');
        setLocation('');
        setProfilePicture(null);
        setRole('jobseeker'); // Reset to default role
      })
      .catch(err => {
        console.error('Error during registration:', err);
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      });
  };

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100' style={{ backgroundColor: '#f4f4f9' }}>
      <div className='card p-5 shadow card-container' style={{ width: '650px', borderRadius: '10px' }}>
      <h2 className='text-center mb-4' style={{ color: '#5A5EAB', fontWeight: 'bold' }}>JOBSPHERE</h2>
      <h2 className='text-center mb-4' style={{ color: '#343a40' }}>Register</h2>
        {success && <div className='alert alert-success'>{success}</div>}
        {error && <div className='alert alert-danger'>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email" className='form-label'>Email</label>
            <input
              type="email"
              id="email"
              className='form-control'
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="username" className='form-label'>Username</label>
            <input
              type="text"
              id="username"
              className='form-control'
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="password" className='form-label'>Password</label>
            <input
              type="password"
              id="password"
              className='form-control'
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="phone" className='form-label'>Phone</label>
            <input
              type="tel"
              id="phone"
              className='form-control'
              value={phone}
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="location" className='form-label'>Location</label>
            <input
              type="text"
              id="location"
              className='form-control'
              value={location}
              placeholder="Enter your location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="profilePicture" className='form-label'>Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              className='form-control'
              onChange={handleFileChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="role" className='form-label'>Role</label>
            <select
              id="role"
              className='form-control'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <button type="submit" className='btn btn-primary w-100' style={{backgroundColor:'#7878b9ef'}}>Submit</button>
        </form>
        <p className='text-center mt-3'>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
