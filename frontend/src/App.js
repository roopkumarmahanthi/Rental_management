import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import RentalList from './components/RentalList/RentalList';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import DashBoard from './components/DashBoard/DashBoard';
const App = () => (
  <Router>
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} /> {/* Default page */}
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Login" element={<Login/>}/>
        <Route path="/HomePage" element={<HomePage/>} />
        <Route path="/RentalList" element={<RentalList />} />
        <Route path="/DashBoard/:phoneNumber" element={<DashBoard/>} />
      </Routes>
      <Footer/>
    </div>
  </Router>
);

export default App;
