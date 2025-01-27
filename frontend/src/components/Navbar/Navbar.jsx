import React from 'react';
import './Navbar.css'; // Importing the corresponding CSS file for styling
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const validateDashboard = () => {
    const phoneNumber = localStorage.getItem('userPhoneNumber');

    if (phoneNumber) {
      // If phone number exists in localStorage, navigate to the dashboard and display the phone number
      navigate(`/Dashboard/${phoneNumber}`);
    } else {
      // If phone number does not exist in localStorage, redirect to login page
      navigate('/Login');
    }
  };

  const Logout = () => {
    localStorage.clear(); // Clear all items from localStorage
    console.log('Cleared the storage');
    navigate('/Login'); // Redirect to the Login page
    console.log('Redirected');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Rental System</div>
      <ul className="navbar-links">
        <Link to="/HomePage"><li>Home</li></Link>
        <li onClick={validateDashboard} style={{ cursor: 'pointer' }} className='logout-item'>DashBoard</li>
        <li><a href="#About">About</a></li>
        <li><a href="#Contact">Contact</a></li>
        <Link to="/Signup"><li>Signup</li></Link>
        <Link to="/Login"><li>Login</li></Link>
        <li onClick={Logout} style={{ cursor: 'pointer' }} className='logout-item'>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
