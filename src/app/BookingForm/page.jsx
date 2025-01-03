"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import BookingCalendar from "../components/BookingCalendar";
import { useSearchParams } from "next/navigation";

const BookingFormContent = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const restaurant = searchParams.get("restaurant");

  const [isClient, setIsClient] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    guests: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSlotSelect = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        date: selectedDate.toISOString().split("T")[0],
        time: selectedTime,
        restaurant,
      };
      const res = await axios.post(
        "https://restaurant-booking-backend-wheat.vercel.app/api/createbooking",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert(error.response?.data.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8">
      <h2 className="text-2xl font-semibold text-center">Booking Form</h2>
      <p className="text-gray-600 text-center">
        Booking for: <strong>{restaurant}</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="guests" className="block text-gray-700">
              Number of Guests
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              placeholder="Number of Guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <BookingCalendar onSlotSelect={handleSlotSelect} />

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? <p>Loading...</p> : <p>Confirm Booking</p>}
        </button>
      </form>
    </div>
  );
};

const BookingForm = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BookingFormContent />
  </Suspense>
);

export default BookingForm;
