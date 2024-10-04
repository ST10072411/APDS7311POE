import React, { useState } from 'react';

const Payments: React.FC = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientBank: '',
    accountNumber: '',
    amount: '',
    swiftCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission logic here
    console.log('Payment submitted:', formData);
  };

  const handleCancel = () => {
    // Handle cancellation logic here
    console.log('Payment cancelled');
    setFormData({
      recipientName: '',
      recipientBank: '',
      accountNumber: '',
      amount: '',
      swiftCode: '',
    });
  };

  return (
    <div className="payments-container">
      <h1>Make a Payment</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipientName">Recipient's Name:</label>
          <input
            type="text"
            id="recipientName"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipientBank">Recipient's Bank:</label>
          <input
            type="text"
            id="recipientBank"
            name="recipientBank"
            value={formData.recipientBank}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Recipient's Account Number:</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount to Transfer:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="swiftCode">SWIFT Code:</label>
          <input
            type="text"
            id="swiftCode"
            name="swiftCode"
            value={formData.swiftCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="spacer"></div>
        <div className="button-group">
          <button type="submit" className="pay-button">PAY Now</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Payments;
