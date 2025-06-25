export const dynamic = 'force-dynamic';

'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;
  const bg = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  const icon = type === 'success' ? (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ) : (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
  );
  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg flex items-center text-white ${bg} min-w-[280px] max-w-[90vw]`}>
      {icon}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="ml-4 focus:outline-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
}

export default function Protected() {
  const searchParams = useSearchParams();
  const apiKey = searchParams.get('key');
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function validateKey() {
      if (!apiKey) return;
      const { data } = await supabase
        .from('api_keys')
        .select('id')
        .eq('key', apiKey)
        .single();
      if (data) {
        setToast({ message: 'Valid API Key', type: 'success' });
      } else {
        setToast({ message: 'Not valid API Key', type: 'error' });
      }
      setChecked(true);
    }
    validateKey();
  }, [apiKey]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, message: '' })} />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
        {checked ? (
          <>
            <div className="text-lg font-semibold text-gray-700 mb-4">{toast.type === 'success' ? 'Welcome! Your API key is valid.' : 'Access denied. Invalid API key.'}</div>
            <Link href="/playground" className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition-colors">Try another API key</Link>
          </>
        ) : (
          <div className="text-gray-500">Checking API key...</div>
        )}
      </div>
    </div>
  );
} 