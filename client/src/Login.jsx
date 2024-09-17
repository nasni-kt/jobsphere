import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
  
    axios.post('http://localhost:3001/login', { email, password })
    .then(result => {
      if (result.data.message === "Login successful") {
        console.log('Login successful:', result);
  
        // Store JWT and role in localStorage
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('userRole', result.data.role);
  
        // Navigate to home page
        navigate('/home');
      } else {
        setError(result.data.message || 'Login failed. Please try again.');
      }
    })
    .catch(err => {
      console.error('Error during login:', err.response ? err.response.data : err.message);
      setError('An error occurred. Please try again.');
    });
  }
  
  
  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100' style={{ backgroundColor: '#f4f4f9' }}>
      <div className='card p-5 shadow' style={{ width: '400px', borderRadius: '10px' }}>
        <h2 className='text-center mb-4' style={{ color: '#5A5EAB', fontWeight: 'bold' }}>JOBSPHERE</h2>
        <h2 className='text-center mb-4' style={{ color: '#343a40' }}>Login</h2>
        {error && <div className='alert alert-danger'>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="email" className='form-label' style={{ fontWeight: '500' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className='form-control'
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px' }}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='form-label' style={{ fontWeight: '500' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className='form-control'
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px' }}
            />
          </div>
          <button type="submit" className='btn btn-primary w-100' style={{ backgroundColor: '#5A5EAB', border: 'none', padding: '10px', borderRadius: '5px', fontWeight: 'bold' }}>Submit</button>
        </form>
        <p className='text-center mt-3'>
          Don't have an account? <Link to="/register" style={{ color: '#5A5EAB', textDecoration: 'underline' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;