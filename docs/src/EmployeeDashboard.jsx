import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';
import { FaUserCircle, FaPlusSquare, FaClipboardList } from 'react-icons/fa';



function EmployeeDashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    businessEmail: '',
    phone: '',
    numberOfEmployees: ''
  });

  const [jobData, setJobData] = useState({
    jobTitle: '',
    jobDescription: '',
    jobLocation: '',
    jobType: '',
    lpa: '',
    experience: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [jobSubmitted, setJobSubmitted] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // State for editing job
  const [selectedSection, setSelectedSection] = useState('post-job'); // Manage selected section
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    const storedEmail = localStorage.getItem('storedEmail');
    if (storedEmail) {
      const storedApplications = localStorage.getItem(`applications_${storedEmail}`);
      if (storedApplications) {
        setApplications(JSON.parse(storedApplications));
      }
    }
  }, []);
  
  useEffect(() => {
    const storedEmail = localStorage.getItem('storedEmail');
    if (storedEmail) {
      const storedData = localStorage.getItem(`employeeFormData_${storedEmail}`);
      if (storedData) {
        setFormData(JSON.parse(storedData));
        setSubmitted(true);
      }

      const storedJobs = localStorage.getItem(`jobsData_${storedEmail}`);
      if (storedJobs) {
        setJobs(JSON.parse(storedJobs));
      }
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailKey = formData.businessEmail;
    if (emailKey) {
      localStorage.setItem(`employeeFormData_${emailKey}`, JSON.stringify(formData));
      localStorage.setItem('storedEmail', emailKey);
      setSubmitted(true);
    }
  };

  const handleDeleteJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    localStorage.setItem(`jobsData_${formData.businessEmail}`, JSON.stringify(updatedJobs));
  };

  const handleEditJob = (index) => {
    const jobToEdit = jobs[index];
    setJobData(jobToEdit);
    setEditingIndex(index);
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    const emailKey = formData.businessEmail;
    if (emailKey) {
      const jobWithCompanyName = { ...jobData, companyName: formData.companyName };
  
      const updatedJobs = editingIndex !== null
        ? jobs.map((job, i) => (i === editingIndex ? jobWithCompanyName : job))
        : [...jobs, jobWithCompanyName];
  
      setJobs(updatedJobs);
      localStorage.setItem(`jobsData_${emailKey}`, JSON.stringify(updatedJobs));
  
      setJobSubmitted(true);
      setEditingIndex(null); // Reset editing index after submission
      setJobData({ // Clear job data after submission
        jobTitle: '',
        jobDescription: '',
        jobLocation: '',
        jobType: '',
        lpa: '',
        experience: '',
      });
  
      navigate('/job-listing'); // Redirect after submission
    }
  };
  
  const handleEdit = () => {
    const emailKey = formData.businessEmail;
    if (emailKey) {
      localStorage.removeItem(`employeeFormData_${emailKey}`);
      localStorage.removeItem('storedEmail');
    }
    setFormData({
      name: '',
      companyName: '',
      businessEmail: '',
      phone: '',
      numberOfEmployees: ''
    });
    setSubmitted(false);
  };

  return (
    <Container fluid className="mt-5">
    <Row>
    <Col md={4} className="sidebar">
  <div className="sidebar-item d-flex align-items-center" onClick={() => setSelectedSection('profile')}>
    <FaUserCircle className="me-2" /> Profile
  </div>
  <div className="sidebar-item d-flex align-items-center" onClick={() => setSelectedSection('post-job')}>
    <FaPlusSquare className="me-2" /> Post a Job
  </div>
  <div className="sidebar-item d-flex align-items-center" onClick={() => setSelectedSection('posted-jobs')}>
    <FaClipboardList className="me-2" /> Posted Jobs
  </div>
  <div className="sidebar-item d-flex align-items-center" onClick={() => setSelectedSection('get-applications')}>
    <FaClipboardList className="me-2" /> applications
  </div>
  <div className="sidebar-item d-flex align-items-center" onClick={() => setSelectedSection('Job-Analytics/Statistics')}>
    <FaClipboardList className="me-2" /> Job Analytics/Statistics
  </div>
  <div className="sidebar-item d-flex align-items-center" onClick={() => setSelectedSection('Candidate-Search')}>
    <FaClipboardList className="me-2" /> Candidate Search
  </div>
  <div className="sidebar-item d-flex align-items-center" onClick={() => setSelectedSection('Interview-Scheduling')}>
    <FaClipboardList className="me-2" /> Interview Scheduling
  </div>
  <div className="sidebar-item d-flex align-items-center" onClick={() => setSelectedSection('Messages-Inboxs')}>
    <FaClipboardList className="me-2" /> Messages/Inbox
  </div>
</Col>


      <Col md={8}>
        {selectedSection === 'profile' && !submitted && (
          <div>
            <h3 className="mb-4 text-center">
              You haven't posted a job before, so you'll need to create an employer account.
            </h3>
            <Form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
              <Form.Group controlId="formName" className="mb-4">
                <Form.Label>Name *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleFormChange} 
                  placeholder="Your Name" 
                  required 
                  className="form-input"
                />
              </Form.Group>
              <Form.Group controlId="formCompanyName" className="mb-4">
                <Form.Label>Company Name *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleFormChange} 
                  required 
                  placeholder="Enter your company's name"
                  className="form-input"
                />
              </Form.Group>
              <Form.Group controlId="formNumberOfEmployees" className="mb-4">
                <Form.Label>Number of Employees</Form.Label>
                <Form.Control 
                  type="number" 
                  name="numberOfEmployees" 
                  value={formData.numberOfEmployees} 
                  onChange={handleFormChange} 
                  placeholder="Enter number of employees"
                  className="form-input"
                />
              </Form.Group>
              <Form.Group controlId="formBusinessEmail" className="mb-4">
                <Form.Label>Business Email *</Form.Label>
                <Form.Control 
                  type="email" 
                  name="businessEmail" 
                  value={formData.businessEmail} 
                  onChange={handleFormChange} 
                  required 
                  placeholder="Enter your business email"
                  className="form-input"
                />
              </Form.Group>
              <Form.Group controlId="formPhone" className="mb-4">
                <Form.Label>Phone *</Form.Label>
                <Form.Control 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleFormChange} 
                  required 
                  placeholder="Enter your phone number"
                  className="form-input"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3 w-100" style={{backgroundColor:'#7878b9ef'}}>
                Submit
              </Button>
            </Form>
          </div>
        )}
  
        {selectedSection === 'profile' && submitted && (
          <div className="submitted-data p-4 border rounded shadow-sm">
            <h3 className="text-center mb-4" style={{ color: '#5A5EAB', fontWeight: '700'}}>COMPANY DETAILS</h3>
            <div className="mb-3"><strong>Company Name:</strong> {formData.companyName}</div>
            <div className="mb-3"><strong>Number of Employees:</strong> {formData.numberOfEmployees}</div>
            <div className="mb-3"><strong>Name:</strong> {formData.name}</div>
            <div className="mb-3"><strong>Business Email:</strong> {formData.businessEmail}</div>
            <div className="mb-3"><strong>Phone:</strong> {formData.phone}</div>
            <Button variant="secondary" onClick={handleEdit} className="w-100" style={{backgroundColor:'#7878b9ef'}}>
              Edit
            </Button>
          </div>
        )}
  {selectedSection === 'post-job' && (
  <div className="post-job-section">
    <h4 className="text-center mb-4 post-job-title">Publish Job Offer</h4>
    <Form onSubmit={handleJobSubmit} className="form-container p-4 border rounded shadow-sm">
      <Form.Group controlId="formJobTitle" className="mb-4">
        <Form.Label>Job Title *</Form.Label>
        <Form.Control 
          type="text" 
          name="jobTitle" 
          value={jobData.jobTitle} 
          onChange={handleJobChange} 
          required 
          placeholder="Enter the job title"
          className="form-input"
        />
      </Form.Group>
      <Form.Group controlId="formJobDescription" className="mb-4">
        <Form.Label>Job Description *</Form.Label>
        <Form.Control 
          as="textarea" 
          name="jobDescription" 
          value={jobData.jobDescription} 
          onChange={handleJobChange} 
          required 
          placeholder="Enter job description"
          className="form-input"
          rows={4}
        />
      </Form.Group>
      <Form.Group controlId="formJobLocation" className="mb-4">
        <Form.Label>Job Location *</Form.Label>
        <Form.Control 
          type="text" 
          name="jobLocation" 
          value={jobData.jobLocation} 
          onChange={handleJobChange} 
          required 
          placeholder="Enter job location"
          className="form-input"
        />
      </Form.Group>
      <Form.Group controlId="formJobType" className="mb-4">
        <Form.Label>Job Type *</Form.Label>
        <Form.Control 
          type="text" 
          name="jobType" 
          value={jobData.jobType} 
          onChange={handleJobChange} 
          required 
          placeholder="Enter job type (e.g., Full-time, Part-time)"
          className="form-input"
        />
      </Form.Group>
      <Form.Group controlId="formLpa" className="mb-4">
        <Form.Label>LPA *</Form.Label>
        <Form.Control 
          type="text" 
          name="lpa" 
          value={jobData.lpa} 
          onChange={handleJobChange} 
          required 
          placeholder="Enter LPA"
          className="form-input"
        />
      </Form.Group>
      <Form.Group controlId="formExperience" className="mb-4">
        <Form.Label>Experience Required *</Form.Label>
        <Form.Control 
          type="text" 
          name="experience" 
          value={jobData.experience} 
          onChange={handleJobChange} 
          required 
          placeholder="Enter required experience"
          className="form-input"
        />
      </Form.Group>
      <Button 
        variant="primary" 
        type="submit" 
        className="w-100 post-job-button"
      >
        {editingIndex !== null ? 'Update Job' : 'Post Job'}
      </Button>
    </Form>
  </div>
)}

  
        {selectedSection === 'posted-jobs' && (
          <div className='posted-jobs-section'>
            <h4 className=" mb-4 text-center" style={{ color: '#5A5EAB', fontWeight: '700'}}>POSTED JOBS</h4>
            {jobs.length === 0 ? (
              <p className="text-center">No jobs posted yet.</p>
            ) : (
              jobs.map((job, index) => (
                <Card key={index} className="mb-3 border-light shadow-sm">
                  <Card.Body>
                    <Card.Title>{job.jobTitle}</Card.Title>
                    <Card.Text>
                      <strong>Company Name:</strong> {job.companyName}
                      <br />
                      <strong>Description:</strong> {job.jobDescription}
                      <br />
                      <strong>Location:</strong> {job.jobLocation}
                      <br />
                      <strong>Type:</strong> {job.jobType}
                      <br />
                      <strong>LPA:</strong> {job.lpa}
                      <br />
                      <strong>Experience:</strong> {job.experience}
                    </Card.Text>
                    <Button className="btn btn-secondary me-2 onClick={() => handleDeleteJob(index)}">
                      Delete
                    </Button>
                    <Button variant="outline-secondary" onClick={() => handleEditJob(index)}>
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        )}

{selectedSection === 'get-applications' && (
  <div>
    <h3 className="mb-4 text-center">Received Applications</h3>
    {applications.length > 0 ? (
      <ul>
        {applications.map((application, index) => (
          <li key={index}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{application.jobTitle}</Card.Title>
                <Card.Text>Name: {application.name}</Card.Text>
                <Card.Text>Email: {application.email}</Card.Text>
                <Card.Text>Date: {application.date}</Card.Text>
                <a href={`path_to_resumes/${application.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    ) : (
      <p>No applications received yet.</p>
    )}
  </div>
)}

      </Col>
    </Row>
    
  </Container>
  );
  
}

export default EmployeeDashboard;
