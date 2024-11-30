// frontend/src/components/ApiPortal/ApiRegistration.js
import React, { useState } from 'react';
import axios from 'axios';

const ApiRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: ''
  });
  const [apiKey, setApiKey] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/keys/register', formData);
      setApiKey(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Register for API Access</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Organization Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({...formData, website: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>

      {apiKey && (
        <div className="mt-6 p-4 bg-green-50 rounded">
          <h3 className="font-bold text-green-800">Registration Successful!</h3>
          <p className="mt-2">Your API Key: {apiKey.apiKey}</p>
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h4 className="font-bold">Integration Instructions:</h4>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
              {`// Example API usage
fetch('${window.location.origin}/api/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': '${apiKey.apiKey}'
  },
  body: JSON.stringify({
    citizenshipId: 'CITIZEN-ID'
  })
})`}
            </pre>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default ApiRegistration;

