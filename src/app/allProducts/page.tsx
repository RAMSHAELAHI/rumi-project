'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Heart, HeartOff } from "lucide-react";
import { toast } from "sonner";

const AllProducts = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const products = [
    // ✅ SCENTS (mixed ladies & gents)
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


    // ✅ WATCHES (standard + luxury + smart watches together)
    { id: 12, name: "Rich Gold Fancy Watch", price: 1999, originalPrice: Math.round(1999 * 1.2), tag: "Single Piece", images: ["/images/fancy 3.jpeg"], category: "Watches" },
    { id: 13, name: "Women in Black Aura", price: 1999, originalPrice: Math.round(1999 * 1.2), tag: "Luxury", images: ["/images/6 aura.jpeg"], category: "Watches" },
    { id: 14, name: "Classic Silver Dial", price: 1999, originalPrice: Math.round(1999 * 1.2), images: ['/images/wt.jpeg'], category: "Watches" },
    { id: 15, name: "Fancy Neavy Blue Watch", price: 1999, originalPrice: Math.round(1999 * 1.2), images: ["/images/fancy 2.jpeg"], category: "Watches" },
    { id: 16, name: "Fancy Rose Copper", price: 1599, originalPrice: Math.round(1599 * 1.2), images: ["/images/w5.jpeg"], category: "Watches" },
    { id: 17, name: "Classic Women", price: 1499, originalPrice: Math.round(1499 * 1.2), images: ["/images/w6.jpeg"], category: "Watches" },
    { id: 18, name: "Rich Gold", price: 2999, originalPrice: Math.round(2999 * 1.2), tag: "Free Bracelet", images: ["/images/5 bracelet.jpeg"], category: "Watches" },
    { id: 19, name: "Royal Black Dial", price: 1599, originalPrice: Math.round(1599 * 1.2), tag: "Exclusive", images: ["/images/w4.jpeg"], category: "Watches" },
    { id: 20, name: "Man in Black Aura", price: 2499, originalPrice: Math.round(2499 * 1.2), tag: "Limited", images: ["/images/6 aura.jpeg"], category: "Watches" },
    { id: 21, name: "Platinum Elegance", price: 3299, originalPrice: Math.round(3299 * 1.2), tag: "Best Seller", images: ["/images/w3.jpeg"], category: "Watches" },
    { id: 22, name: "Elegant Brown", price: 3299, originalPrice: Math.round(3299 * 1.2), tag: "Free Bracelet", images: ["/images/4 bracelet.jpeg"], category: "Watches" },
    { id: 23, name: "Platinum Black", price: 2499, originalPrice: Math.round(2499 * 1.2), tag: "Free Chain", images: ["/images/w1.jpeg"], category: "Watches" },
    { id: 24, name: "Active Pro Watch", price: 4999, originalPrice: Math.round(4999 * 1.2), tag: "Limited", images: ["/images/smartt.jpeg"], category: "Watches" },

    // ✅ BAGS
    { id: 36, name: "Elegant Tote Bag", price: 2200, originalPrice: Math.round(2200 * 1.2), tag: "New", images: ["/images/full moon.jpeg"], category: "Bags" },
    { id: 37, name: "Fancy Clutch", price: 1699, originalPrice: Math.round(1699 * 1.2), tag: "Sale", images: ["/images/black bride.jpeg"], category: "Bags" },
    { id: 38, name: "Hijab Tote", price: 1800, originalPrice: Math.round(1800 * 1.2), tag: "New", images: ["/images/hijab tote.jpeg"], category: "Bags" },
    { id: 39, name: "LV Leather Bag", price: 2199, originalPrice: Math.round(2199 * 1.2), tag: "Sale", images: ["/images/lv blac 2.jpeg"], category: "Bags" },
    { id: 40, name: "Canva Design Tote", price: 1800, originalPrice: Math.round(1800 * 1.2), tag: "New", images: ["/images/CANVA.jpeg"], category: "Bags" },
    { id: 41, name: "Fancy Gold Clutch", price: 1599, originalPrice: Math.round(1599 * 1.2), tag: "Sale", images: ["/images/ride gold.jpeg"], category: "Bags" },
    { id: 42, name: "Luna Carry", price: 2999, originalPrice: Math.round(2999 * 1.2), tag: "Sale", images: ["/images/LUNA CARRY BROWN.jpeg"], category: "Bags" },
    { id: 43, name: "LV Leather Bag", price: 2199, originalPrice: Math.round(2199 * 1.2), tag: "Sale", images: ["/images/lv black off white.jpeg"], category: "Bags" },

    // ✅ STOLES
    { id: 32, name: 'Chiffon Plain Scarfs', price: 699, originalPrice: Math.round(699 * 1.2), tag: 'Pastels', images: ['/images/3 stols.jpeg'], category: 'Stoles' },
    { id: 33, name: 'Georgitt Plain Scarfs', price: 2800, originalPrice: Math.round(2800 * 1.2), tag: '6 Pieces Deal', images: ['/images/bundle.jpeg'], category: 'Stoles' },
    { id: 34, name: 'Silk Stuff Scarf', price: 750, originalPrice: Math.round(750 * 1.2), images: ['/images/silk1.webp'], category: 'Stoles' },
    { id: 35, name: 'Cotton Stuff Scarfs', price: 799, originalPrice: Math.round(799 * 1.2), images: ['/images/cotton hijab.webp'], category: 'Stoles' },
  ];

  const formatPrice = (price: number) => (
    <>
      {price} <span className="text-gray-500 text-sm font-normal">PKR</span>
    </>
  );

  const handleWishlistToggle = (product: any) => {
    toggleWishlist({
      _id: product.id.toString(),
      title: product.name,
      price: product.price,
      imgUrl: product.images?.[0] || "/images/placeholder.png",
    });
    const wishlisted = isInWishlist(product.id.toString());
    toast.success(wishlisted ? "Removed from Wishlist" : "Added to Wishlist");
  };

  const renderSection = (title: string, category: string) => {
    const filteredProducts = products.filter(
      (p) => p.category && p.category.trim().toLowerCase() === category.trim().toLowerCase()
    );

    return (
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = isInWishlist(product.id.toString());
            const productImage = product.images?.[0] || "/images/placeholder.png";

            return (
              <div
                key={product.id}
                className="relative border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 flex flex-col justify-between bg-white"
              >
                {product.tag && (
                  <span
                    className={`absolute top-2 left-2 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      product.tag === "New"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.tag}
                  </span>
                )}

                <button
                  onClick={() => handleWishlistToggle(product)}
                  className="absolute top-2 right-2 text-rose-500 hover:text-rose-600 z-10 p-1 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition"
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isWishlisted ? <HeartOff size={24} /> : <Heart size={24} />}
                </button>

                <Link href={`/product/${product.id}`} passHref>
                  <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded-md">
                    <Image
                      src={productImage}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
                </Link>

                <p className="text-gray-700 font-bold text-lg mb-1">
                  {formatPrice(product.price)}
                  {product.originalPrice && (
                    <span className="line-through text-gray-500 text-base ml-2">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </p>

                <button
                  onClick={() => {
                    addToCart({
                      _id: product.id.toString(),
                      title: product.name,
                      price: product.price,
                      imgUrl: productImage,
                      quantity: 1,
                    });
                    toast.success("Added to cart");
                  }}
                  className="mt-auto bg-[#272343] text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition w-full text-center"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
        All Products
      </h1>

      {renderSection("Scents Collection", "Scents")}
      {renderSection("Watches Collection", "Watches")}
      {renderSection("Bags Collection", "Bags")}
      {renderSection("Stoles Collection", "Stoles")}
    </section>
  );
};

export default AllProducts;
