import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 text-center">
      <div className="max-w-2xl p-8">
      
        <h1 className="text-5xl font-bold text-white mb-4">
          Something new is coming.
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          The easiest way to manage and automate your Minecraft accounts, 24/7. Get ready to take control of your alts.
        </p>
      </div>
    </main>
  );
}