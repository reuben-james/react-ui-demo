import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputString, setInputString] = useState('');
  const [encryptedString, setEncryptedString] = useState('');
  const [result, setResult] = useState('');
  const [operation, setOperation] = useState('encrypt');

  const handleEncrypt = async () => {
    try {
      const response = await axios.post('http://localhost:5000/encrypt', { inputString });
      setResult(response.data.encryptedText);
    } catch (error) {
      console.error('Error encrypting string:', error);
      alert('Error encrypting string. Please try again.');
    }
  };

  const handleDecrypt = async () => {
    try {
      const response = await axios.post('http://localhost:5000/decrypt', { encryptedString });
      setResult(response.data.decryptedText);
    } catch (error) {
      console.error('Error decrypting string:', error);
      alert('Error decrypting string. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (operation === 'encrypt') {
      handleEncrypt();
    } else {
      handleDecrypt();
    }
  };

  const handleOperationChange = (newOperation) => {
    setOperation(newOperation);
    setResult(''); // Clear the result when changing the operation
    setInputString(''); // Clear inputString when changing the operation
    setEncryptedString(''); // Clear encryptedString when changing the operation
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>String Encrypt/Decrypt Application</h1>
      <form onSubmit={handleSubmit}>
        {operation === 'encrypt' ? (
          <>
            <input
              type="text"
              placeholder="Enter a string to encrypt"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              required
              style={{ padding: '10px', width: '300px', marginRight: '10px' }}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter an encrypted string to decrypt"
              value={encryptedString}
              onChange={(e) => setEncryptedString(e.target.value)}
              required
              style={{ padding: '10px', width: '300px', marginRight: '10px' }}
            />
          </>
        )}
        <div style={{ marginTop: '20px' }}>
          <label>
            <input
              type="radio"
              value="encrypt"
              checked={operation === 'encrypt'}
              onChange={() => handleOperationChange('encrypt')}
            />
            Encrypt
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              value="decrypt"
              checked={operation === 'decrypt'}
              onChange={() => handleOperationChange('decrypt')}
            />
            Decrypt
          </label>
        </div>
        <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>
          {operation === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Result:</h3>
          <p style={{ wordWrap: 'break-word', maxWidth: '80%', margin: '0 auto' }}>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
