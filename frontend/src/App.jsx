import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import VoteForm from './components/VoteForm';
import Results from './components/Results';
import ThankYou from './components/ThankYou';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/vote" element={<VoteForm />} />
      <Route path="/results" element={<Results />} />
      <Route path="/thankyou" element={<ThankYou />} />
      
    </Routes>
  );
};

export default App;


