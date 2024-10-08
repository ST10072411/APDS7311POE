import React, { useEffect, useState } from 'react';
import '../components/css/Dashboard.css';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    accountNumber: '',
    accountBalance: '',
    username: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Raw user data from server:', data);
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const localPayment = () => {
    window.location.href = "/Payments"; // Navigate to the local payment page
  };

  const internationalPayment = () => {
    window.location.href = "/Payments"; // Navigate to the international payment page
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Customer Dashboard</h1>
      <h2 className="greeting">Hello, {userData.firstName}</h2>
      
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
            <span>Current Acc No:</span> {userData.accountNumber}
          </div>
          <div className="account-detail">
            <span>Available Bal:</span> ${userData.accountBalance}
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

      {/* Debugging information (remove in production) */}
      <div style={{display: 'none'}}>
        <p>Username: {userData.username}</p>
        <p>First Name: {userData.firstName}</p>
        <p>Account Number: {userData.accountNumber}</p>
        <p>Account Balance: {userData.accountBalance}</p>
      </div>
    </div>
  );
};

export default Dashboard;
