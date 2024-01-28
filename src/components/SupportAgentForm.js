import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAgentForm = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/support-agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Agent created successfully, navigate back to home
        history.push('/');
      } else {
        console.error('Failed to create agent');
      }
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  };

  return (
    <div>
      <h2>Create Agent</h2>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateAgentForm;