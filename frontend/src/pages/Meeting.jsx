import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { FaRegCalendarAlt, FaGoogle, FaMicrosoft } from "react-icons/fa";
import "./customCalendar.css";

const meetingData = [
 {
 date: "Feb 7, 2025",
 title: "Meeting with Jonathan at CoffeeShop",
 time: "5:00am",
 },
 {
 date: "Feb 7, 2025",
 title: "Product call with the Design team",
 time: "7:00am",
 },
 {
 date: "Feb 7, 2025",
 title: "Team call to figure out what’s next",
 time: "12:00pm",
 },
];

const CrazyCalendar = () => {
 const [date, setDate] = useState(new Date());

 return (
 <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-10 text-[var(--text-main)] font-sans">
 {/* Header */}
 <motion.h1
 className="text-5xl font-extrabold mb-4 text-center text-[var(--text-main)]"
 initial={{ opacity: 0, y: -40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ type: "spring", stiffness: 60 }}
 >
 Study Plan <br /> Calendar
 </motion.h1>

 <motion.p
 className="text-lg text-[var(--text-muted)] max-w-xl text-center mb-10"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.4 }}
 >
 Keep track of all your meetings and what was discussed.
 Import events quickly with our Google Calendar and Outlook integrations.
 </motion.p>

 {/* Tilt + Calendar */}
 <Tilt
 tiltMaxAngleX={20}
 tiltMaxAngleY={20}
 perspective={1000}
 transitionSpeed={1500}
 scale={1.05}
 gyroscope={true}
 >
 <motion.div
 className="p-6 rounded-3xl shadow-2xl glass-panel relative"
 initial={{ rotateY: 90, opacity: 0 }}
 animate={{ rotateY: 0, opacity: 1 }}
 transition={{ duration: 1, type: "spring" }}
 >
 <div className="flex items-center gap-2 text-[var(--text-main)] mb-4 text-xl">
 <FaRegCalendarAlt />
 <span>Pick a date</span>
 </div>
 <Calendar
 onChange={setDate}
 value={date}
 className="crazy-calendar"
 tileClassName="crazy-tile"
 />
 </motion.div>
 </Tilt>

 {/* Selected Date Display */}
 <motion.div
 className="mt-10 text-lg text-center flex flex-col items-center"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 1 }}
 >
 <span className="text-[var(--text-muted)]">Selected Date:</span>
 <div className="glass-panel !bg-[var(--bg-glass-hover)] !border-[var(--border-glass)] text-[var(--text-main)] px-4 py-2 rounded-full font-bold shadow-sm mt-2">
 {date.toDateString()}
 </div>
 </motion.div>


 </div>
 );
};

export default CrazyCalendar;
