"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="py-6 relative z-20 backdrop-blur-md bg-white/30 border-b border-white/40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-600 bg-clip-text text-transparent">
            Athena
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden bg-gradient-to-r from-pink-200 to-purple-200 p-2 rounded-full z-50 hover:shadow-md transition-shadow duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} className="text-purple-700" /> : <Menu size={24} className="text-purple-700" />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden lg:flex gap-6 items-center">
            <Link
              href="/how-it-works"
              className="text-purple-800 hover:text-pink-600 transition-colors duration-300"
            >
              How it Works
            </Link>
            <Link
              href="/campaign"
              className="text-purple-800 hover:text-pink-600 transition-colors duration-300"
            >
              Campaigns
            </Link>
            <Link
              href="/create-campaign"
              className="text-purple-800 hover:text-pink-600 transition-colors duration-300"
            >
              Start Fundraising
            </Link>
            <div className="backdrop-blur-md bg-white/30 p-1 rounded-full border border-white/40 shadow-md">
              <ConnectButton />
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-3/4 h-screen backdrop-blur-md bg-white/80 shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
            isMenuOpen
              ? "transform translate-x-0"
              : "transform -translate-x-full"
          }`}
        >
          {/* Mobile Logo */}
          <div className="p-6 border-b border-white/40">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-900 to-pink-600 bg-clip-text text-transparent"
            >
              Athena
            </Link>
          </div>

          <div className="flex flex-col gap-4 p-6">
            <Link
              href="/how-it-works"
              className="text-purple-800 hover:bg-gradient-to-r hover:from-pink-100/50 hover:to-purple-100/50 rounded-xl py-3 px-4 transition-all duration-300"
              onClick={toggleMenu}
            >
              How it Works
            </Link>
            <Link
              href="/campaign"
              className="text-purple-800 hover:bg-gradient-to-r hover:from-pink-100/50 hover:to-purple-100/50 rounded-xl py-3 px-4 transition-all duration-300"
              onClick={toggleMenu}
            >
              Campaigns
            </Link>
            <Link
              href="/create-campaign"
              className="text-purple-800 hover:bg-gradient-to-r hover:from-pink-100/50 hover:to-purple-100/50 rounded-xl py-3 px-4 transition-all duration-300"
              onClick={toggleMenu}
            >
              Start Fundraising
            </Link>
            <div className="py-4 px-4">
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
              />
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30"
            onClick={toggleMenu}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;