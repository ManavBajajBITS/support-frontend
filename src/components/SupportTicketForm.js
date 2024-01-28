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

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.topic.trim()) {
      errors.topic = 'Topic is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
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
    } else {
        setErrors(errors);
    }
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      <div>
        <label>Topic:</label>
        <input type="text" name="topic" value={formData.topic} onChange={handleChange} />
        {errors.topic && <div className="error">{errors.topic}</div>}
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
        {errors.description && <div className="error">{errors.description}</div>}
      </div>
      <div>
        <label>Severity:</label>
        <div>
          <label>
            <input type="radio" name="severity" value="low" checked={formData.severity === 'low'} onChange={handleChange}/>low
          </label>
        </div>
        <div>
          <label>
          <input type="radio" name="severity" value="medium" checked={formData.severity === 'medium'} onChange={handleChange}/>medium
          </label>
        </div>
        <div>
          <label>
          <input type="radio" name="severity" value="high" checked={formData.severity === 'high'} onChange={handleChange}/>high
          </label>
        </div>
      </div>
      <div>
        <label>Type:</label>
        <div>
          <label>
            <input type="radio" name="type" value="incident" checked={formData.type === 'incident'} onChange={handleChange}/>incident
          </label>
        </div>
        <div>
          <label>
          <input type="radio" name="type" value="problem" checked={formData.type === 'problem'} onChange={handleChange}/>problem
          </label>
        </div>
        <div>
          <label>
          <input type="radio" name="type" value="service request" checked={formData.type === 'service request'} onChange={handleChange}/>service request
          </label>
        </div>
        <div>
          <label>
          <input type="radio" name="type" value="change request" checked={formData.type === 'change request'} onChange={handleChange}/>change request
          </label>
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateTicketForm;
