'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-500">
          Pets Place
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`md:flex items-center ${
            isOpen ? 'block absolute top-full right-0 bg-white shadow-lg py-2 px-4 w-48' : 'hidden'
          }`}
        >
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link href="/sell-a-pet" className="text-gray-800 hover:text-blue-500" onClick={() => setIsOpen(false)}>
              Sell a Pet
            </Link>
            <Link href="/breeders" className="text-gray-800 hover:text-blue-500" onClick={() => setIsOpen(false)}>
              Breeder Directory
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-blue-500" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
