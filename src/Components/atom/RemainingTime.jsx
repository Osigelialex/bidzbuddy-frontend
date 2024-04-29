import { useState, useEffect } from "react";

const RemainingTime = ({ milliseconds, size }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(milliseconds);

  const getTime = () => {
    const time = Math.max(0, start - 1000);
    setStart(time);

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    setStart(milliseconds);
  }, [milliseconds]);

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, [start]);

  return (
      <div className="flex gap-3 p-2">
        <div className="border border-gray-500 sm:p-3 p-2 rounded-tr-lg rounded-bl-lg font-bold text-xl" style={{ "borderColor": start === 0 ? "red" : "" }}>
          {days} D
        </div>
        <div className="border border-gray-500 sm:p-3 p-2 rounded-tr-lg rounded-bl-lg font-bold text-xl" style={{ "borderColor": start === 0 ? "red" : "" }}>
          {hours} H
        </div>
        <div className="border border-gray-500 sm:p-3 p-2 rounded-tr-lg rounded-bl-lg font-bold text-xl" style={{ "borderColor": start === 0 ? "red" : "" }}>
          {minutes} M
        </div>
        <div className="border border-gray-500 sm:p-3 p-2 rounded-tr-lg rounded-bl-lg font-bold text-xl" style={{ "borderColor": start === 0 ? "red" : "" }}>
          {seconds} S
        </div>
      </div>
  );
};

export default RemainingTime;
