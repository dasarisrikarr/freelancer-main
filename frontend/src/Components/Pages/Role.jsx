import React from 'react';
import { useNavigate } from 'react-router-dom';

const Role = () => {
  const navigate = useNavigate(); // Hook to navigate to other routes

  const selectRole = (role) => {
    if (role === 'freelancer') {
      navigate('/Signuppage1');
      // Keep this for freelancer role if it's a static page
    } else if (role === 'client') {
      navigate('/Signuppage'); // This redirects to the Signup.jsx page
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Calibri&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Calibri', sans-serif;
          }

          body {
            background: #000;
            color: #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }

          .centered-flex {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .main-container {
            width: 100%;
            max-width: 800px;
            padding: 40px;
          }

          .role-box {
            background: #121212;
            border-radius: 20px;
            padding: 30px;
            border: 1px solid #2a2a2a;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.03);
            text-align: center;
          }

          .role-box h2 {
            font-size: 26px;
            color: white;
            margin-bottom: 10px;
          }

          .subtitle {
            color: #a2a2a2;
            font-size: 14px;
            margin-bottom: 30px;
          }

          .card-container {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
          }

          .role-card {
            flex: 1 1 45%;
            background: #1c1c1c;
            padding: 25px 20px;
            border-radius: 15px;
            border: 1px solid #2d2d2d;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .role-card:hover {
            background: #272727;
            transform: translateY(-5px);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
          }

          .role-card .icon {
            font-size: 40px;
            color: #7d7d7d;
            margin-bottom: 15px;
          }

          .role-card h3 {
            color: #f0f0f0;
            margin-bottom: 10px;
            font-size: 18px;
          }

          .role-card p {
            color: #9a9a9a;
            font-size: 14px;
          }
        `}
      </style>

      <div className="main-container centered-flex">
        <div className="role-box">
          <h2>Select Your Role</h2>
          <p className="subtitle">Let us know how you want to use Skilligo</p>
          <div className="card-container">
            <div className="role-card" onClick={() => selectRole('freelancer')}>
              <i className="fa fa-laptop icon"></i>
              <h3>I'm a Freelancer</h3>
              <p>Find projects, connect with clients, and get paid securely.</p>
            </div>
            <div className="role-card" onClick={() => selectRole('client')}>
              <i className="fa fa-briefcase icon"></i>
              <h3>I'm a Client</h3>
              <p>Hire top freelancers to get your job done efficiently.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
