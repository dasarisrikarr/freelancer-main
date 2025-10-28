import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/SkilligoWelcome.css';

const SkilligoWelcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); // Redirect after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <h1>Welcome to <span className="brand">Skilligo</span></h1>
      <h2>Where Learning Meets Opportunity</h2>
    </div>
  );
};

export default SkilligoWelcome;
