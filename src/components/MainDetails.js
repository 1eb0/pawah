import React, { useState } from 'react';
import Header from './user-header';
import Usages from './usage-tracker';
import Blackout from './Geo-blackout';
import '../styles/App.css';

const MainDetails = () => {
  const meterData = JSON.parse(localStorage.getItem('meterData'));
  const [visibleDetailsIndex, setVisibleDetailsIndex] = useState(null);

  if (!meterData) {
    return (
      <div className="container">
        <h1>Main Details</h1>
        <p className="error-msg">No meter data found. Please log in again.</p>
      </div>
    );
  }

  const calculateTimeSince = (timestamp) => {
    const now = new Date();
    const transactionDate = new Date(timestamp);
    const diff = now - transactionDate;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingMinutes = minutes % 60;
    const remainingHours = hours % 24;

    let timeSince = '';
    if (days > 0) timeSince += `${days} day${days > 1 ? 's' : ''} `;
    if (remainingHours > 0) timeSince += `${remainingHours} hr${remainingHours > 1 ? 's' : ''} `;
    if (remainingMinutes > 0) timeSince += `${remainingMinutes} min${remainingMinutes > 1 ? 's' : ''}`;
    if (!timeSince) timeSince = 'Just now';

    return { timeSince: timeSince.trim(), days };
  };

  const toggleDetails = (index) => {
    setVisibleDetailsIndex(visibleDetailsIndex === index ? null : index);
  };

  return (
    <>
      <Header meterData={meterData} />

      <div className="container main-details-page">
      <Usages />

        <div className="transactions-grid">
          {meterData.data[0].colPrepayment.map((transaction, index) => {
            const date = new Date(transaction.trnTimestamp);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            const { timeSince, days } = calculateTimeSince(transaction.trnTimestamp);

            return (
              <div key={index} className="transaction">
                <div className="date-details">
                  <div className="calendar-icon">
                    <img src="/images/calendar.png" alt="Timestamp icon" className="calendar-icon" />
                  </div>
                  <div className="transaction-date">
                    <p className="payment-date">{formattedDate} </p>
                    <p className="payment-time"> {formattedTime} hrs</p>
                  </div>
                </div>
                <p className={`time-since ${days > 7 ? 'older' : 'newer'}`}>{timeSince} ago</p>
                <p className="token-no">Token: {transaction.tokenNo}</p>
                <p className="units-amt">Units: {transaction.trnUnits}</p>
                <div className="money-section">
                  <img src="/images/money.png" alt="Money icon" className="money-icon" />
                  <p>=/{transaction.trnAmount}</p>
                </div>

                <div className="more-details-link" onClick={() => toggleDetails(index)}>
                  <p> More details</p>
                  <img src="/images/plus-2.png" alt="More details icon" className="more-details-icon" />
                </div>

                {visibleDetailsIndex === index && (
                  <div className="more-details">
                    {/* <p>Purchase Method: {transaction.pMethod}</p> */}
                    <p>Token Amount Ksh: {transaction.concepts.find(concept => concept.codConcept === 'RESSTEP0')?.amount}</p>
                    <p>VAT: {transaction.concepts.find(concept => concept.codConcept === 'RESSTEP0TAX')?.amount}</p>
                    <p>Fuel Energy Charge: {transaction.concepts.find(concept => concept.codConcept === 'RESFUEL0')?.amount}</p>
                    <p>Forex Charge: {transaction.concepts.find(concept => concept.codConcept === 'RESFOREX0')?.amount}</p>
                    <p>EPRA Charge: {transaction.concepts.find(concept => concept.codConcept === 'RESERCL0')?.amount}</p>
                    <p>WARMA Charge: {transaction.concepts.find(concept => concept.codConcept === 'RESWARMAL0')?.amount}</p>
                    <p>REP Charge: {transaction.concepts.find(concept => concept.codConcept === 'RESREPL0')?.amount}</p>
                    <p>Inflation Adjustment: {transaction.concepts.find(concept => concept.codConcept === 'RESINFL0')?.amount}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
};

export default MainDetails;
