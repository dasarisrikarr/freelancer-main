import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/Third.css";

const Third = () => {
  const location = useLocation();

  const [isPopupVisible, setPopupVisible] = useState(false);

  const job = location.state?.job || {
    company: "Mentor Match",
    title: "Physics Tutor CCSS",
    location: "Guntur, Andhra",
    date: "May. 6",
    salary: "₹25,000/month",
    experience: "1+ years",
    requirements: "Physics, Online Teaching",
    description: `As a Physics Tutor for CCSS at Mentor Match, you will work with students to help them understand and excel in physics. This role requires strong subject expertise, teaching skills, and the ability to conduct engaging online sessions.`,
    responsibilities: `1. Conduct online physics tutoring sessions.
                        2. Prepare custom teaching materials and assignments.
                        3. Monitor student progress and provide regular feedback.
                        4. Stay updated with curriculum standards.`,
    benefits: `- Flexible working hours.
                - Opportunity to inspire students and make an impact.
                - Access to a supportive teaching community and resources.`,
  };

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
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
        <button className="apply-button" onClick={openPopup}>
          Apply Now
        </button>
      </main>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-popup" onClick={closePopup}>
              &times;
            </span>
            <h2>Upload Your Resume</h2>
            <input type="file" />
            <button className="submit-button" onClick={closePopup}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Third;
