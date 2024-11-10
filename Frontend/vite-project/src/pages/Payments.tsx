import React, { useState } from 'react';
import '../components/css/payments.css';


const Payments: React.FC = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientBank: '',
    accountNumber: '',
    amount: '',
    swiftCode: '',
  });

  const regexPatterns = {
    recipientName: /^[a-zA-Z\s-]+$/, // Letters, spaces, and hyphens
    recipientBank: /^[a-zA-Z0-9\s]+$/, // Alphanumeric and spaces
    accountNumber: /^\d{10,12}$/, // 10-12 digits
    amount: /^\d+(\.\d{1,2})?$/, // Numeric, with up to 2 decimal places
    swiftCode: /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/, // ISO 9362 format
  };

  const validateField = (field: string, value: string) => {
    const pattern = regexPatterns[field as keyof typeof regexPatterns];
    if (!pattern) return true; // If no pattern exists for the field, skip validation
    return pattern.test(value);
  };

  const [errors, setErrors] = useState({
    recipientName: '',
    recipientBank: '',
    accountNumber: '',
    amount: '',
    swiftCode: '',
  });
  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Validate the field and set error messages
    const isValid = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: isValid ? '' : `Invalid ${name.replace('recipient', '').toLowerCase()}`,
    }));
  
    setFormData(prevState => ({
      ...prevState,
      [name]: value, 
    }));
  };
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are valid
    let hasError = false;
    const newErrors: typeof errors = { recipientName: '', recipientBank: '', accountNumber: '', amount: '', swiftCode: '' };

    Object.keys(formData).forEach(field => {
      const value = formData[field as keyof typeof formData];
      if (!validateField(field, value)) {
        hasError = true;
        newErrors[field as keyof typeof newErrors] = `Invalid ${field.replace('recipient', '').toLowerCase()}`;
      }
    });
  
    setErrors(newErrors);
  
    if (hasError) {
      alert('Please fix validation errors before submitting.');
      return;
    }

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('https://localhost:3000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
        },
        body: JSON.stringify({
          recieverName: formData.recipientName,
          bank: formData.recipientBank,
          accNumber: formData.accountNumber,
          payAmount: formData.amount,
          swiftCode: formData.swiftCode,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Payment created successfully:', result);
        alert('Payment created successfully!');
        handleCancel(); 
      } else {
        const error = await response.json();
        console.error('Error creating payment:', error.message || 'Unknown error');
        alert(`Error: ${error.message || 'Failed to create payment'}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleCancel = () => {
    setFormData({
      recipientName: '',
      recipientBank: '',
      accountNumber: '',
      amount: '',
      swiftCode: '',
    });
  };

  return (
    <div className="payment-container">
      <h1 style={{margin: '0 auto'}}>Make a Payment</h1>
      <form className="form-container" onSubmit={handleSubmit}>
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
