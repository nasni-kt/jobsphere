import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    console.log('role:', role); // Debugging output

    if (role === 'jobseeker') {
      navigate('/JobSeekerDashboard', { replace: true });
    } else if (role === 'employer') {
      navigate('/EmployerDashboard', { replace: true });
    } else {
      navigate('/login', { replace: true }); 
    }
  }, [navigate]);

  return null;
  
};

export default DashboardRedirect;
