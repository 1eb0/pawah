import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css';
import Header from './Header';

const Login = () => {
  const [meterNumber, setMeterNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // Set playback rate to 0.7x
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.get(`https://selfservice.kplc.co.ke/api/publicData/2.0.1/newContractList?serialNumberMeter=${meterNumber}`, {
        headers: {
          'Authorization': 'Bearer 4e794c549af110d58da2caf765d29a07',
        }
      });
      if (response.data) {
        navigate('/verification', { state: { meterData: response.data } });
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setError('Invalid meter number. Kindly confirm meter number and re-enter correctly!');
      } else {
        setError('An error occurred. Please try again!');
      }
    }
  };

  return (
    <>
    <Header />
    <div className="container login-page">
      <h1>Login</h1>
      <div className="login-form">
        {/* <div>
          <video
            ref={videoRef}
            width="100%"
            height="auto"
            autoPlay
            loop
            muted
            playsInline
            className="login-video"
          >
            <source src="/videos/login-anim.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}
        <input
          type="text"
          value={meterNumber}
          onChange={(e) => setMeterNumber(e.target.value)}
          placeholder="Enter Meter Number"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      {error && <p className="error">
        <img src="/images/warning.png" alt="Error-icon" />
        {error}</p>}
    </div>
    </>
  );
};

export default Login;
