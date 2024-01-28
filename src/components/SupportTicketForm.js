import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTicketForm = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    severity: '',
    type: '',
    status: 'New'
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/support-tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Ticket created successfully, navigate back to home
        history.push('/');
      } else {
        console.error('Failed to create ticket');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      <div>
        <label>Topic:</label>
        <input type="text" name="topic" value={formData.topic} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div>
        <label>Severity:</label>
        <input type="text" name="severity" value={formData.severity} onChange={handleChange} />
      </div>
      <div>
        <label>Type:</label>
        <input type="text" name="type" value={formData.type} onChange={handleChange} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateTicketForm;
