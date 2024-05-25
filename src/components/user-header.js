import React from 'react';
import '../styles/Header.css'; // Import the CSS file for the header

const Header = ({ meterData }) => {
    return (
      <header className="app-header user-header">
        <div className="logo-container">
          <img src="/images/logo.png" alt="Logo" className ="logo"/>
          <h2 className="logo-text">
              Pawah
          </h2>
        </div>
        <div className="meter-account-info">
          {meterData && (
            <>
            <p>Meter No: {meterData.data[0].colPrepayment[0].msno}</p>
            <p>Acc No: {meterData.data[0].accountReference}</p>
            </>
          )}
        </div>
      </header>
    );
  };  

export default Header;
