// RentalList.js
import React, { useState } from 'react';
import axios from 'axios';
import './RentalList.css';

const RentalList = () => {
  const [searchValues, setSearchValues] = useState({
    address: '',
    houseType: '',
    bhkType: '',
  });

  const [rentalData, setRentalData] = useState([]); // To store the fetched rental data

  const handleInput = (event) => {
    const { name, value } = event.target;
    setSearchValues({
      ...searchValues,
      [name]: value,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();

    // Axios GET request with query parameters
    axios.get('http://localhost:8081/searchRentals', {
      params: searchValues,
    })
    .then((response) => {
      console.log(response.data); // Log fetched data
      setRentalData(response.data); // Update rentalData state with response
    })
    .catch((error) => {
      console.error('Error fetching rentals:', error);
      alert('Failed to fetch rental properties.');
    });
  };

  return (
    <div className="rental-list-container">
      {/* Search Form */}
      <form className="search-form" onSubmit={handleSearch}>
        <label>Address:</label>
        <select name="address" value={searchValues.address} onChange={handleInput} required>
          <option value="">Select Address</option>
          <option value="Sangivalasa">Sangivalasa</option>
          <option value="Anadhapuram">Anadhapuram</option>
          <option value="Marikavalasa">Marikavalasa</option>
          <option value="Madhuravada">Madhuravada</option>
          <option value="Maddilapalem">Maddilapalem</option>
        </select>

        <label>House Type:</label>
        <div className="button-group">
          <button 
            type="button" 
            className={`type-button ${searchValues.houseType === 'house' ? 'active' : ''}`}
            onClick={() => setSearchValues({ ...searchValues, houseType: 'house' })}
          >
            Full House
          </button>
          <button 
            type="button" 
            className={`type-button ${searchValues.houseType === 'pg' ? 'active' : ''}`}
            onClick={() => setSearchValues({ ...searchValues, houseType: 'pg' })}
          >
            PG/Hostel
          </button>
          <button 
            type="button" 
            className={`type-button ${searchValues.houseType === 'flat' ? 'active' : ''}`}
            onClick={() => setSearchValues({ ...searchValues, houseType: 'flat' })}
          >
            Flats
          </button>
        </div>

        <label>BHK Type:</label>
        <div className="button-group">
          <button 
            type="button" 
            className={`type-button ${searchValues.bhkType === '1bhk' ? 'active' : ''}`}
            onClick={() => setSearchValues({ ...searchValues, bhkType: '1bhk' })}
          >
            1 BHK
          </button>
          <button 
            type="button" 
            className={`type-button ${searchValues.bhkType === '2bhk' ? 'active' : ''}`}
            onClick={() => setSearchValues({ ...searchValues, bhkType: '2bhk' })}
          >
            2 BHK
          </button>
          <button 
            type="button" 
            className={`type-button ${searchValues.bhkType === '3bhk' ? 'active' : ''}`}
            onClick={() => setSearchValues({ ...searchValues, bhkType: '3bhk' })}
          >
            3 BHK
          </button>
        </div>

        <button type="submit">Search</button>
      </form>

      {/* Rental List Display */}
      <div className="rental-results">
        {rentalData.length > 0 ? (
          rentalData.map((rental, index) => (
            <div key={index} className="rental-card">
              <h3>{rental.houseName}</h3>
              <p><strong>Owner:</strong> {rental.ownerName}</p>
              <p><strong>Phone:</strong> {rental.ownerPhone}</p>
              <p><strong>Address:</strong> {rental.address}</p>
              <p><strong>Type:</strong> {rental.houseType}</p>
              <p><strong>BHK:</strong> {rental.bhkType}</p>
            </div>
          ))
        ) : (
          <p>No rental properties found. Try refining your search.</p>
        )}
      </div>
    </div>
  );
};

export default RentalList;
