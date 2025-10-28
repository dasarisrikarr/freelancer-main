import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Menu2.css'; // Assuming you use a separate CSS file for styling

const Menu2 = () => {
  const categories = [
    'Web Development',
    'Graphic Design',
    'Content Writing',
    'Data Analysis',
    'Digital Marketing',
    'Mobile App Development',
    'Customer Support',
    'Video Editing',
  ];

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/menu3', { state: { category } }); // Pass category as state
  };

  return (
    <div className="menu2-container">
      <h1 className="menu2-title">Choose a Job Category</h1>
      <div className="categories-list">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-item"
            onClick={() => handleCategoryClick(category)} // Add onClick handler
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu2;
