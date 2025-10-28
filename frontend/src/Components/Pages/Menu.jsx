import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Menu.css";

const Menu = () => {
  const [modalData, setModalData] = useState({
    salary: "",
    experience: "",
    requirements: "",
    link: "",
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isCategoriesVisible, setCategoriesVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:9090/api/jobs');
        if (response.ok) {
          const jobsData = await response.json();
          setJobs(jobsData);
        } else {
          console.error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);


  const categories = [
    "Web Development",
    "Data Analysis",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Sales",
  ];

  const showDetails = (job) => {
    setModalData(job);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const toggleSettings = () => {
    setSettingsVisible(!isSettingsVisible);
    setCategoriesVisible(false); // Hide categories when settings is toggled
  };

  const toggleCategories = () => {
    setCategoriesVisible(!isCategoriesVisible);
    setSettingsVisible(false); // Hide settings when categories is toggled
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(searchQuery) ||
      job.skills.toLowerCase().includes(searchQuery) ||
      job.location.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="menu">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          Skill<span>igo</span>
        </div>
        <nav>
          <a href="#" onClick={toggleCategories}>
            Categories
          </a>
          <a href="#" onClick={toggleSettings}>
            Settings
          </a>
        </nav>
      </header>

      {/* Search Bar Section */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button>Search</button>
      </div>

      {/* Settings Section */}
      {isSettingsVisible && (
        <section className="settings transparent-list">
          <h2>Settings</h2>
          <ul>
            <li>Profile Settings</li>
            <li>Privacy Settings</li>
            <li>Notification Preferences</li>
            <li>Account Management</li>
            <li>Help & Support</li>
            <li onClick={() => navigate("/")}>Logout</li>
          </ul>
        </section>
      )}

      {/* Categories Section */}
      {isCategoriesVisible && (
        <section className="categories transparent-list">
          <h2>Job Categories</h2>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Job Results Section */}
      <section className="job-results">
        <h2>Freelancing Jobs Available</h2>
        {loading ? (
          <div style={{textAlign: 'center', padding: '20px'}}>Loading jobs...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Skills</th>
                <th>Location</th>
                <th>Salary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <tr key={job.id || index}>
                    <td>{job.company}</td>
                    <td>{job.skills}</td>
                    <td>{job.location}</td>
                    <td>{job.salary}</td>
                    <td>
                      <button onClick={() => showDetails(job)}>View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>
                    No jobs found. {jobs.length === 0 ? 'Be the first to post a job!' : 'Try adjusting your search.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      {/* Modal Section */}
      {isModalVisible && (
        <div className="modal" onClick={hideModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span onClick={hideModal} className="close-btn">
              &times;
            </span>
            <h3>Job Details</h3>
            <p>
              <strong>Company:</strong> {modalData.company}
            </p>
            <p>
              <strong>Salary:</strong> {modalData.salary}
            </p>
            <p>
              <strong>Experience:</strong> {modalData.experience}
            </p>
            <p>
              <strong>Skills:</strong> {modalData.skills}
            </p>
            <p>
              <strong>Location:</strong> {modalData.location}
            </p>
            <p>
              <strong>Description:</strong> {modalData.description}
            </p>
            <button
              className="see-more"
              onClick={() => navigate(modalData.link)}
            >
              See More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
