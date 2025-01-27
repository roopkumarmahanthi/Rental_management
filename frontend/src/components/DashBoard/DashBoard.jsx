import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const { phoneNumber } = useParams();  // Get phone number from URL
  const [houseData, setHouseData] = useState(null);  // State to store house data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const navigate=useNavigate();
  // Fetch the house data when the component mounts
  useEffect(() => {



    const phoneNumber = localStorage.getItem('userPhoneNumber');
    if (!phoneNumber) {
      // If phone number exists in localStorage, navigate to the dashboard and display the phone number
      navigate('/Login');
    } 


    const fetchHouseData = async () => {
      try {
        console.log(phoneNumber);
  
        const response = await axios.get(`http://localhost:8081/getHotelsByPhone/${phoneNumber}`);
        setHouseData(response.data);  // Set fetched house data
        setLoading(false);  // Set loading to false after data is fetched
      } catch (err) {
        setError('You not yet add house data');  // Handle any errors
        setLoading(false);
      }
    };

    fetchHouseData();
  }, [navigate]);  // Re-run the effect when phoneNumber changes

  // If data is still loading
  if (loading) {
    return <div>Loading house data...</div>;
  }

  // If there is an error
  if (error) {
    return <div>{error}</div>;
  }

  // If no house data found
  if (!houseData || houseData.length === 0) {
    return <div>No houses found for this phone number.</div>;
  }

  return (
    <div>
      <h1>Welcome to Your Dashboard, Phone: {phoneNumber}</h1>

      {/* Render house details */}
      {houseData.map((house, index) => (
        <div key={index} className="rental-card">
          <h3>{house.name}</h3>
          <p><strong>Owner:</strong> {house.ownerName}</p>
          <p><strong>Phone:</strong> {house.ownerPhone}</p>
          <p><strong>Address:</strong> {house.address}</p>
          <p><strong>Type:</strong> {house.houseType}</p>
          <p><strong>BHK:</strong> {house.bhkType}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
