import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaClock } from 'react-icons/fa';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function JobListing() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTitle = queryParams.get('title') || '';
  const searchLocation = queryParams.get('location') || '';

  useEffect(() => {
    // Retrieve email from local storage
    const storedEmail = localStorage.getItem('storedEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    // Fetch jobs from local storage based on the email
    if (email) {
      const storedJobs = localStorage.getItem(`jobsData_${email}`);
      if (storedJobs) {
        try {
          const jobsData = JSON.parse(storedJobs);
          setJobs(jobsData);
          // Filter jobs based on search parameters
          const filtered = jobsData.filter(job =>
            job.jobTitle.toLowerCase().includes(searchTitle.toLowerCase()) &&
            job.jobLocation.toLowerCase().includes(searchLocation.toLowerCase())
          );
          setFilteredJobs(filtered);
        } catch (error) {
          console.error("Error parsing jobs data:", error);
        }
      }
    }
  }, [email, searchTitle, searchLocation]);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const storedEmail = localStorage.getItem('storedEmail');
    if (storedEmail) {
      const applications = JSON.parse(localStorage.getItem(`applications_${storedEmail}`)) || [];
      const newApplication = {
        jobTitle: selectedJob.jobTitle,
        name: event.target.formName.value,
        email: event.target.formEmail.value,
        resume: event.target.formResume.files[0].name,
        date: new Date().toLocaleString()
      };
      localStorage.setItem(`applications_${storedEmail}`, JSON.stringify([...applications, newApplication]));
      setShowModal(false);
      alert('Application submitted successfully!');
    }
  };
  
  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center">
        <span style={{color:"#5A5EAB"}}>JOB</span> OPENINGS
      </h3>
      <Row>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="shadow border-0 rounded-lg">
                <Card.Body>
                  <Card.Title className="text-dark mb-2">{job.jobTitle}</Card.Title>
                  <Card.Subtitle className="text-muted mb-3">{job.companyName}</Card.Subtitle>
                  <Card.Text className="text-muted mb-3">{job.jobDescription}</Card.Text>

                  <div className="d-flex align-items-center mb-3">
                    <FaMapMarkerAlt className="me-2" style={{ color: '#6c757d' }} />
                    <span>{job.jobLocation}</span>
                  </div>

                  <div className="d-flex flex-column flex-md-row mb-3">
                    <div className="d-flex align-items-center me-md-4 mb-2 mb-md-0">
                      <FaBriefcase className="me-2" style={{ color: '#007bff' }} />
                      <span>{job.jobType}</span>
                    </div>
                    <div className="d-flex align-items-center me-md-4 mb-2 mb-md-0">
                      <FaDollarSign className="me-2" style={{ color: '#28a745' }} />
                      <span>{job.lpa}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaClock className="me-2" style={{ color: '#dc3545' }} />
                      <span>{job.experience} years</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <Button variant="primary btn-secondary" onClick={() => handleApplyClick(job)} className="me-2" style={{ flex: 1, marginRight: '10px' }}>Apply Now</Button>
                    <Button variant="outline-secondary" style={{ flex: 1 }}>More Details</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No jobs match your search criteria.</p>
        )}
      </Row>

      {/* Application Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {selectedJob?.jobTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group controlId="formResume" className="mb-3">
              <Form.Label>Resume</Form.Label>
              <Form.Control type="file" accept=".pdf,.doc,.docx" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit Application
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default JobListing;
