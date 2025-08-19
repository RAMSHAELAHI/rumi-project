'use client';

import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'sonner';

const WomenBagsPage = () => {
  const { addToCart } = useCart();

  const womenBags = [
    {
      id: 1,
      name: 'Elegant Tote Bag',
      price: 2200,
      tag: 'New',
      originalPrice: 3000,
      image: '/images/full moon.jpeg',
    },
    {
      id: 2,
      name: 'Fancy Clutch',
      price: 1599,
      tag: 'Sale',
      originalPrice: 2200,
      image: '/images/black bride.jpeg',
    },
    {
      id: 3,
      name: 'Hijab Tote',
      price: 1799,
      tag: 'New',
      originalPrice: 2800,
      image: '/images/hijab tote.jpeg',
    },
    {
      id: 4,
      name: 'LV Leather Bag',
      price: 2199,
      tag: 'Sale',
      originalPrice: 2700,
      image: '/images/lv blac 2.jpeg',
    },
    {
      id: 5,
      name: 'Canva Design Tote',
      price: 1799,
      tag: 'New',
      originalPrice: 2400,
      image: '/images/CANVA.jpeg',
    },
      {
      id: 6,
      name: 'Mini Hijab Tote',
      price: 1399,
      tag: 'New',
      originalPrice: 1800,
      image: '/images/mini hijab peach.jpeg', 
    },
    {
      id: 7,
      name: 'Fancy Gold Clutch',
      price: 1599,
      tag: 'Sale',
      originalPrice: 2000,
      image: '/images/ride gold.jpeg',
    },
    {
      id: 8,
      name: 'Luna Carry',
      price: 2999,
      tag: 'Sale',
      originalPrice: 3400,
      image: '/images/Luna carry brown solid.jpeg',
    },
    {
      id: 9,
      name: 'LV Leather Bag',
      price: 2199,
      tag: 'Sale',
      originalPrice: 2700,
      image: '/images/lv black off white.jpeg',
    },
       {
      id: 10,
      name: 'Party Wear Clutch',
      price: 1499,
      tag: 'Sale',
      originalPrice: 2700,
      image: '/images/fancy grey.jpeg',
    },
  ];

  const scrollToBagsSection = () => {
    const section = document.getElementById('women-bags-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Head>
        <title>Women's Bags | Be Attractive with Rumi</title>
        <meta
          name="description"
          content="Explore our collection of stylish and luxurious women’s bags designed to complement your fashion."
        />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-100 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Image
            src="/images/LUNA CARRY BLACK.jpeg"
            alt="Elegant Luna Carry Black Bag"
            width={600}
            height={500}
            priority
            className="rounded-2xl shadow-xl object-cover w-full"
          />
          <div className="text-center md:text-left">
            <h2 className="text-5xl font-bold text-[#B13368] mb-4 leading-tight">
              Graceful <br />
              <span className="text-[#E63946]">Women’s Bags</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Explore our collection of stylish and luxurious women’s bags designed to complement your fashion.
            </p>
            <button
              onClick={scrollToBagsSection}
              className="bg-[#B13368] text-white px-6 py-3 rounded-full font-medium flex items-center mx-auto md:mx-0 hover:bg-[#9b2c5b]"
            >
              Shop Women’s Bags <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section id="women-bags-section" className="py-16 bg-white">
        <h2 className="text-3xl font-semibold text-center text-[#B13368] mb-10">
          Women's Bags
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {womenBags.map((bag) => (
            <div
              key={bag.id}
              className="rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition"
            >
              <div className="relative cursor-pointer">
                <Link href={`/bagswomen/${bag.id}`}>
                  <Image
                    src={bag.image}
                    alt={`Image of ${bag.name}`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                </Link>

                {bag.tag && (
                  <span className="absolute top-3 left-3 bg-[#B13368] text-white text-xs px-3 py-1 rounded-full uppercase">
                    {bag.tag}
                  </span>
                )}
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                  {bag.name}
                </h3>

                {/* Price Section */}
                <div className="mt-1 space-x-2">
                  <span className="text-[#B13368] font-bold text-lg">
                    PKR {bag.price.toLocaleString()}
                  </span>
                  {bag.originalPrice && bag.originalPrice > bag.price && (
                    <span className="text-gray-400 line-through text-sm">
                      PKR {bag.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <button
                  className="mt-3 inline-flex items-center bg-[#B13368] text-white px-4 py-2 rounded-full hover:bg-[#9b2c5b]"
                  onClick={() => {
                    addToCart({
                      _id: bag.id.toString(),
                      title: bag.name,
                      price: bag.price,
                      imgUrl: bag.image,
                      quantity: 1,
                    });
                    toast.success('Added to cart');
                  }}
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

export default WomenBagsPage;
