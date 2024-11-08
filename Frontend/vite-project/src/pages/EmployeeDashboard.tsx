import React, { useState } from 'react';
import '../components/css/EmployeeDashboard.css';

interface Entry {
  id: number;
  name: string;
  bank: string;
  accountNo: string;
  amount: string;
  swiftCode: string;
}

const EmployeeDashboard: React.FC = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const entries: Entry[] = [
    { id: 1, name: "John Doe", bank: "ABC Bank", accountNo: "123456", amount: "1000", swiftCode: "ABCD1234" },
    { id: 2, name: "Jane Smith", bank: "XYZ Bank", accountNo: "654321", amount: "2000", swiftCode: "WXYZ5678" },
    // More entries...
  ];

  const openOverlay = (entry: any) => {
    setSelectedEntry(entry);
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    setSelectedEntry(null);
  };

  return (
    <div className="employee-dashboard-container">
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
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.bank}</td>
              <td>{entry.accountNo}</td>
              <td>{entry.amount}</td>
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

            {/* Verification Form with Selected Entry Details */}
            <div className="verification-form">
              <div className="input-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , gap: '20px'}}>
                <input type="text" defaultValue={selectedEntry?.name} placeholder="Enter Recipient's Name" />
                <button>Verify</button>
              </div>
              <div className="input-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,gap: '20px'}}>
                <input type="text" defaultValue={selectedEntry?.bank} placeholder="Enter Recipient's Bank" />
                <button>Verify</button>
              </div>
              <div className="input-group"style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,gap: '20px'}}>
                <input type="text" defaultValue={selectedEntry?.accountNo} placeholder="Enter Recipient's Account No" />
                <button>Verify</button>
              </div>
              <div className="input-group"style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,gap: '20px'}}>
                <input type="text" defaultValue={selectedEntry?.amount} placeholder="Enter Amount to Pay" />
                <button>Verify</button>
              </div>
              <div className="input-group"style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,gap: '20px'}}>
                <input type="text" defaultValue={selectedEntry?.swiftCode} placeholder="Enter Bank Swift Code" />
                <button>Verify</button>
              </div>
            </div>

            <div className="overlay-actions">
              <button onClick={closeOverlay} style={{padding:'10px', width: '30%'}}>Cancel</button>
              <button onClick={closeOverlay} className="submit-btn">Submit</button>
              <button onClick={closeOverlay} className="reject-btn">Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
