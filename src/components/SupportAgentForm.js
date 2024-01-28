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
    if (!formData.email || !isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    }
    if (!formData.description.trim()) {
        errors.description = 'Description is required';
    }
    return errors;
  };

  const isValidEmail = email => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = phone => {
    // Phone number validation regex
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
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
    } else {
        // Form has errors, display error messages
        setErrors(errors);
    }
  };

  return (
    <div>
      <h2>Create Agent</h2>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <div className="error">{errors.phone}</div>}
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
        {errors.description && <div className="error">{errors.description}</div>}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateAgentForm;