import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Menu3.css';

const Menu3 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state || { category: 'General' };

  const [jobDetails, setJobDetails] = useState({
    company: '',
    experience: '',
    skills: '',
    salary: '',
    description: '',
    location: '',
    benefits: '',
    responsibilities: '',
  });

  const [showPopup, setShowPopup] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePostJob = async () => {
    if (Object.values(jobDetails).some((value) => value.trim() === '')) {
      alert('Please fill in all fields before posting the job.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Make API call to backend to save job
      const response = await fetch('http://localhost:9090/api/jobs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDetails)
      });

      if (response.ok) {
        const savedJob = await response.json();
        console.log('Job posted successfully:', savedJob);
        
        // Update local state
        setPostedJobs((prevJobs) => [...prevJobs, savedJob]);
        
        // Show success popup
        setShowPopup(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to post job');
        alert('Error posting job: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error posting job:', error);
      setError('Network error. Please check if backend is running.');
      alert('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/menu4', { state: { jobs: postedJobs } });
  };

  return (
    <div className="menu3-container">
      <h1 className="menu3-title">Job Details for {category || 'General'}</h1>
      <div className="job-details">
        <div className="job-section">
          <h2>Company</h2>
          <input
            type="text"
            name="company"
            value={jobDetails.company}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>
        <div className="job-section">
          <h2>Experience Required</h2>
          <input
            type="text"
            name="experience"
            value={jobDetails.experience}
            onChange={handleChange}
            placeholder="Enter experience required"
          />
        </div>
        <div className="job-section">
          <h2>Skills</h2>
          <input
            type="text"
            name="skills"
            value={jobDetails.skills}
            onChange={handleChange}
            placeholder="Enter skills (comma-separated)"
          />
        </div>
        <div className="job-section">
          <h2>Salary</h2>
          <input
            type="text"
            name="salary"
            value={jobDetails.salary}
            onChange={handleChange}
            placeholder="Enter salary range"
          />
        </div>
        <div className="job-section">
          <h2>Job Description</h2>
          <textarea
            name="description"
            value={jobDetails.description}
            onChange={handleChange}
            placeholder="Enter job description"
          />
        </div>
        <div className="job-section">
          <h2>Location</h2>
          <input
            type="text"
            name="location"
            value={jobDetails.location}
            onChange={handleChange}
            placeholder="Enter job location"
          />
        </div>
        <div className="job-section">
          <h2>Benefits</h2>
          <textarea
            name="benefits"
            value={jobDetails.benefits}
            onChange={handleChange}
            placeholder="Enter benefits (comma-separated)"
          />
        </div>
        <div className="job-section">
          <h2>Responsibilities</h2>
          <textarea
            name="responsibilities"
            value={jobDetails.responsibilities}
            onChange={handleChange}
            placeholder="Enter responsibilities (comma-separated)"
          />
        </div>
        <button 
          className="post-job-button" 
          onClick={handlePostJob}
          disabled={loading}
        >
          {loading ? 'Posting Job...' : 'Post Job'}
        </button>
        {error && <div style={{color: 'red', marginTop: '10px'}}>{error}</div>}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Job Posted Successfully!</h2>
            <button onClick={handlePopupClose} className="popup-button">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu3;
