"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function RestaurantCard({ restItem }) {
  return (
    <div className="border rounded-lg p-4 shadow-lg overflow-hidden bg-white">
      <Image
        src={restItem.image}
        alt={restItem.name}
        layout="fit"
        objectFit="cover"
        priority
      ></Image>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{restItem.name}</h2>
        <p className="text-sm text-gray-600">{restItem.description}</p>
        <div className="flex items-center justify-between">
          <Link
            href={{
              pathname: "/BookingForm",
              query: { restaurant: restItem.name },
            }}
          >
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Book a table
            </button>
          </Link>
          <Link
            href={{
              pathname: "/BookingSummary",
              query: { restaurant: restItem.name },
            }}
          >
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Booking Summary
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
