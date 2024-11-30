// frontend/src/components/ApiPortal/ApiDocs.js
import React from 'react';

const ApiDocs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">API Documentation</h2>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-bold mb-4">Authentication</h3>
          <p>Include your API key in all requests using the X-API-Key header.</p>
          <pre className="mt-2 p-4 bg-gray-100 rounded">
            X-API-Key: your-api-key
          </pre>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4">Endpoints</h3>
          
          <div className="space-y-4">
            <div className="p-4 border rounded">
              <h4 className="font-bold">Verify Citizenship</h4>
              <p className="text-gray-600">POST /api/verify</p>
              <pre className="mt-2 p-4 bg-gray-100 rounded overflow-x-auto">
{`// Request body
{
  "citizenshipId": "CITIZEN-ID"
}

// Response
{
  "success": true,
  "data": {
    "name": "John Doe",
    "citizenshipId": "CITIZEN-ID",
    "verifiedAt": "2024-10-28T..."
  }
}`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApiDocs;