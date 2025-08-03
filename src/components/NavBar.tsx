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
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-500 flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="size-6 mr-2">
            <path d="M12 2C9.8 2 8 3.8 8 6C8 8.2 9.8 10 12 10C14.2 10 16 8.2 16 6C16 3.8 14.2 2 12 2Z"/>
            <path d="M17 10C15.9 10 15 10.9 15 12C15 13.1 15.9 14 17 14C18.1 14 19 13.1 19 12C19 10.9 18.1 10 17 10Z"/>
            <path d="M7 10C5.9 10 5 10.9 5 12C5 13.1 5.9 14 7 14C8.1 14 9 13.1 9 12C9 10.9 8.1 10 7 10Z"/>
            <path d="M12 10.5C9.5 10.5 7.5 12.5 7.5 15C7.5 17.5 9.5 19.5 12 19.5C14.5 19.5 16.5 17.5 16.5 15C16.5 12.5 14.5 10.5 12 10.5Z"/>
          </svg>
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
