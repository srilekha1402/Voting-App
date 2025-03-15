import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <div className="thankyou-box">
        <h1>🎉 Thank you for voting!</h1>
        <p>Your vote has been successfully recorded.</p>
        <Link to="/results" className="results-link">View Voting Results</Link>
      </div>
    </div>
  );
};

export default ThankYou;
