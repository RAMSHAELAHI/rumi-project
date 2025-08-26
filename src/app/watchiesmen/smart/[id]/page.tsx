'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'sonner';
import {
  ChevronRight,
  ChevronLeftCircle,
  ChevronRightCircle,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const smartProducts = [
  {
    id: 1,
    name: 'Tech Smart Pro',
    price: 4499,
    images: ['/images/smartt.jpeg'],
    description:
      'Experience innovation on your wrist with Tech Smart Pro. Sleek, powerful, and built for the future.',
  },
];

const SmartProductDetail = () => {
  const { id } = useParams();
  const product = smartProducts.find((p) => p.id.toString() === id);
  const { addToCart } = useCart();
  const [imageIndex, setImageIndex] = useState(0);

  if (!product) {
    return <div className="text-center py-20 text-xl text-gray-600">Product not found</div>;
  }

  const handleNext = () => {
    setImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrev = () => {
    setImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/watchiesmen/smart" className="hover:underline">
            Smart
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span>{product.name}</span>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="relative">
            <Image
              src={product.images[imageIndex]}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-[400px] object-cover rounded-lg border"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ChevronLeftCircle size={28} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ChevronRightCircle size={28} />
                </button>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#0a4d8c] font-serif">{product.name}</h1>
            <div className="text-xl font-medium text-gray-900">
              PKR {product.price.toLocaleString()}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  addToCart({
                    _id: product.id.toString(),
                    title: product.name,
                    price: product.price,
                    imgUrl: product.images[0],
                    quantity: 1,
                  });
                  toast.success('Added to cart ✨');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#0a4d8c] text-white px-6 py-3 rounded-full hover:bg-blue-900 transition text-sm"
              >
                <ShoppingBag size={18} />
                Add to Cart
                <ArrowRight size={16} />
              </button>

              <Link
                href="https://wa.me/923000000000"
                className="inline-flex items-center justify-center gap-2 border border-green-600 text-green-700 px-6 py-3 rounded-full hover:bg-green-50 transition text-sm"
              >
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartProductDetail;
