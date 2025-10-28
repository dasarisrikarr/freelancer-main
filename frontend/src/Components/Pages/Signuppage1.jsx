  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import '../Styles/SignupPage1.css';

  const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const togglePassword = () => {
      setShowPassword((prev) => !prev);onabort
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate('/Menu2'); // Use React Router to navigate to the success page
    };

    return (
      <>
        <style>{`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Calibri', sans-serif;
          }

          body {
            background-color: #000;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .signup-container {
            background: rgba(19, 19, 19, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 40px 30px;
            width: 100%;
            max-width: 400px;
            position: relative;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.03);
          }

          h2 {
            text-align: center;
            margin-bottom: 25px;
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
          }

          .input-group {
            position: relative;
            margin-bottom: 30px;
          }

          .input-group input {
            width: 100%;
            background: transparent;
            border: none;
            border-bottom: 1px solid #404040;
            padding: 12px 10px 8px;
            font-size: 16px;
            color: #d2d2d2;
            outline: none;
            transition: border 0.3s ease;
          }

          .input-group label {
            position: absolute;
            left: 10px;
            top: 12px;
            color: #7d7d7d;
            font-size: 14px;
            transition: 0.3s;
            pointer-events: none;
          }

          .input-group input:focus + label,
          .input-group input:not(:placeholder-shown) + label {
            top: -10px;
            left: 5px;
            font-size: 12px;
            color: #a2a2a2;
            background-color: #131313;
            padding: 0 4px;
          }

          .toggle-password {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #a2a2a2;
            cursor: pointer;
            font-size: 16px;
          }

          button {
            width: 100%;
            padding: 12px;
            background: rgb(25, 62, 97);
            color: white;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 15px;
            margin-top: 10px;
            cursor: pointer;
            transition: background 0.3s;
          }

          button:hover {
            background: rgb(33, 76, 122);
          }

          .footer-text {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #9b9b9b;
          }

          .footer-text a {
            color: #a2a2a2;
            text-decoration: none;
            font-weight: bold;
          }

          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 30px #131313 inset !important;
            -webkit-text-fill-color: #bababa !important;
          }
        `}</style>

        <div className="signup-container">
          <form id="signupForm" onSubmit={handleSubmit}>
            <h2>Join Skilligo as Freelancer </h2>

            <div className="input-group">
              <input type="text" id="username" name="username" required placeholder=" " />
              <label htmlFor="username">Username</label>
            </div>

            <div className="input-group">
              <input type="email" id="email" name="email" required placeholder=" " />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                placeholder=" "
              />
              <label htmlFor="password">Password</label>
              <span className="toggle-password" onClick={togglePassword}>
                👁
              </span>
            </div>

            <button type="submit">Sign Up</button>
            <p className="footer-text">
              Already have an account? <a href="index.html">Login</a>
            </p>
          </form>
        </div>
      </>
    );
  };

  export default Signup;
