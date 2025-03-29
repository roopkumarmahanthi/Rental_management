// HomePage.js
import React, { useState } from 'react';
// import Navbar from '../Navbar/Navbar';  
// import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'
import './HomePage.css';
import ValidateAddDetailsForm from './ValidationAddDetailsForm';

const HomePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [values, setValues] = useState({
    houseName: '',
    ownerName: '',
    ownerPhone: '',
    address: '',
    houseType: '',
    bhkType: '',
  });
 
  const navigate=useNavigate();
  const toggleForm = () => {
    const phoneNumber = localStorage.getItem('userPhoneNumber');
    if (!phoneNumber) {
      // If phone number exists in localStorage, navigate to the dashboard and display the phone number
      navigate('/Login');
    }
    else 
      setIsFormVisible(!isFormVisible);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
   const [errors,setErrors] =useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted:', values);
    const validatationErrors = ValidateAddDetailsForm(values);
    if(Object.keys(validatationErrors).length >0){
      setErrors(validatationErrors);
    }else{
    axios.post('http://localhost:8081/homePage', values)
      .then(res => {
        console.log(res.data); // Log success response
        alert('Property added successfully!');
      })
      .catch(err => {
        console.error(err); // Log error message
        alert('Error submitting the form.');
      });
      setValues({
        houseName: '',
        ownerName: '',
        ownerPhone: '',
        address: '',
        houseType: '',
        bhkType: '',
      });
      setIsFormVisible(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      
      {/* Button Container */}
      <div className="button-container">
        <Link to="/RentalList"><button className="action-button">Search for House</button></Link>
        <button className="action-button" onClick={toggleForm}>Add Your Property</button>
      </div>
      
      {/* Conditionally Render Form */}
      {isFormVisible && (
        <div className="property-form-container">
          <form className="property-form" onSubmit={handleSubmit}>
            <label>House Name:</label>
            <input 
              type="text" 
              name="houseName" 
              value={values.houseName} 
              placeholder="Enter house name" 
              onChange={handleInput} 
              required  
            />

            <label>Owner Name:</label>
            <input 
              type="text" 
              name="ownerName" 
              value={values.ownerName} 
              placeholder="Enter owner name" 
              onChange={handleInput} 
              required 
            />

            <label>Owner Phone Number:</label>
            <input 
              type="tel" 
              name="ownerPhone" 
              value={values.ownerPhone} 
              placeholder="Enter phone number" 
              onChange={handleInput} 
              required 
            />
             {errors.phonenumber && <p style={{ color: "red" }}>{errors.phonenumber}</p>}

            <label>Address:</label>
            <select name="address" value={values.address} onChange={handleInput} required>
              <option value="">Select Address</option>
              <option value="Sangivalasa">Sangivalasa</option>
              <option value="Anadhapuram">Anadhapuram</option>
              <option value="Marikavalasa">Marikavalasa</option>
              <option value="Madhuravada">Madhuravada</option>
              <option value="Maddilapalem">Maddilapalem</option>
            </select>

            {/* House Type Section */}
            <label>House Type:</label>
            <div className="button-group" >
              <button 
                type="button" 
                className={`type-button ${values.houseType === 'house' ? 'active' : ''}`}
                onClick={() => setValues({ ...values, houseType: 'house' })}
              >
                Full House
              </button>
              <button 
                type="button" 
                className={`type-button ${values.houseType === 'pg' ? 'active' : ''}`}
                onClick={() => setValues({ ...values, houseType: 'pg' })}
              >
                PG/Hostel
              </button>
              <button 
                type="button" 
                className={`type-button ${values.houseType === 'flat' ? 'active' : ''}`}
                onClick={() => setValues({ ...values, houseType: 'flat' })}
              >
                Flats
              </button>
              {errors.houseType && <p style={{ color: "red" }}>{errors.houseType}</p>}
            </div>
     
            {/* BHK Type Section */}
            <label>BHK Type:</label>
            <div className="button-group">
              <button 
                type="button" 
                className={`type-button ${values.bhkType === '1bhk' ? 'active' : ''}`}
                onClick={() => setValues({ ...values, bhkType: '1bhk' })}
              >
                1 BHK
              </button>
              <button 
                type="button" 
                className={`type-button ${values.bhkType === '2bhk' ? 'active' : ''}`}
                onClick={() => setValues({ ...values, bhkType: '2bhk' })}
              >
                2 BHK
              </button>
              <button 
                type="button" 
                className={`type-button ${values.bhkType === '3bhk' ? 'active' : ''}`}
                onClick={() => setValues({ ...values, bhkType: '3bhk' })}
              >
                3 BHK
              </button>
              {errors.bhkType && <p style={{ color: "red" }}>{errors.bhkType}</p>}
            </div>

            <label>Description:</label>
            <textarea 
              name="description" 
              value={values.description} 
              placeholder="Enter description" 
              rows="4"  
             
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
