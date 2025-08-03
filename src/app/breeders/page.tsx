'use client';

import React from 'react';

const BreederDirectoryPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Breeder Directory</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Find Reputable Breeders</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to our Breeder Directory! Here you can find a list of reputable breeders specializing in various KUSA registered dog breeds across South Africa.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Each breeder listed here is committed to ethical breeding practices, health testing, and providing a loving environment for their puppies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Coming Soon!</h2>
          <p className="text-gray-600 leading-relaxed">
            We are currently compiling our comprehensive list of breeders. Please check back soon for updates!
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

export default BreederDirectoryPage;
