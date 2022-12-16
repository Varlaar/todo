import React, { useState, useEffect } from "react";

import "./Clock.scss";

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toLocaleDateString());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="clock clock_font">
      <p className="clock__date">{date}</p>
      <p className="clock__time">{time}</p>
    </div>
  );
};

export default Clock;
