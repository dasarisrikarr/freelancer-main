import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/First.css";

const First = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const location = useLocation();
  const job = location.state?.job || {
    company: "Infotanks",
    title: "AI Powered Content Writer",
    location: "Vijayawada, Andhra",
    date: "May. 6",
    salary: "₹50,000/month",
    experience: "3+ years",
    requirements: "JavaScript, HTML, SEO",
    description: `As an AI Powered Content Writer at Infotanks, you will create cutting-edge content to enhance
                  the company's online presence. This role requires expertise in JavaScript, HTML, and SEO,
                  and a proven ability to deliver high-quality, engaging content. You will collaborate with
                  cross-functional teams to understand business needs and craft compelling narratives that align
                  with company goals. This position offers an exciting opportunity to contribute to high-impact
                  projects and grow your skills in a supportive, fast-paced environment.`,
    responsibilities: `1. Write clear, engaging, and SEO-optimized content.
                        2. Collaborate with the design team to create visually appealing marketing materials.
                        3. Monitor analytics to improve content performance.
                        4. Research industry trends to keep content relevant and innovative.`,
    benefits: `- Competitive salary and flexible working hours.
                - Opportunity to work with a dynamic team on cutting-edge projects.
                - Access to professional development resources and training.`,
  };

  const handleApplyClick = () => {
    setIsPopupOpen(true);
    document.body.classList.add("no-scroll");
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    document.body.classList.remove("no-scroll");
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

      {isPopupOpen && (
        <div className="popup active">
          <div className="popup-content">
            <span className="close-popup" onClick={handleClosePopup}>
              &times;
            </span>
            <h2>Upload Your Resume</h2>
            <input type="file" accept=".pdf,.doc,.docx" />
            <button className="submit-button" onClick={handleClosePopup}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default First;
