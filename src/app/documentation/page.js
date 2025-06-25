'use client';

export default function Documentation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center">API Documentation</h1>
        <p className="mb-6 text-gray-700 text-center">
          This API allows you to validate API keys. Send a POST request to the endpoint below with your API key in the JSON body.
        </p>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Validate API Key</h2>
          <div className="bg-gray-100 rounded p-4 text-sm font-mono mb-2">
            POST /api/validate-key
          </div>
          <p className="mb-2">Request body (JSON):</p>
          <pre className="bg-gray-100 rounded p-4 text-sm mb-2">{`{
  "apiKey": "your_api_key_here"
}`}</pre>
          <p className="mb-2">Example <b>curl</b> request:</p>
          <pre className="bg-gray-100 rounded p-4 text-sm mb-2">{`curl -X POST http://localhost:3000/api/validate-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your_api_key_here"}'`}</pre>
          <p className="mb-2">Example <b>fetch</b> (JavaScript):</p>
          <pre className="bg-gray-100 rounded p-4 text-sm mb-2">{`fetch('/api/validate-key', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ apiKey: 'your_api_key_here' })
})
  .then(res => res.json())
  .then(data => console.log(data));`}</pre>
        </div>
        <div className="mt-8 text-gray-600 text-sm text-center">
          <b>Response:</b> <br />
          <pre className="bg-gray-100 rounded p-4 text-sm inline-block mt-2">{`{
  "valid": true,
  "message": "Valid API Key"
}`}</pre>
          <div className="mt-2">or</div>
          <pre className="bg-gray-100 rounded p-4 text-sm inline-block mt-2">{`{
  "valid": false,
  "message": "Not valid API Key"
}`}</pre>
        </div>
      </div>
    </div>
  );
} 