'use client';

import { useState, useRef, useEffect, FC, ChangeEvent, useCallback } from 'react';

export type SliderRangeProps = {
  name: string;
  handleChange: (name: string, value: string | number | null) => void;
  value: number;
  min?: number;
  max?: number;
  step?: number;
};

export const SliderRange: FC<SliderRangeProps> = ({ name, value, handleChange, min = 8, max = 100, step = 1 }) => {
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipReady, setTooltipReady] = useState(false);
  const sliderRef = useRef<HTMLInputElement | null>(null);

  const THUMB_WIDTH = 16;

  const updateTooltipPosition = useCallback(
    (val: number) => {
      if (!sliderRef.current) return;

      const sliderWidth = sliderRef.current.clientWidth;
      const percent = (val - min) / (max - min);
      const thumbOffset = percent * (sliderWidth - THUMB_WIDTH) + THUMB_WIDTH / 2;

      setTooltipLeft(thumbOffset);
    },
    [min, max],
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    handleChange(name, val);
    updateTooltipPosition(val);
  };

  useEffect(() => {
    updateTooltipPosition(value);
    setTooltipReady(true);
  }, [value, updateTooltipPosition]);

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex w-full flex-col gap-0 pb-10">
      <p>Age</p>
      <div className="relative mt-4 select-none">
        <div className="absolute bottom-4 flex w-full items-center justify-between pl-1 text-xs">
          <span>{min}</span>
          <span>{max}</span>
        </div>

        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onInput={handleInput}
          className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-[#cbb6e5] [&::-moz-range-progress]:bg-[#761BE4] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#761BE4] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#761BE4]"
          style={{
            background: `linear-gradient(to right, #761BE4 0%, #761BE4 ${percent}%, #CBB6E5 ${percent}%, #CBB6E5 100%)`,
          }}
        />

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
              <polygon points="0,10 7,0 14,10" fill="#CBB6E5" />
              <polygon points="2,10 7,2 12,10" fill="#FAF9FA" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
