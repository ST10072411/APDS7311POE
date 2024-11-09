import React, { useEffect, useState } from 'react';
import axios from 'axios'; // To make HTTP requests
import '../components/css/EmployeeDashboard.css';

interface Entry {
  _id: string; // MongoDB document ID
  recieverName: string; 
  bank: string; 
  accNumber: number; 
  payAmount: number; 
  swiftCode: string; 
  status: string; // "pending", "approved", or "denied"
}


const EmployeeDashboard: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]); // State for payment entries
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

 /* const entries: Entry[] = [
    { id: 1, name: "John Doe", bank: "ABC Bank", accountNo: "123456", amount: "1000", swiftCode: "ABCD1234" },
    { id: 2, name: "Jane Smith", bank: "XYZ Bank", accountNo: "654321", amount: "2000", swiftCode: "WXYZ5678" },
    // More entries...
  ];*/


  // Fetch pending payments on component mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/payments/pending-submissions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
          },
        });
        setEntries(response.data.payments); // Set the fetched entries
      } catch (error) {
        console.error('Error fetching pending payments:', error);
      }
    };
    fetchPayments();
  }, []);



  const handleDecision = async (status: 'approved' | 'denied') => {
    if (!selectedEntry) return;

    try {
      const response = await axios.patch(
        `/api/payments/${selectedEntry._id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

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
