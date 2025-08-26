'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'sonner';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const coupleProducts = [
  {
    id: 1,
    name: 'Classic Silver Dial',
    price: 3499,
    images: ['/images/wt.jpeg'],
    tag: 'Fancy',
  },
  {
    id: 2,
    name: 'Fancy Neavy Blue Watch',
    price: 3499,
    images: ['/images/fancy 2.jpeg'],
    tag: 'Fancy',
  },
  {
    id: 3,
    name: 'Rich Gold Elegant Watch',
    price: 3499,
    images: ['/images/fancy 3.jpeg'],
    tag: 'Fancy',
  },
  {
    id: 4,
    name: 'CK Gold Black Couple',
    price: 2499,
    images: [ '/images/CK Gold Black Couple.jpeg'],
     tag: 'Classy',
    description:
      'Couple Watch , A limited-edition platinum watch with a minimalist yet high-class presence.',
  },
  {
    id: 5,
    name: 'CK Black Gold Couple',
    price: 2499,
    images: ['/images/CK Black Gold Couple.jpeg'],
      tag: 'Classy',
    description:
      'Couple Watch, Featuring emerald stones and a slim band — grace meets green brilliance.',
  },
  {
    id: 6,
    name: 'CK Black Grey Couple',
    price: 2499,
    images: ['/images/CK Black Grey Couple.jpeg'],
      tag: 'Classy',
    description:
      'Couple Watch ,Combining pearls with modern design, this bestseller brings timeless royalty to life.',
  },
];

const CoupleWatchesPage = () => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Couple Watches
          </h1>
          <p className="text-lg text-gray-600">
            Perfectly paired designs for you and your loved one. Timeless
            elegance for two.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition"
            >
              <Link href={`/watchiesmen/couple/${product.id}`}>
                <div className="relative cursor-pointer">
                  <Image
                    src={product.images[0]} // ✅ first image
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs px-3 py-1 rounded-full uppercase">
                      {product.tag}
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-pink-600 font-bold text-lg mt-1">
                  ₨ {product.price.toLocaleString('ur-PK')}
                </p>
                <button
                  onClick={() => {
                    addToCart({
                      _id: product.id.toString(),
                      title: product.name,
                      price: product.price,
                      imgUrl: product.images[0], // ✅ first image for cart
                      quantity: 1,
                    });
                    toast.success('Added to cart ❤️');
                  }}
                  className="mt-3 bg-pink-600 inline-flex items-center text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
                >
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoupleWatchesPage;
