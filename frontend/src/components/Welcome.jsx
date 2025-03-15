// import React from 'react';
// import { Link } from 'react-router-dom';

// const Welcome = () => {
//   return (
//     <div className="welcome-container">
//       <h1>Welcome to Voting App</h1>
//       <Link to="/vote"><button>Start Voting</button></Link>
//       <Link to="/results"><button>View Results</button></Link>
//     </div>
//   );
// };

// export default Welcome;
import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to the Voting App</h1>
      <div className="button-group">
        <Link to="/vote">
          <button className="welcome-button">Start Voting</button>
        </Link>
        <Link to="/results">
          <button className="welcome-button">View Results</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
