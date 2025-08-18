'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { Tangerine } from 'next/font/google';

const tangerine = Tangerine({ weight: '700', subsets: ['latin'] });

const Header = () => {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();

  return (
    <header className="w-full bg-[#F0F2F3] py-3 sm:py-5">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <NextImage
            src="/images/abr.png"
            alt="AbR Logo"
            width={40}
            height={23}
            className="ml-1 sm:ml-3"
          />
          <h1
            className={`text-[26px] sm:text-[38px] text-[#a1445d] flex items-center ${tangerine.className}`}
            style={{
              letterSpacing: '-0.5px',
              textShadow: '0.4px 0.4px 0 currentColor',
              lineHeight: '1',
            }}
          >
            AbR <span className="ml-1 text-[18px] sm:text-[22px]">❤</span>
          </h1>
        </div>

        {/* Wishlist + Cart */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Wishlist */}
          <Link href="/wishlist">
            <button className="flex items-center space-x-2 bg-white py-1.5 sm:py-2 px-2 sm:px-4 rounded-md">
              <FaHeart className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Wishlist</span>
              <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-[#007580] text-white text-xs sm:text-sm rounded-full">
                {wishlist.length}
              </div>
            </button>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <button className="flex items-center space-x-2 bg-white py-1.5 sm:py-2 px-2 sm:px-4 rounded-md">
              <FaShoppingCart className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Cart</span>
              <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-[#007580] text-white text-xs sm:text-sm rounded-full">
                {cartItems.length}
              </div>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
