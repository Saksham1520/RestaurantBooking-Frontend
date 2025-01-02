"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingSummary = () => {
  const [restaurant, setRestaurant] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const restaurantParam = params.get("restaurant");
    setRestaurant(restaurantParam);

    const fetchBookings = async () => {
      if (!restaurantParam) return;

      try {
        setLoading(true);
        const res = await axios.get(
          `https://restaurant-booking-backend-wheat.vercel.app/api/getAllBookings/?restaurant=${restaurantParam}`
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

    fetchBookings();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Booking Summary</h2>
      {restaurant ? (
        <p className="text-gray-600">
          Showing bookings for: <strong>{restaurant}</strong>
        </p>
      ) : (
        <p className="text-gray-500">No restaurant selected.</p>
      )}

      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-lg text-gray-500">No bookings found.</p>
      ) : (
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
      )}
    </div>
  );
};

export default BookingSummary;
