import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function FeaturedJobs() {
  return (
    <footer className="footer bg-light text-center py-3 mt-5">
        <p>&copy; 2024 Jobsphere. All rights reserved.</p>
        <ul className="list-unstyled d-flex justify-content-center">
          <li className="mx-2"><Link to="/privacy">Privacy Policy</Link></li>
          <li className="mx-2"><Link to="/terms">Terms of Service</Link></li>
        </ul>
      </footer>
  )
}

export default FeaturedJobs;