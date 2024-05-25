import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/App.css';

const Verification = () => {
  const [amount, setAmount] = useState('');
  const [units, setUnits] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [meterData, setMeterData] = useState(null);

  useEffect(() => {
    let data;
    if (location.state && location.state.meterData) {
      data = location.state.meterData;
      localStorage.setItem('meterData', JSON.stringify(data));
    } else {
      const storedMeterData = localStorage.getItem('meterData');
      if (storedMeterData) {
        try {
          data = JSON.parse(storedMeterData);
        } catch (error) {
          console.error('Error parsing meterData from localStorage:', error);
        }
      }
    }

    if (data) {
      setMeterData(data);
    }
  }, [location.state]);

  if (!meterData) {
    return (
      <div className="container">
        <h1>Verification</h1>
        <p>No meter data found. Please log in again.</p>
      </div>
    );
  }

  const handleVerification = () => {
    if (!meterData.data || !meterData.data[0] || !meterData.data[0].colPrepayment[0]) {
      setError('Invalid meter data. Please log in again.');
      return;
    }

    const transaction = meterData.data[0].colPrepayment[0];
    const formattedAmount = amount.replace(/,/g, '');

    if (parseFloat(formattedAmount) === transaction.trnAmount && parseFloat(units) === transaction.trnUnits) {
      navigate('/main-details');
    } else {
      setError('Incorrect amount or units. Please try again!');
    }
  };

  return (
    <>
      <Header />
      <div className="container verification-form">
        <h1>Verification</h1>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
        />
        <input
          type="text"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          placeholder="Enter Units"
        />
        <button onClick={handleVerification}>Verify</button>
        {error && <p className="error">
          <img src="/images/warning.png" alt="Error-icon" />
          {error}
        </p>}
      </div>
    </>
  );
};

export default Verification;
