'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'sonner';
import { ChevronRight, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

// Sample products
const womenWatches = [
  { id: 1, name: 'Rich Gold Fancy Watch', price: 1999, tag: 'Single Piece', images: ['/images/fancy 3.jpeg'], description: 'A timeless rich gold piece for graceful elegance.' },
  { id: 2, name: 'Women in Black Aura', price: 1999, tag: 'Luxury', images: ['/images/6 aura.jpeg', '/images/63.jpeg', '/images/6b.jpeg'], description: 'A limited-edition Black Arabic watch with a minimalist yet high-class presence.' },
  { id: 3, name: 'Classic Silver Dial', price: 1999, images: ['/images/wt.jpeg'], description: 'Classic silver Fancy dial watch for Party sophistication.' },
  { id: 4, name: 'Fancy Neavy Blue Watch', price: 1999, images: ['/images/fancy 2.jpeg'], description: 'Minimal and modern leather strap watch.' },
  { id: 5, name: 'Fancy Rose Copper', price: 1599, images: ['/images/w5.jpeg'], description: 'Minimal and modern chain watch.' },
  { id: 6, name: 'Classic Women', price: 1499, images: ['/images/w6.jpeg'], description: 'Minimal and modern chain watch.' },
];

const WatchiesWomenDetail = () => {
  const { id } = useParams(); // id from URL
  const router = useRouter();
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);

  // Convert id to number for matching
  const watch = womenWatches.find(w => w.id === Number(id));

  if (!watch) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Product not found
      </div>
    );
  }

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % watch.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + watch.images.length) % watch.images.length);

  // Navigation to previous/next product
  const currentIndex = womenWatches.findIndex(w => w.id === watch.id);
  const prevProduct = womenWatches[currentIndex - 1];
  const nextProduct = womenWatches[currentIndex + 1];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/watchieswomen" className="hover:underline">Watches</Link>
          <ChevronRight size={16} className="mx-2" />
          <span>{watch.name}</span>
        </div>

        {/* Product Navigation */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => prevProduct && router.push(`/watchieswomen/${prevProduct.id}`)}
            disabled={!prevProduct}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border ${!prevProduct ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            <ArrowLeft size={18} /> Prev Product
          </button>

          <button
            onClick={() => nextProduct && router.push(`/watchieswomen/${nextProduct.id}`)}
            disabled={!nextProduct}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border ${!nextProduct ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            Next Product <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div className="relative w-full h-[400px] md:h-[500px] border rounded-lg overflow-hidden">
            <Image
              src={watch.images[currentImage]}
              alt={watch.name}
              fill
              className="object-cover"
            />
            {watch.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-1"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-1"
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 font-serif">{watch.name}</h1>
            <div className="text-xl font-medium text-[#b13368]">
              PKR {watch.price.toLocaleString()}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{watch.description}</p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  addToCart({
                    _id: watch.id.toString(),
                    title: watch.name,
                    price: watch.price,
                    imgUrl: watch.images[0],
                    quantity: 1,
                  });
                  toast.success('Added to cart 🛍️');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#b13368] text-white px-6 py-3 rounded-full hover:bg-[#9b2c5b] transition text-sm"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <Link
                href={`https://wa.me/?text=${encodeURIComponent("I'm interested in " + watch.name)}`}
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

export default WatchiesWomenDetail;
