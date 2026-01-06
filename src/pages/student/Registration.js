
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './student.scss';

const Registration = () => {
  const { linkCode } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    college: '',
    branch: '',
    passcode: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };


  // Dummy function to validate passcode with backend
  const validatePasscode = async (passcode) => {
    try {
      // TODO: Replace with actual backend API call
      // const response = await fetch(`/api/validate-passcode/${linkCode}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ passcode })
      // });
      // const data = await response.json();
      // return data.isValid;
      
      // Dummy validation: passcode must be at least 4 characters
      return passcode.length >= 4;
    } catch (error) {
      console.error('Error validating passcode:', error);
      return false;
    }
  };

  const validateForm = async () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.college.trim()) {
      newErrors.college = 'College is required';
    }
    
    if (!formData.branch.trim()) {
      newErrors.branch = 'Branch is required';
    }
    
    if (!formData.passcode.trim()) {
      newErrors.passcode = 'Passcode is required';
    } else {
      // Validate passcode with dummy function
      const isValidPasscode = await validatePasscode(formData.passcode);
      if (!isValidPasscode) {
        newErrors.passcode = 'Invalid passcode';
      }
    }
    
    return newErrors;
  };
  const handleNext = (e) => {
    e.preventDefault();
    validateForm().then(newErrors => {
      if (Object.keys(newErrors).length === 0) {
        // Store form data and navigate to next page
        localStorage.setItem('registrationData', JSON.stringify(formData));
        navigate(`/test/${linkCode}/instructions`);
      } else {
        setErrors(newErrors);
      }
    });
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1>Registration</h1>
        
        <form onSubmit={handleNext}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="college">College *</label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Enter your college name"
              className={errors.college ? 'input-error' : ''}
            />
            {errors.college && <span className="error-text">{errors.college}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="branch">Branch *</label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Enter your branch"
              className={errors.branch ? 'input-error' : ''}
            />
            {errors.branch && <span className="error-text">{errors.branch}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="passcode">Passcode *</label>
            <input
              type="password"
              id="passcode"
              name="passcode"
              value={formData.passcode}
              onChange={handleChange}
              placeholder="Enter your passcode"
              className={errors.passcode ? 'input-error' : ''}
            />
            {errors.passcode && <span className="error-text">{errors.passcode}</span>}
          </div>

          <button type="submit" className="btn-next">
            Next Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
