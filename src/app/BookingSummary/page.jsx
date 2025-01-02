"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Separate component to handle searchParams
const BookingTable = ({ restaurant }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8080/api/getAllBookings/?restaurant=${restaurant}`
        );
        if (res.data.success) {
          setBookings(res.data.bookings);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (restaurant) {
      fetchBookings();
    }
  }, [restaurant]);

  if (loading) {
    return (
      <div className="flex justify-center items-center space-x-2">
        <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (bookings.length === 0) {
    return <p className="text-lg text-gray-500">No bookings found.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Customer Name</th>
            <th className="py-2 px-4 text-left">Contact</th>
            <th className="py-2 px-4 text-left">Total Guests</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4 text-gray-700">{booking.name}</td>
              <td className="py-2 px-4 text-gray-700">{booking.contact}</td>
              <td className="py-2 px-4 text-gray-700">{booking.guests}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BookingSummary = () => {
  const searchParams = useSearchParams();
  const restaurant = searchParams.get("restaurant");

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Booking Summary</h2>
      <Suspense fallback={<p>Loading search parameters...</p>}>
        {restaurant ? (
          <BookingTable restaurant={restaurant} />
        ) : (
          <p className="text-gray-500">
            Please select a restaurant to view bookings.
          </p>
        )}
      </Suspense>
    </div>
  );
};

export default BookingSummary;
