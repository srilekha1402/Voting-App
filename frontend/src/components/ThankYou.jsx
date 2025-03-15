import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <h1>Thank You for Voting!</h1>
      <p>Your vote has been recorded successfully.</p>
      <Link to="/results"><button>View Results</button></Link>
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
};

export default ThankYou;
