import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function FeaturedJobs() {
  return (
    <section className="featured-jobs text-center py-4 mt-4">
      <h2 className='fw-bold mt-5'>Featured Jobs</h2>
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="job-card p-3 border rounded">
              <h5 className="fs-5 fw-bold">Senior Graphic Designer</h5>
              <p><span className="text-muted">Company:</span> XYZ</p>
              <p><span className="text-muted">Location:</span> New York, NY</p>
              <p><span className="text-muted">Experience:</span> 5+ Years</p>
              <p><span className="text-muted">LPA:</span> 15 Lakhs</p>

              <div className="job-links">
                <Link to="/job-details/1" className="btn btn-secondary btn-sm">View Details</Link>
                <Link to="#" className="btn btn-outline-secondary btn-sm ms-2">Not Applied</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="job-card p-3 border rounded">
              <h5 className="fs-5 fw-bold">Junior Web Developer</h5>
              <p><span className="text-muted">Company:</span> XYZ</p>
              <p><span className="text-muted">Location:</span> New York, NY</p>
              <p><span className="text-muted">Experience:</span> 5+ Years</p>
              <p><span className="text-muted">LPA:</span> 15 Lakhs</p>

              <div className="job-links">
                <Link to="/job-details/2" className="btn btn-secondary btn-sm">View Details</Link>
                <Link to="#" className="btn btn-outline-secondary btn-sm ms-2">Not Applied</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="job-card p-3 border rounded">
              <h5 className="fs-5 fw-bold">UX/UI Designer</h5>
              <p><span className="text-muted">Company:</span> XYZ</p>
              <p><span className="text-muted">Location:</span> New York, NY</p>
              <p><span className="text-muted">Experience:</span> 5+ Years</p>
              <p><span className="text-muted">LPA:</span> 15 Lakhs</p>

              <div className="job-links">
                <Link to="/job-details/3" className="btn btn-secondary btn-sm">View Details</Link>
                <Link to="#" className="btn btn-outline-secondary btn-sm ms-2">Not Applied</Link>
              </div>
            </div>
          </div>
          {/* Add more job cards as needed */}
        </div>
      </div>
    </section>
  );
}

export default FeaturedJobs;
