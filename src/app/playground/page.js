'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      router.push(`/protected?key=${encodeURIComponent(apiKey)}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center mb-6 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 text-gray-700 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">API Playground</h1>
          <label className="block mb-2 text-gray-700 font-medium">API Key</label>
          <input
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your API key"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
} 