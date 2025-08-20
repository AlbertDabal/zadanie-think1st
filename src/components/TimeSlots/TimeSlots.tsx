'use client';

import clsx from 'clsx';
import React, { useState } from 'react';

export const TimeSlots = ({ id, setId }) => {
  const data = [
    { id: 1, time: '12:00' },
    { id: 2, time: '14:00' },
    { id: 3, time: '16:30' },
    { id: 4, time: '18:30' },
    { id: 5, time: '20:00' },
  ];

  const handleClick = (slotId: number) => {
    setId(slotId);
  };

  return (
    <div>
      <p className="pb-[8px] leading-none">Time</p>
      <div className="flex flex-row flex-wrap gap-[8px] pb-[10px] sm:flex-col">
        {data.map((slot) => (
          <div
            key={slot.id}
            className={clsx(
              'flex h-[46px] w-[76px] cursor-pointer items-center justify-center rounded-[8px] bg-white select-none',
              id === slot.id ? 'outline-2 outline-[#761BE4]' : 'outline-1 outline-[#CBB6E5]',
            )}
            onClick={() => handleClick(slot.id)}
          >
            <span>{slot.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
