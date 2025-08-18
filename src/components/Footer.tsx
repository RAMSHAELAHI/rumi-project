import React from "react";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-4 sm:px-12 md:px-28">
      <div className="mx-auto py-12">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Brand Section */}
          <div className="flex flex-col w-full md:w-[320px] items-start">
            <div className="flex items-center gap-2">
              <Image
                src="/images/abr logo.png" // 🔥 Replace with your logo
                alt="Rumi Logo"
                width={40}
                height={40}
                className="ml-3"
              />
              <span className="text-[#272343] text-[26px] font-bold">
                Be Attractive With Rumi
              </span>
            </div>
            <p className="mt-4 text-gray-500">
              Discover timeless scents, elegant watches, and luxurious bags,
              stoles & scarves designed to make every moment special.
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-start gap-4 mt-4">
              <a
                href="https://wa.me/923XXXXXXXXX" // 🔥 Replace with your WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-700 text-2xl"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.facebook.com/yourpage" // 🔥 Replace with your Facebook link
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-2xl"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/attractions_by_rumi?igsh=MWZ0end6d2gxc2Ztcg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700 text-2xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.tiktok.com/@be.attractive.wit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 text-2xl"
              >
                <SiTiktok />
              </a>
              <a
                href="mailto:beattractivewithrumi@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-700 text-2xl"
              >
                <MdEmail />
              </a>
            </div>
          </div>

          {/* Categories Section */}
          <div className="w-full md:w-1/4 lg:w-[105px]">
            <h4 className="text-lg font-semibold text-[#9A9CAA]">Categories</h4>
            <ul className="mt-4 text-[#272343] space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-[#029FAE] hover:underline hover:underline-offset-4"
                >
                  Scents
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#029FAE] hover:underline hover:underline-offset-4"
                >
                  Watches
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#029FAE] hover:underline hover:underline-offset-4"
                >
                  Bags
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#029FAE] hover:underline hover:underline-offset-4"
                >
                  Stoles
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#029FAE] hover:underline hover:underline-offset-4"
                >
                  Scarves
                </a>
              </li>
            </ul>
          </div>

          {/* Facilities Section */}
          <div className="w-full md:w-1/4 lg:w-[156px]">
            <h4 className="text-lg font-semibold text-[#9A9CAA]">Facilities</h4>
            <ul className="mt-4 text-[#272343] space-y-2">
              <li>Premium Quality</li>
              <li>Unbeatable Prices</li>
              <li>Guarantee Safe</li>
              <li>Exclusive Design</li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="w-full md:w-1/4 lg:w-[156px]">
            <h4 className="text-lg font-semibold text-[#9A9CAA]">Support</h4>
            <ul className="mt-4 text-[#272343] space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-[#029FAE] hover:underline hover:underline-offset-4"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#029FAE] hover:underline hover:underline-offset-4"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#029FAE] hover:underline hover:underline-offset-4"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-between items-center flex-wrap text-white bg-[#272343] pt-4 pb-4 mt-8 rounded-sm">
          <p className="w-full text-center text-sm">
            ©2025 Be. Designed & Developed by{" "}
            <span className="font-semibold">Ramsha Elahi</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
