import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import PopularCategories from './PopularCategories';
import FeaturedJobs from './FeaturedJobs';
import Footer from './Footer';
import JobSearch from './JobSearch';

function Home() {
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const userRole = localStorage.getItem('userRole');

  const handleSearch = () => {
    navigate(`/job-listing?title=${searchTitle}&location=${searchLocation}`);
  };

  const handleDashboardRedirect = () => {
    if (userRole === 'jobseeker') {
      navigate('/JobSeekerDashboard');
    } else if (userRole === 'employer') {
      navigate('/EmployerDashboard');
    } else {
      navigate('/home');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <JobSearch
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        handleSearch={handleSearch}
      />
      <PopularCategories />
      <FeaturedJobs />
      <Footer />
    </div>
  );
}

export default Home;
