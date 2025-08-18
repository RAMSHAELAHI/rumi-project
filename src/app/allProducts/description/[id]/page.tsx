'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'sonner';
import {
  ChevronRight,
  ChevronLeftCircle,
  ChevronRightCircle,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const products = [
 { id: 1, name: "Zarar Gold", price: 2499, originalPrice: Math.round(2499 * 1.2), tag: "Sale", images: ["/images/zaara..jpeg"], category: "Scents" },
{ id: 2, name: "Janan", price: 1900, originalPrice: Math.round(1900 * 1.2), tag: "Sale", images: ["/images/golsz..jpeg"], category: "Scents" },
{ id: 3, name: "Exclusive", price: 2599, originalPrice: Math.round(2599 * 1.2), tag: "Sale", images: ["/images/exclusive.jpeg"], category: "Scents" },
{ id: 4, name: "All rounder by Shoaib Malik", price: 4999, originalPrice: Math.round(4999 * 1.2), tag: "Sale", images: ["/images/all rounder j..jpeg"], category: "Scents" },
{ id: 5, name: "Spark", price: 2900, originalPrice: Math.round(2900 * 1.2), tag: "Sale", images: ["/images/spark.jpeg"], category: "Scents" },
{ id: 6, name: "Uroosa", price: 2500, originalPrice: Math.round(2500 * 1.2), tag: "Premium", images: ["/images/uroosa.jpeg"], category: "Scents" },
{ id: 7, name: "Dior", price: 2499, originalPrice: Math.round(2499 * 1.2), tag: "Exclusive", images: ["/images/Miss Dior.jpeg"], category: "Scents" },
{ id: 8, name: "Channel 5 in 1 set", price: 2499, originalPrice: Math.round(2499 * 1.2), tag: "Exclusive", images: ["/images/channel set.jpg"], category: "Scents" },
{ id: 9, name: "Gucci Flora", price: 799, originalPrice: Math.round(799 * 1.2), images: ["/images/Gucci Flora.webp"], category: "Scents" },
{ id: 10, name:"She Pen Perfume set", price: 999, originalPrice: Math.round(999 * 1.2), images: ["/images/she pen.webp"], category: "Scents" },
{ id: 11, name: "J. Pen Perfume Set", price: 999, originalPrice: Math.round(999 * 1.2), images: ["/images/PEN.jpeg"], category: "Scents" },


  // ✅ WATCHES
  { id: 9, name: "Rich Gold Elegant Watch", price: 149, images: ["/images/fancy 3.jpeg"], tag: "New", description: "Luxurious gold...", category: "Watches" },
  { id: 10, name: "Black Aura", price: 149, images: ["/images/6 aura.jpeg"], tag: "New", description: "Bold black watch...", category: "Watches" },
  { id: 11, name: "Classic Silver Dial", price: 129, images: ["/images/wt.jpeg"], description: "Refined silver dial...", category: "Watches" },
  { id: 12, name: "Fancy Neavy Blue Watch", price: 299, images: ["/images/fancy 2.jpeg"], tag: "Luxury", description: "Luxury navy blue...", category: "Watches" },
  { id: 13, name: "Minimal Leather Strap", price: 109, images: ["/images/w5.jpeg"], description: "Minimalist design...", category: "Watches" },

  // ✅ BAGS
  { id: 14, name: "Elegant Tote Bag", price: 199, tag: "New", images: ["/images/full moon.jpeg"], description: "Spacious and stylish...", category: "Bags" },
  { id: 15, name: "Fancy Clutch", price: 179, images: ["/images/black bride.jpeg"], description: "Evening clutch...", category: "Bags" },

  // ✅ STOLES
  { id: 16, name: "Chiffon Plain Scarfs", price: 1200, originalPrice: 1500, tag: "Pastels", images: ["/images/3 stols.jpeg"], description: "Soft pastel chiffon...", category: "Stoles" },
  { id: 17, name: "Georgitt Plain Scarfs", price: 1800, tag: "6 Pieces Deal", images: ["/images/bundle.jpeg"], description: "Set of 6 plain...", category: "Stoles" },
  { id: 18, name: "Silk Stuff Scarf", price: 950, images: ["/images/silk1.webp"], description: "Smooth and elegant...", category: "Stoles" },
  { id: 19, name: "Cotton Stuff Scarfs", price: 1350, originalPrice: 1600, images: ["/images/cotton hijab.webp"], description: "Breathable cotton...", category: "Stoles" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const currentIndex = products.findIndex(p => p.id.toString() === id);
  const product = products[currentIndex];
  const [imageIndex, setImageIndex] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Product not found
      </div>
    );
  }

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNextProduct = () => {
    const nextProduct = products[currentIndex + 1];
    if (nextProduct) {
      router.push(`/product/${nextProduct.id}`);
    }
  };

  const handlePrevProduct = () => {
    const prevProduct = products[currentIndex - 1];
    if (prevProduct) {
      router.push(`/product/${prevProduct.id}`);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/allProducts" className="hover:underline">
            All Products
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span>{product.name}</span>
        </div>

        {/* Product Navigation */}
        <div className="flex justify-between mb-6">
          <button
            onClick={handlePrevProduct}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <ArrowLeft size={18} /> Prev Product
          </button>

          <button
            onClick={handleNextProduct}
            disabled={currentIndex === products.length - 1}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border ${
              currentIndex === products.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            Next Product <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div className="relative border rounded-lg overflow-hidden">
            <Image
              src={product.images[imageIndex]}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-[400px] object-cover"
            />

            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ChevronLeftCircle size={28} />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ChevronRightCircle size={28} />
                </button>
              </>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 font-serif">
              {product.name}
            </h1>
            <div className="text-xl font-medium text-[#b13368]">
              Rs. {product.price.toFixed(0)}{' '}
              {product.originalPrice && (
                <span className="line-through text-gray-400 text-base ml-2">
                  Rs. {product.originalPrice.toFixed(0)}
                </span>
              )}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

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
                  toast.success('Added to cart 🛍️');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#b13368] text-white px-6 py-3 rounded-full hover:bg-[#9b2c5b] transition text-sm"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <Link
                href={`https://wa.me/?text=${encodeURIComponent("I'm interested in " + product.name)}`}
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

export default ProductDetail;
