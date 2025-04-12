import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems } from '../cart/cartSlice';
import { selectUserInfo } from '../user/userSlice';

const navigation = [
  { name: 'Products', link: '/', user: true },
  { name: 'Products', link: '/admin', admin: true },
  { name: 'Orders', link: '/admin/orders', admin: true },
];

const userNavigation = [
  { name: 'My Profile', link: '/profile' },
  { name: 'My Orders', link: '/my-orders' },
  { name: 'Sign out', link: '/logout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const BagIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    viewBox="0 0 512 512"
    stroke="currentColor"
    fill="none"
    strokeWidth="32"
  >
    <title>Bag Handle</title>
    <path 
      d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zM160 176v-32a96 96 0 0196-96h0a96 96 0 0196 96v32" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M160 224v16a96 96 0 0096 96h0a96 96 0 0096-96v-16" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
  </svg>
);

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);

  return (
    <>
      {userInfo && <div className="min-h-full">
        <Disclosure as="nav" className="bg-pink-50 shadow-sm fixed top-0 w-full z-50">
          {({ open }) => (
            <>
              {/* Main Navbar Content */}
              <div className="px-4">
                <div className="flex h-14 items-center justify-between">
                  {/* Logo and Brand */}
                  <div className="flex items-center">
                    <Link to="/" className="flex items-center space-x-2">
                      <img
                        className="h-8 w-8"
                        src="/ecommerce.png"
                        alt="Coco Swirls"
                      />
                      <span className="text-lg font-semibold text-pink-600">
                        Swirls Coco
                      </span>
                    </Link>
                    {/* Add social links here */}
                    <div className="hidden sm:flex items-center ml-4 pl-4 border-l border-pink-200">
                      <a 
                        href="https://www.instagram.com/swirlscoco" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-pink-600 transition-colors mr-3"
                      >
                        <InstagramIcon className="h-4 w-4" />
                      </a>
                      <a 
                        href="https://wa.me/8168287781" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-pink-600 transition-colors"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* Cart and Menu Icons */}
                  <div className="flex items-center space-x-3">
                    {/* Cart Icon */}
                    <Link to="/cart" className="relative">
                      <button
                        type="button"
                        className="rounded-full p-1.5 text-gray-600 hover:text-pink-600 transition-colors"
                      >
                        <BagIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                      {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-pink-100 w-4 h-4 text-xs font-medium text-pink-700">
                          {items.length}
                        </span>
                      )}
                    </Link>

                    {/* Menu Button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-600 hover:bg-pink-100 hover:text-pink-600 focus:outline-none">
                      {open ? (
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Panel */}
              <Disclosure.Panel>
                <div className="px-4 pt-2 pb-3 space-y-1 bg-white">
                  {/* User Info Section */}
                  <div className="flex items-center space-x-3 p-4 border-b border-pink-100">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={userInfo.imageUrl}
                      alt=""
                    />
                    <div className="flex-1">
                      <div className="text-base font-medium text-gray-800">
                        {userInfo.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {userInfo.email}
                      </div>
                    </div>
                    {/* Social Media Icons */}
                    <div className="flex items-center space-x-3">
                      <a 
                        href="https://www.instagram.com/swirlscoco" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-600 transition-colors"
                      >
                        <InstagramIcon className="h-5 w-5" />
                      </a>
                      <a 
                        href="https://wa.me/8168287781" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-600 transition-colors"
                      >
                        <WhatsAppIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  {navigation.map((item) => (
                    item[userInfo.role] && (
                      <Link
                        key={item.name}
                        to={item.link}
                        className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors rounded-md"
                      >
                        {item.name}
                      </Link>
                    )
                  ))}

                  {/* User Navigation Links */}
                  <div className="border-t border-pink-100 pt-4 mt-4">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.link}
                        className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors rounded-md"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Main Content */}
        <main>
          <div className="px-4 pt-16">
            {children}
          </div>
        </main>
      </div>}
    </>
  );
}

export default NavBar;