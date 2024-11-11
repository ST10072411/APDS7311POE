import React, { useEffect, useState } from 'react';
import axios from 'axios'; // To make HTTP requests
import '../components/css/EmployeeDashboard.css';

const EmployeeDashboard: React.FC = () => {
  interface Entry {
    _id: string; // MongoDB document ID
    recieverName: string; 
    bank: string; 
    accNumber: number; 
    payAmount: number; 
    swiftCode: string; 
    status: string; // "pending", "approved", or "denied"
  }

  const [entries, setEntries] = useState<Entry[]>([]); // State for payment entries
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);


// Fetch pending payments on component mount
useEffect(() => {
  const fetchPendingPayments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, redirecting to login.');
      window.location.href = '/login';
      return;
    }

    try {
      // First, verify the user is an employee
      const userResponse = await axios.get('https://localhost:3000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = userResponse.data;
      if (userData.userType !== 'employee') {
        console.error('User is not an employee');
        alert('Access denied. Only employees can view this page.');
        window.location.href = '/';
        return;
      }

      // Fetch pending payments
      const paymentsResponse = await axios.get('https://localhost:3000/api/employee/pending-submissions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payments = paymentsResponse.data.payments || [];
      setEntries(payments);

    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please log in again.');
      window.location.href = '/login';
    }
  };

  fetchPendingPayments();
}, []);



const handleDecision = async (status: 'approved' | 'denied') => {
  if (!selectedEntry) return;

  try {
    const response = await axios.patch(
      `https://localhost:3000/api/employee/update-status/${selectedEntry._id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    // Update the UI
    setEntries((prevEntries) =>
      prevEntries.filter((entry) => entry._id !== selectedEntry._id)
    );
    closeOverlay();
    alert(`Payment ${status} successfully!`);
  } catch (error) {
    console.error(`Error updating payment status to ${status}:`, error);
    alert('Failed to update payment status. Please try again.');
  }
};

  const openOverlay = (entry: any) => {
    setSelectedEntry(entry);
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    setSelectedEntry(null);
  };

  return (
    <div className="employee-dashboard-container" style={{height: '70vh', overflowY: 'hidden'}}>
      <h1 className="dashboard-title">Employee Dashboard</h1>

      {/* Table with Entries */}
      <table className="entries-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Bank</th>
            <th>Account No</th>
            <th>Amount</th>
            <th>Swift Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry._id}>
              <td>{entry.recieverName}</td>
              <td>{entry.bank}</td>
              <td>{entry.accNumber}</td>
              <td>{entry.payAmount}</td>
              <td>{entry.swiftCode}</td>
              <td>
                <button onClick={() => openOverlay(entry)}>Verify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Overlay Modal */}
      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <h2 style={{color: 'white'}}>Bank Employee Verification</h2>

             {/* Verification Details */}
            <div className="verification-details">
              <p><strong>Name:</strong> {selectedEntry?.recieverName}</p>
              <p><strong>Bank:</strong> {selectedEntry?.bank}</p>
              <p><strong>Account No:</strong> {selectedEntry?.accNumber}</p>
              <p><strong>Amount:</strong> {selectedEntry?.payAmount}</p>
              <p><strong>Swift Code:</strong> {selectedEntry?.swiftCode}</p>
            </div>

            {/* Overlay Actions */}
            <div className="overlay-actions">
              <button onClick={() => handleDecision('approved')} className="submit-btn">Approve</button>
              <button onClick={() => handleDecision('denied')} className="reject-btn">Reject</button>
              <button onClick={closeOverlay} style={{ padding: '10px', width: '30%' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;