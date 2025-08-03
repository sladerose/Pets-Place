'use client';

import React from 'react';

const SellAPetPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Sell a Pet</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">List Your Pet for Sale</h2>
          <p className="text-gray-600 leading-relaxed">
            Do you have a KUSA registered dog or puppy looking for a new loving home? You can list it for sale on Pets Place!
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Our platform connects you with thousands of potential buyers across South Africa, ensuring your pet finds the best possible match.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">How It Works (Coming Soon!)</h2>
          <p className="text-gray-600 leading-relaxed">
            We are currently developing a seamless process for you to list your pets. This will include:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed mt-4">
            <li>Easy-to-use form for pet details and photos.</li>
            <li>Secure communication channels with interested buyers.</li>
            <li>Tips for responsible rehoming.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            Please check back soon for updates on how to list your pet!
          </p>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 Pets Place. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SellAPetPage;
