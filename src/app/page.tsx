'use client';

import { useState, type FormEvent } from 'react';

// Define the possible message types
type MessageType = 'success' | 'info' | 'error' | null;

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // The state now uses our new MessageType
  const [messageType, setMessageType] = useState<MessageType>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }
      
      // Set the message and type based on the API response
      setMessage(data.message);
      setMessageType(data.status || 'success'); // 'success', 'info', or 'error'
      
      // Only clear the email on a brand new subscription
      if (data.status === 'success') {
        setEmail('');
      }

    } catch (error: unknown) { // FIX: Changed 'any' to 'unknown'
      // Now we check if it's an Error object before accessing .message
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Define the styles for each message type
  const messageBoxStyles: Record<string, string> = {
    success: 'bg-green-500 text-white',
    info: 'bg-blue-100 text-blue-800', // The new light blue style
    error: 'bg-red-100 text-red-800',
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 text-center">
      <div className="max-w-2xl p-8">
        <h1 className="text-5xl font-bold text-white mb-4">
          Something new is coming.
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          The easiest way to manage and automate your Minecraft accounts, 24/7. Get ready to take control of your alts.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Our full site will launch soon. Sign up to get notified!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-grow"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-md font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Subscribing...' : 'Notify Me'}
          </button>
        </form>

        {/* The message box now dynamically applies one of the three styles */}
        {message && (
          <div className={`mt-4 px-4 py-3 rounded-md text-sm ${messageType ? messageBoxStyles[messageType] : ''}`}>
            {message}
          </div>
        )}
      </div>
    </main>
  );
}