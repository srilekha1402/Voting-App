import React, { useState } from 'react';
import './VoteForm.css';

const VoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    aadhaar: '',
    phone: '',
    age: '',
    voterId: '',
    candidate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.age < 18) {
      alert('You must be at least 18 years old to vote.');
      return;
    }

    try {
      const response = await fetch('/submit-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Redirect to thank you page served by backend
        // window.location.href = '/thankyou.html';
        window.location.href = '/thankyou';
      } else {
        const errorText = await response.text();
        alert(errorText);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="vote-form-container">
      <h2>Cast Your Vote</h2>
      <form onSubmit={handleSubmit} className="vote-form">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="aadhaar" placeholder="Aadhaar ID" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="voterId" placeholder="Voter ID" onChange={handleChange} required />
        
        <label>Select Candidate:</label>
        <select name="candidate" onChange={handleChange} required>
          <option value="">--Choose--</option>
          <option value="Candidate A">Candidate A</option>
          <option value="Candidate B">Candidate B</option>
          <option value="Candidate C">Candidate C</option>
        </select>

        <button type="submit">Submit Vote</button>
      </form>
    </div>
  );
};

export default VoteForm;
