import React, { useEffect, useState } from 'react';

interface TimerProps {
  isActive: boolean;
  onTimeUpdate: (time: number) => void;
  reset: boolean;
}

const Timer: React.FC<TimerProps> = ({ isActive, onTimeUpdate, reset }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (reset) {
      setTime(0);
    }
  }, [reset]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isActive) {
      timer = setInterval(() => {
        setTime((prev) => {
          const updatedTime = prev + 1;
          onTimeUpdate(updatedTime);
          return updatedTime;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isActive, onTimeUpdate]);

  return <div>Час: {time} сек.</div>;
};

export default Timer;
