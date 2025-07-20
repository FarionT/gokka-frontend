import React, { useState, useEffect, useRef } from 'react';
import './Navbar.scss';

// Import Images
import Gokka from '../../assets/Logo/Gokka.svg';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        userMenuButtonRef.current &&
        !userMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuRef, userMenuButtonRef]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuRef, mobileMenuButtonRef]);


  return (
    <>
      <nav className="navbar bg-gray-800 font-inter px-8"> {/* Added font-inter class */}
        <div className="mx-auto max-w-[1600px] sm:px-6 lg:px-8">
          <div className="relative flex h-16 md:h-[80px] items-center justify-between">
            {/* Logo section - always on the left */}
            <a className="flex shrink-0 items-center" href='/'>
              <img className="h-8 w-auto" src={Gokka} alt="Your Company" />
            </a>

            {/* Desktop navigation links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 text-center">
                <a href="/" className="rounded-md px-3 py-2 text-sm font-medium" aria-current="page">
                  Beranda
                </a>
                <a href="/produk" className="rounded-md px-3 py-2 text-sm font-medium hover:text-white">
                  Produk
                </a>
                <a href="/tentang-kami" className="rounded-md px-3 py-2 text-sm font-medium hover:text-white">
                  Tentang Kami
                </a>
                <a href="/testimoni" className="rounded-md px-3 py-2 text-sm font-medium hover:text-white">
                  Testimoni
                </a>
                <a href="/resep" className="rounded-md px-3 py-2 text-sm font-medium hover:text-white">
                  Resep
                </a>
                <a href="/faq" className="rounded-md px-3 py-2 text-sm font-medium hover:text-white">
                  FAQ
                </a>
                <a href="#" className="rounded-md px-3 py-2 text-sm font-medium hover:text-white">
                  Akun
                </a>
              </div>
            </div>

            {/* Mobile menu button (Hamburger) - moved to the right on mobile */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:hidden">
              <button
                type="button"
                ref={mobileMenuButtonRef}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed. */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} size-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {/* Icon when menu is open. */}
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} size-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Desktop notification and user menu - hidden on mobile */}
            <div className="hidden sm:static sm:inset-auto sm:ml-6 sm:pr-0 sm:flex sm:items-center">
              <button
                type="button"
                className="relative rounded-full p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-3" ref={userMenuRef}>
                <div>
                  <button
                    type="button"
                    ref={userMenuButtonRef}
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="size-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcGwaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                {/* Dropdown menu, show/hide based on menu state. */}
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">
                      Your Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">
                      Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu sidebar */}
        <div
          className={`navbar fixed inset-y-0 right-0 z-20 w-64 bg-gray-800 transform transition-transform ease-in-out duration-300 sm:hidden
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          id="mobile-menu"
          ref={mobileMenuRef}
        >
          <div className="flex justify-end p-4">
            {/* Close button for sidebar */}
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-1 px-2 pt-2 pb-3">
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-white" aria-current="page">
              Beranda
            </a>
            <a href="/produk" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Produk
            </a>
            <a href="/tentang-kami" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Tentang Kami
            </a>
            <a href="/testimoni" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Testimoni
            </a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Resep
            </a>
            <a href="/faq" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              FAQ
            </a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Akun
            </a>
          </div>
        </div>

        {/* Overlay for darkening content when sidebar is open */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10 transition-opacity duration-300 sm:hidden" // Changed opacity to 25%
            onClick={() => setIsMobileMenuOpen(false)} // Close sidebar on overlay click
          ></div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
