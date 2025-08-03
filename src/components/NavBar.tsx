'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-200">
          Pets Place
        </Link>
        <div className="flex space-x-4">
          
          <Link href="/sell-a-pet" className="text-white hover:text-blue-200">
            Sell a Pet
          </Link>
          <Link href="/breeders" className="text-white hover:text-blue-200">
            Breeder Directory
          </Link>
          <Link href="/about" className="text-white hover:text-blue-200">
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
