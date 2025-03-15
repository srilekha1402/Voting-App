import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Results.css';


const socket = io();

const Results = () => {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const res = await fetch('/get-results');
    const data = await res.json();
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
    socket.on('voteUpdate', (data) => {
      setResults(data);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div className="results-container">
      <h2>Live Results</h2>
      <ul>
        {results.map((res, index) => (
          <li key={index}>
            {res._id}: {res.count} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
