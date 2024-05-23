import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TimerComponent() {
  const [timerValue, setTimerValue] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedTimerValue = localStorage.getItem('timerValue');

    if (storedTimerValue) {
      const remainingTime = JSON.parse(storedTimerValue) - Date.now();

      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          handleTimerExpired();
        }, remainingTime);

        setTimerValue(timer);
        setTimeLeft(remainingTime);
      } else {
        localStorage.removeItem('timerValue');
        setTimerValue(null);
        setTimeLeft(null);
      }
    } else {
      const timer = setTimeout(() => {
        handleTimerExpired();
      }, 3000);

      setTimerValue(timer);
      setTimeLeft(3000);

      localStorage.setItem('timerValue', JSON.stringify(Date.now() + 3000));
    }

    return () => {
      if (timerValue) {
        clearTimeout(timerValue);
      }
      localStorage.removeItem('timerValue');
    };
  }, [timerValue]);

  const handleTimerExpired = async () => {
    try {
      const response = await axios.get('https://example.com/api');
      // console.log(response.data);
    } catch (error) {
      console.error('Error making Axios request:', error);
    } finally {
      localStorage.removeItem('timerValue');
      setTimerValue(null);
      setTimeLeft(null);
    }
  };

  return (
    <div>
      <h1>Timer Component</h1>
      {timeLeft !== null && <p>Time Left: {timeLeft} milliseconds</p>}
      {timeLeft === null && <p>Timer expired!</p>}
    </div>
  );
}
