"use client"; // Mark as a Client Component

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SideNav() {
  const pathname = usePathname();
  const { data: session } = useSession(); // Get the user session

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(e.currentTarget.value);
      // Add your search logic here
      // Search by user, hashtags, video metadata
    }
  };

  return (
    <div className="fixed left-0 h-full w-[348px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 pt-4">
      <div className="flex flex-col px-4">
        <Link href="/" className="mb-6">
          <Image
            width={115}
            height={115}
            className="min-w-[115px] w-[115px]"
            src="/images/tiktok-logo-only.png"
            alt="TikTok Logo"
          />
        </Link>

        <div className="flex flex-col gap-4 mb-6">
          <input
            onKeyDown={handleSearch}
            type="text"
            placeholder="Search"
            className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE2C55]"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-white ${
              pathname === "/" ? "font-bold" : ""
            }`}
          >
            <span>For You</span>
          </Link>

          <Link
            href="/upload"
            className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-white ${
              pathname === "/upload" ? "font-bold" : ""
            }`}
          >
            <span>Upload</span>
          </Link>

          {/* Conditionally render Profile or Login button */}
          {session ? (
            <Link
              href="/profile"
              className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-white ${
                pathname === "/profile" ? "font-bold" : ""
              }`}
            >
              <span>Profile</span>
            </Link>
          ) : (
            <button
              onClick={() => signIn()} // Redirect to login page
              className={`flex items-center gap-2 px-4 py-2 bg-[#FE2C55] hover:bg-[#FE2C55]/80 text-white rounded-lg ${
                pathname === "/login" ? "font-bold" : ""
              }`}
            >
              <span>Login</span>
            </button>
          )}

          {/* Logout button (only shown when logged in) */}
          {session && (
            <button
              onClick={() => signOut()} // Sign out the user
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-600/80 text-white rounded-lg"
            >
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}