'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-500">
          Pets Place
        </Link>
        <div className="flex space-x-4">
          
          <Link href="/sell-a-pet" className="text-gray-800 hover:text-blue-500">
            Sell a Pet
          </Link>
          <Link href="/breeders" className="text-gray-800 hover:text-blue-500">
            Breeder Directory
          </Link>
          <Link href="/about" className="text-gray-800 hover:text-blue-500">
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
