import React, { useState } from "react";
import "../Styles/Second.css";

const Second = () => {
  const [showPopup, setShowPopup] = useState(false);

  const job = {
    company: "TechSphere",
    title: "Full Stack Developer",
    location: "Bangalore, Karnataka",
    date: "May. 15",
    salary: "₹1,00,000/month",
    experience: "5+ years",
    requirements: "React, Node.js, MongoDB, TypeScript",
    description: `As a Full Stack Developer at TechSphere, you will be responsible for developing and maintaining scalable web applications. This role demands strong expertise in modern JavaScript frameworks, databases, and best practices in full-stack development.`,
    responsibilities: `1. Develop and maintain full-stack web applications.
                        2. Write clean, testable, and efficient code.
                        3. Collaborate with cross-functional teams to deliver high-quality solutions.
                        4. Stay updated with the latest technologies and implement them in projects.`,
    benefits: `- Competitive salary and performance bonuses.
                - Comprehensive health insurance.
                - Flexible working hours and remote work options.`,
  };

  const handleApplyClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="job-page">
      <header className="job-header">
        <h1>{job.title}</h1>
        <h3>{job.company}</h3>
        <p className="job-location">
          <i className="fa fa-map-marker"></i> {job.location}
        </p>
      </header>
      <main className="job-main">
        <div className="job-details">
          <h2>Position Details</h2>
          <p><strong>Start Date:</strong> {job.date}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Experience:</strong> {job.experience}</p>
          <p><strong>Requirements:</strong> {job.requirements}</p>
        </div>
        <div className="job-description">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>
        <div className="job-responsibilities">
          <h2>Responsibilities</h2>
          <p>{job.responsibilities}</p>
        </div>
        <div className="job-benefits">
          <h2>Benefits</h2>
          <p>{job.benefits}</p>
        </div>
        <button className="apply-button" onClick={handleApplyClick}>
          Apply Now
        </button>
      </main>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-popup" onClick={closePopup}>
              &times;
            </span>
            <h2>Upload Your Resume</h2>
            <input type="file" accept=".pdf,.doc,.docx" />
            <button className="submit-button" onClick={closePopup}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Second;
