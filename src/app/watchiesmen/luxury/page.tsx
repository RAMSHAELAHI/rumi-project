'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'sonner';

const luxuryWatches = [
  {
    id: 1,
    name: "Rich Gold",
    price: 2999,
    image: "/images/5 bracelet.jpeg",
    tag: "Free Bracelet",
  },
  {
    id: 2,
    name: 'Royal Black Dial',
    price: 1599,
    image: '/images/w4.jpeg',
    tag: 'Exclusive',
  },
  {
    id: 3,
    name: 'Man in Black Aura',
    price: 2499,
    image: '/images/6 aura.jpeg',
    tag: 'Limited',
  },
  {
    id: 4,
    name: 'Platinum Elegance',
    price: 3299,
    image: '/images/w3.jpeg',
    tag: 'Best Seller',
  },
  {
    id: 5,
    name: 'Elegant Brown',
    price: 3299,
    image: '/images/4 bracelet.jpeg',
    tag: 'Free Bracelet',
  },
  {
    id: 6,
    name: 'Platinum Black',
    price: 2499,
    image: '/images/w1.jpeg',
    tag: 'Free Chain',
  },
    {
    id: 1,
    name: "Rich Gold",
    price: 2999,
    image: "/images/5 bracelet.jpeg",
    tag: "Free Bracelet",
  },
  {
    id: 2,
    name: 'Royal Black Dial',
    price: 1599,
    image: '/images/w4.jpeg',
    tag: 'Exclusive',
  },
  {
    id: 3,
    name: 'Man in Black Aura',
    price: 2499,
    image: '/images/6 aura.jpeg',
    tag: 'Limited',
  },
  {
    id: 4,
    name: 'Platinum Elegance',
    price: 3299,
    image: '/images/w3.jpeg',
    tag: 'Best Seller',
  },
  {
    id: 5,
    name: 'Elegant Brown',
    price: 3299,
    image: '/images/4 bracelet.jpeg',
    tag: 'Free Bracelet',
  },
  {
    id: 6,
    name: 'Platinum Black',
    price: 2499,
    image: '/images/w1.jpeg',
    tag: 'Free Chain',
  },
];

const LuxuryCollectionPage = () => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-yellow-800 mb-4">
            Luxury Watch Collection
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover timeless elegance and craftsmanship in our premium luxury watches.
          </p>
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          {luxuryWatches.map((watch) => (
            <div
              key={watch.id}
              className="relative bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <Link href={`/watchiesmen/luxury/${watch.id}`}>
                <Image
                  src={watch.image}
                  alt={watch.name}
                  width={500}
                  height={400}
                  className="w-full h-64 object-cover cursor-pointer"
                  priority
                />
              </Link>

              {/* Tag */}
              {watch.tag && (
                <span className="absolute top-3 left-3 bg-yellow-700 text-white text-xs px-3 py-1 rounded-full uppercase">
                  {watch.tag}
                </span>
              )}

              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{watch.name}</h3>
                <p className="text-yellow-700 font-bold mt-1">PKR {watch.price.toLocaleString()}</p>

                <button
                  onClick={() => {
                    addToCart({
                      _id: watch.id.toString(),
                      title: watch.name,
                      price: watch.price,
                      imgUrl: watch.image,
                      quantity: 1,
                    });
                    toast.success(`${watch.name} added to cart! 🛒`);
                  }}
                  className="mt-3 inline-flex items-center bg-yellow-700 text-white px-4 py-2 rounded-full hover:bg-yellow-900 transition"
                >
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LuxuryCollectionPage;
