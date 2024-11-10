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
  console.log("EmployeeDashboard mounted");

  const verifyUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, redirecting to login.');
      alert('Please log in to access this page.');
      window.location.href = '/login'; // Redirect to login if no token
      return;
    }

    try {
      // Verify the token and user type
      const authResponse = await axios.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { userType } = authResponse.data;
      console.log(userType);

      if (userType === 'customer') {
        console.error('User is not authorized as an employee.');
        alert('Access denied. Only employees can view this page.');
        window.location.href = '/'; // Redirect to home or an appropriate page
        return;
      }

      console.log('User authenticated as an employee. Proceeding to fetch data.');

      // Fetch pending payments if user is verified as an employee
      const paymentsResponse = await axios.get('/api/employee/pending-submissions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response data:', paymentsResponse.data);

      // Safely handle null or undefined `payments` data
      const payments = paymentsResponse.data.payments || [];

      setEntries(payments);

    } catch (error) {
      console.error('Error verifying user or fetching pending payments:', error);
      alert('Failed to authenticate or fetch data. Please log in again.');
      window.location.href = '/login'; // Redirect if authentication fails
    }
  };

  verifyUser();
}, []);

const handleDecision = async (status: 'approved' | 'denied') => {
  if (!selectedEntry) return;

  try {
      const response = await axios.patch(
          `/api/employee/update-status/${selectedEntry._id}`,
          { status },
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
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