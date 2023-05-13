'use client'
import React from 'react';
import LoginButton from '../LoginButton';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black py-6 px-4 border-b border-magenta-500 md:px-10">
      <Link href='/' className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-magenta-500">teasr.xyz</span>
      </Link>
      <div>
         <LoginButton />
      </div>
    </nav>
  );
}

export default Navbar;
