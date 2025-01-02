"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { useSearchParams } from "next/navigation";

const BookingCalendar = ({ onSlotSelect }) => {
  const searchParams = useSearchParams();
  const restaurant = searchParams.get("restaurant");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);

  const timeSlots = [
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const date = format(selectedDate, "yyyy-MM-dd", { locale: enUS });
        const res = await axios.get(
          `https://restaurant-booking-backend-wheat.vercel.app/api/getbookingbydate/${date}?restaurant=${restaurant}`
        );

        if (res.data.success) {
          const bookedSlots = res.data.bookingsByDate.map(
            (booking) => booking.time
          );
          const available = timeSlots.filter(
            (slot) => !bookedSlots.includes(slot)
          );
          setAvailableSlots(available);
        } else {
          setAvailableSlots(timeSlots);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setAvailableSlots(timeSlots);
      }
    };

    fetchBookings();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-2xl font-semibold text-center">Select a Date</h1>

      <div className="flex justify-center">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          locale="en-US"
          className="rounded-lg border border-gray-300 shadow-md"
        />
      </div>

      <h2 className="text-lg font-medium text-center mt-4">
        Available Time Slots for{" "}
        {format(selectedDate, "MMMM dd, yyyy", { locale: enUS })}
      </h2>

      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <li
              key={index}
              className="p-4 bg-green-200 text-center rounded-lg cursor-pointer hover:bg-green-300 transition-colors duration-300"
              onClick={() => onSlotSelect(selectedDate, slot)}
            >
              {slot}
            </li>
          ))
        ) : (
          <p className="text-red-500 col-span-full text-center">
            No available slots
          </p>
        )}
      </ul>
    </div>
  );
};

export default BookingCalendar;
