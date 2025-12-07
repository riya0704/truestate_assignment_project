import React, { useState } from 'react';

const TransactionTable = ({ items }) => {
  const [copiedPhone, setCopiedPhone] = useState(null);

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone).then(() => {
      setCopiedPhone(phone);
      setTimeout(() => setCopiedPhone(null), 2000);
    });
  };

  if (!items || items.length === 0) {
    return (
      <div className="no-results-new">
        <p>No transactions found</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Customer Region</th>
            <th>Product ID</th>
            <th>Employee name</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item['Transaction ID'] || index}>
              <td>{item['Transaction ID']}</td>
              <td>{item.Date}</td>
              <td>{item['Customer ID']}</td>
              <td className="customer-name">{item['Customer Name']}</td>
              <td>
                <div className="phone-cell">
                  <span>{item['Phone Number']}</span>
                  <button 
                    className="copy-button"
                    onClick={() => handleCopyPhone(item['Phone Number'])}
                    title="Copy phone number"
                  >
                    {copiedPhone === item['Phone Number'] ? (
                      <img src="/images/tick-circle.png" alt="Copied" className="copy-icon" />
                    ) : (
                      <img src="/images/document-text.png" alt="Copy" className="copy-icon" />
                    )}
                  </button>
                </div>
              </td>
              <td>{item.Gender}</td>
              <td>{item.Age}</td>
              <td>{item['Product Category']}</td>
              <td>{item.Quantity}</td>
              <td>₹{item['Final Amount']?.toLocaleString('en-IN')}</td>
              <td>{item['Customer Region']}</td>
              <td>{item['Product ID']}</td>
              <td>{item['Employee Name'] || 'Harsh Agrawal'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
