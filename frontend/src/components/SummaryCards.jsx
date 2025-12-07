import React from 'react';

const SummaryCards = ({ totalUnits, totalAmount, totalDiscount, itemCount }) => {
  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="summary-label">
          Total units sold
          <span className="info-icon">ⓘ</span>
        </div>
        <div className="summary-value">{totalUnits}</div>
      </div>

      <div className="summary-card">
        <div className="summary-label">
          Total Amount
          <span className="info-icon">ⓘ</span>
        </div>
        <div className="summary-value">
          ₹{totalAmount.toLocaleString('en-IN')} 
          <span className="summary-subtext">({itemCount} SRs)</span>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-label">
          Total Discount
          <span className="info-icon">ⓘ</span>
        </div>
        <div className="summary-value">
          ₹{totalDiscount.toLocaleString('en-IN')} 
          <span className="summary-subtext">({itemCount} SRs)</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
