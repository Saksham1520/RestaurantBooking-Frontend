import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Restaurant Booking
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/"
              className="hover:bg-blue-600 px-3 py-2 rounded transition"
            >
              Home
            </Link>
          </li>

          <li>
            <a
              href="https://github.com/"
              target="_blank"
              className="hover:bg-blue-600 px-3 py-2 rounded transition"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
