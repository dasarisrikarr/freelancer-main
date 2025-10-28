import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkilligoWelcome from './Components/Pages/SkilligoWelcome';
import LoginPage from './Components/Pages/loginpage';
import Role from './Components/Pages/Role';
import SignupPage from './Components/Pages/Signuppage';
import Menu from './Components/Pages/Menu';
import SignupPage1 from './Components/Pages/Signuppage1'; 
import First from "./Components/Pages/First";
import Second from "./Components/Pages/Second";
import Third from "./Components/Pages/Third"; 
import Menu2 from './Components/Pages/Menu2';
import Menu3 from './Components/Pages/Menu3';
import Menu4 from './Components/Pages/Menu4';


import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SkilligoWelcome />} /> {/* Start here */}
        <Route path="/login" element={<LoginPage />} /> {/* Auto-redirect target */}
        <Route path="/role" element={<Role />} />
        <Route path="/signuppage" element={<SignupPage />} />
        <Route path="/Signuppage1" element={<SignupPage1 />} />
        <Route path="/menu" element={<Menu />} />
         <Route path="/First" element={<First />} /> {/* Correct route */}
         <Route path="/Second" element={<Second />} /> {/* Correct route */}
          <Route path="/Third" element={<Third />} /> {/* Correct route */}
        <Route path="/Menu2" element={<Menu2 />} /> {/* Correct route */}
        <Route path="/Menu3" element={<Menu3 />} /> {/* Correct route */}
        <Route path="/Menu4" element={<Menu4 />} /> {/* Correct route */}
     

      </Routes>
    </Router>
  );
};

export default App;
