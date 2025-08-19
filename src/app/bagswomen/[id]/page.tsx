'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'sonner';
import { ChevronRight, ChevronLeftCircle, ChevronRightCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const bagProducts = [
  { id: 1, name: 'Elegant Tote Bag', price: 2200, tag: 'New', originalPrice: 3000, images: ['/images/full moon.jpeg'] },
  { id: 2, name: 'Fancy Clutch', price: 1599, tag: 'Sale', originalPrice: 2200, images: ['/images/black bride.jpeg'] },
  { id: 3, name: 'Hijab Tote', price: 1799, tag: 'New', originalPrice: 2800, images: ['/images/hijab tote.jpeg'] },
  { id: 4, name: 'LV Leather Bag', price: 2199, tag: 'Sale', originalPrice: 2700, images: ['/images/lv blac 2.jpeg'] },
  { id: 5, name: 'Canva Design Tote', price: 1799, tag: 'New', originalPrice: 2400, images: ['/images/CANVA.jpeg'] },
  { id: 6, name: 'Mini Hijab Tote', price: 1399, tag: 'New', originalPrice: 1800, images: [
      '/images/mini hijab peach.jpeg',
      '/images/mini hijab neavy blue.jpeg',
      '/images/mini hijab cream.jpeg',
      '/images/mini hijab grey.jpeg',
      '/images/mini hijab black.jpeg',
      '/images/mini hijab orange.jpeg'
    ]
  },
  { id: 7, name: 'Fancy Gold Clutch', price: 1599, tag: 'Sale', originalPrice: 2000, images: ['/images/ride gold.jpeg'] },
  { id: 8, name: 'Luna Carry', price: 2999, tag: 'Sale', originalPrice: 3400, images: ['/images/Luna carry brown solid.jpeg'] },
  { id: 9, name: 'LV Leather Bag', price: 2199, tag: 'Sale', originalPrice: 2700, images: ['/images/lv black off white.jpeg'] },
  { id: 10, name: 'Party Wear Clutch', price: 1499, tag: 'Sale', originalPrice: 2700, images: ['/images/fancy grey.jpeg'] },
];

const BagDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [imageIndex, setImageIndex] = useState(0);

  if (!id) return <div className="text-center py-20 text-xl text-gray-500">Loading...</div>;

  const product = bagProducts.find(p => p.id.toString() === id);
  if (!product) return <div className="text-center py-20 text-xl text-gray-600">Product not found</div>;

  const images = product.images;
  const handleNext = () => setImageIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/bagswomen" className="hover:underline">Women’s Bags</Link>
          <ChevronRight size={16} className="mx-2" />
          <span>{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="relative">
            <Image
              src={images[imageIndex]}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-[400px] object-cover rounded-lg border"
            />
            {images.length > 1 && (
              <>
                <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <ChevronLeftCircle size={28} />
                </button>
                <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <ChevronRightCircle size={28} />
                </button>
              </>
            )}
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#B13368] font-serif">{product.name}</h1>
            <div className="text-xl font-semibold text-gray-800">PKR {product.price.toLocaleString()}</div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  addToCart({ _id: product.id.toString(), title: product.name, price: product.price, imgUrl: images[0], quantity: 1 });
                  toast.success('Added to cart 👜');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#B13368] text-white px-6 py-3 rounded-full hover:bg-[#9b2c5b] transition text-sm"
              >
                <ShoppingBag size={18} />
                Add to Cart
                <ArrowRight size={16} />
              </button>

              <Link href="https://wa.me/923000000000" className="inline-flex items-center justify-center gap-2 border border-green-600 text-green-700 px-6 py-3 rounded-full hover:bg-green-50 transition text-sm">
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagDetailPage;
