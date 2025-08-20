'use client';

import { useState, useRef, useEffect } from 'react';

export const Slider = () => {
  const [value, setValue] = useState(8);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipReady, setTooltipReady] = useState(false);
  const sliderRef = useRef(null);

  const THUMB_WIDTH = 16; // px, zgodnie z CSS thumba

  //do poprawy

  const updateTooltipPosition = (val) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const min = Number(slider.min);
    const max = Number(slider.max);
    const sliderWidth = slider.clientWidth;

    const percent = (val - min) / (max - min);

    const thumbOffset = percent * (sliderWidth - THUMB_WIDTH) + THUMB_WIDTH / 2;

    setTooltipLeft(thumbOffset);
  };

  const handleInput = (e) => {
    const val = Number(e.target.value);
    setValue(val);
    updateTooltipPosition(val);
  };

  useEffect(() => {
    updateTooltipPosition(value);
    setTooltipReady(true);
  }, []);

  return (
    <div className="flex w-full flex-col gap-0 pb-10">
      <p>Age</p>
      <div className="relative mt-4 select-none">
        <div className="absolute bottom-[16px] flex w-full items-center justify-between pl-[4px] text-xs">
          <span>8</span>
          <span>100</span>
        </div>

        <input
          ref={sliderRef}
          type="range"
          min={8}
          max={100}
          value={value}
          onInput={handleInput}
          className="h-1 w-[calc(100%-4px)] cursor-pointer appearance-none rounded-lg bg-[#cbb6e5] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#761be4]"
        />

        {/* Tooltip */}
        {tooltipReady && (
          <div
            className="absolute top-10 flex w-[37px] items-center justify-center rounded border-1 border-[#CBB6E5] bg-[#FAF9FA] px-2 py-1 text-xs text-[#761BE4]"
            style={{
              left: tooltipLeft,
              transform: 'translateX(-50%)',
            }}
          >
            {value}

            <svg className="absolute -top-[10px] left-1/2 -translate-x-1/2" width="14" height="10">
              {/* zewnętrzny trójkąt */}
              <polygon points="0,10 7,0 14,10" fill="#CBB6E5" />
              {/* wewnętrzny trójkąt (ramka zachowana) */}
              <polygon points="2,10 7,2 12,10" fill="#FAF9FA" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
