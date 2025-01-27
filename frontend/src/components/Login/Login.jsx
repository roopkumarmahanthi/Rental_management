import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ValidateLoginForm from './ValidateLoginForm';

const Login = () => {
  const [formData, setFormData] = useState({
    phone: '',         // Initialized to an empty string
    password: ''       // Initialized to an empty string
  });

  const [errors , setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const validationErrors = ValidateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:8081/login', formData);
        const { redirectTo } = response.data;
        
        if (redirectTo) {
          if (redirectTo === "/HomePage") {
            localStorage.setItem('userPhoneNumber', formData.phonenumber);
          }

          navigate(redirectTo);
        }
      } catch (error) {
        console.log('Error during login:', error);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phonenumber"
            value={formData.phonenumber || ''}  // Ensure the value is always a defined string
            onChange={handleChange}
            required
          />
          {errors.phonenumber && <p style={{ color: "red" }}>{errors.phonenumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password || ''}  // Ensure the value is always a defined string
            onChange={handleChange}
            required
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
