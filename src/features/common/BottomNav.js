import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems } from '../cart/cartSlice';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const BottomNav = () => {
  const items = useSelector(selectItems);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <Transition.Root show={isSidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="bg-pink-50 px-4 py-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-semibold text-pink-600">
                            Menu
                          </Dialog.Title>
                          <button
                            type="button"
                            className="rounded-md text-gray-600 hover:text-pink-600"
                            onClick={() => setIsSidebarOpen(false)}
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 px-4 py-6">
                        {/* Sidebar Content */}
                        <nav className="space-y-4">
                          <Link 
                            to="/" 
                            className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-md"
                            onClick={() => setIsSidebarOpen(false)}
                          >
                            Home
                          </Link>
                          <Link 
                            to="/categories" 
                            className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-md"
                            onClick={() => setIsSidebarOpen(false)}
                          >
                            Categories
                          </Link>
                          {/* <Link 
                            to="/new-arrivals" 
                            className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-md"
                            onClick={() => setIsSidebarOpen(false)}
                          >
                            New Arrivals */}
                          {/* </Link> */}
                          {/* <Link 
                            to="/sale" 
                            className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-md"
                            onClick={() => setIsSidebarOpen(false)}
                          >
                            Sale
                          </Link> */}
                          
                          {/* Social Links */}
                          <div className="border-t border-gray-200 pt-4 mt-6">
                            <h3 className="text-sm font-semibold text-gray-600 mb-4 px-4">Connect With Us</h3>
                            <div className="flex items-center px-4 space-x-4">
                              <a 
                                href="https://www.instagram.com/swirlscoco" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-pink-600"
                              >
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                              </a>
                              <a 
                                href="https://wa.me/8168287781" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-pink-600"
                              >
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                                </svg>
                              </a>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 px-4 py-2 z-40">
        <div className="flex justify-around items-center">
          {/* Menu (Hamburger) */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex flex-col items-center text-gray-600 hover:text-pink-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-xs mt-1">Menu</span>
          </button>

          {/* Home */}
          <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>

          {/* Cart with Badge */}
          <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-pink-600">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 512 512" stroke="currentColor" fill="none" strokeWidth="32">
                <path d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zM160 176v-32a96 96 0 0196-96h0a96 96 0 0196 96v32" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M160 224v16a96 96 0 0096 96h0a96 96 0 0096-96v-16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-100 text-pink-700 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Cart</span>
          </Link>

          {/* Profile */}
          <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomNav; 