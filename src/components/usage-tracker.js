import React, { useState } from 'react';
import '../styles/Usage-tracker.css';

const Usage = () => {
  const [showInput, setShowInput] = useState(false);
  const [balance, setBalance] = useState('');
  const [initialBal, setInitialBal] = useState(null);
  const [usages, setUsages] = useState([]);
  const [previousValidBal, setPreviousValidBal] = useState(null);

  const handleAddUsageClick = () => {
    setShowInput(true);
  };

  const handleAddClick = () => {
    if (balance !== '') {
      const newBalance = parseFloat(balance);
      if (initialBal === null) {
        setInitialBal(newBalance);
      } else {
        const elapsedPeriod = (new Date() - usages[usages.length - 1]?.timestamp) / 1000; // in seconds
        const consumption = (initialBal - newBalance) / elapsedPeriod;

        if (consumption > 0) {
          const newUsage = {
            initialBal: initialBal,
            comparisonBal: newBalance,
            timestamp: new Date(),
            consumption: consumption,
          };
          setUsages([...usages, newUsage]);
          setPreviousValidBal(newBalance);
        } else {
          setPreviousValidBal(Math.max(previousValidBal, newBalance));
        }
        setInitialBal(newBalance);
      }
      setShowInput(false);
      setBalance('');
    }
  };

  const calculateConsumption = () => {
    if (usages.length === 0) return { hourly: 0, daily: 0, monthly: 0 };

    const validUsages = usages.filter(usage => usage.consumption > 0);
    if (validUsages.length === 0) return { hourly: 0, daily: 0, monthly: 0 };

    const latestUsage = validUsages[validUsages.length - 1];

    const timeDiff = (new Date() - latestUsage.timestamp) / 1000; // in seconds
    const hourlyConsumption = latestUsage.consumption * 3600; // per hour
    const dailyConsumption = hourlyConsumption * 24; // per day
    const monthlyConsumption = dailyConsumption * 30; // per month

    return {
      hourly: hourlyConsumption.toFixed(2),
      daily: dailyConsumption.toFixed(2),
      monthly: monthlyConsumption.toFixed(2),
    };
  };

  const consumption = calculateConsumption();

  return (
    <div className="usage-section">
      <div className="usage-subsection-1">
        <h2>Estimated consumption:</h2>
        {usages.length === 0 ? (
          <div className="usage-messages">
            <img src="/images/warning-y-b.png" alt="warning icon" />
            <p>Wait a few minutes and then enter the displayed balance at that time.</p>
          </div>
        ) : (
          <div className="usage-data">
            <p>{consumption.hourly} Units/hour</p>
            <p>{consumption.daily} Units/day</p>
            <p>{consumption.monthly} Units/month</p>
          </div>
        )}
      </div>
      {!showInput ? (
        <button className='add-bal' onClick={handleAddUsageClick}>
          Add current balance
        </button>
      ) : (
        <div className="add-usage-form">
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="Enter current balance"
            className="balance-input"
          />
          <button className='add-icon' onClick={handleAddClick}>
            <img src="/images/add.png" alt="Add" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Usage;
