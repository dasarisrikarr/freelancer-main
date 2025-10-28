import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Menu4.css';

const Menu4 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve jobs from the state passed from Menu3
  const { jobs } = location.state || { jobs: [] };

  // Handle logout
  const handleLogout = () => {
    navigate('/menu2'); // Redirect to Menu2.jsx
  };

  return (
    <div className="menu4-container">
      {/* Job Details Section */}
      <h1 className="menu4-title">Posted Jobs</h1>
      {jobs.length > 0 ? (
        <div className="job-list">
          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <h2>{job.company}</h2>
              <p><strong>Experience Required:</strong> {job.experience}</p>
              <p><strong>Skills:</strong> {job.skills}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Benefits:</strong> {job.benefits}</p>
              <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-jobs-message">No jobs have been posted yet.</p>
      )}

      {/* Logout Button */}
      <div className="menu4-footer">
        <button className="logout-button" onClick={handleLogout}>
         HOME
        </button>
      </div>
    </div>
  );
};

export default Menu4;
