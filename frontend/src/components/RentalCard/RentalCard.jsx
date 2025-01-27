// src/components/RentalCard.jsx
import React from 'react';
import './RentalCard.css'

const RentalCard = ({ house }) => {
  return (
    <div className="rental-card">
      <img src={house.image} alt={house.name} />
      <h3>{house.name}</h3>
      <p>{house.location}</p>
      <p>Rent: ₹{house.price}/month</p>
    </div>
  );
};

export default RentalCard;
