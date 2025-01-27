import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ValidateSignupForm from './ValidateSignupForm';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    phonenumber: '',
    password: ''
  });
 
  const [errors ,setErrors] =useState({});

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
    const validatationErrors = ValidateSignupForm(formData);
    if(Object.keys(validatationErrors).length >0){
      setErrors(validatationErrors);
    }else{
    try{
     const response =await  axios.post('http://localhost:8081/signup',formData);
     const {redirectTo} = response.data;

     if(redirectTo){
      navigate(redirectTo);
     }
    }catch (error){
      console.log('error during signup',error)
    }
  }
    
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
         {errors.username && <p style={{ color: "red" }}>{errors.username}</p>} 
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phonenumber"
            value={formData.phonenumber}
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
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
