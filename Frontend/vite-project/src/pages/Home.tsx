import React, { useEffect, useState } from 'react';
import '../components/css/Dashboard.css'; 

const Dashboard: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerBalance, setCustomerBalance] = useState('');
  const [accNumber, setAccNumber] = useState('');

  useEffect(() => {
    // Retrieve values from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedBalance = localStorage.getItem('accountBalance');
    const storedAccountNumber = localStorage.getItem('accountNumber');

    // Update state variables
    if (storedUsername) setCustomerName(storedUsername);
    if (storedBalance) setCustomerBalance(`$${storedBalance}`);
    if (storedAccountNumber) setAccNumber(storedAccountNumber);
  }, []); // Empty dependency array ensures this runs once after component mounts

  const localPayment = () => {
    window.location.href = "/Payments"; // Navigate to the local payment page
  };

  const internationalPayment = () => {
    window.location.href = "/Payments"; // Navigate to the international payment page
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Customer Dashboard</h1>
      <h2 className="greeting">Hello, {customerName || "Customer's Name"}</h2>
      
      <div className="payment-buttons">
        <button className="payment-btn" onClick={localPayment}>
          Make Local Payment
        </button>
        <button className="payment-btn" onClick={internationalPayment}>
          Make International Payment
        </button>
      </div>
      
      <div className="banking-details">
        <h3>Banking Details</h3>
        <div className="account-info">
          <div className="account-detail">
            <span>Current Acc No:</span> {accNumber || "xxxxxxxxxxx"}
          </div>
          <div className="account-detail">
            <span>Available Bal:</span> {customerBalance || "$0.00"}
          </div>
        </div>
      </div>

      <div className="payment-receipts">
        <h3>Payment Receipts</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024/08/20</td>
              <td>Sch Fees</td>
              <td>$200</td>
              <td><button className="pay-again-btn">Pay again</button></td>
            </tr>
            <tr>
              <td>2024/08/20</td>
              <td>Home R</td>
              <td>$100</td>
              <td><button className="pay-again-btn">Pay again</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
