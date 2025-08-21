'use client';

import { ArrowLeft } from '@/core/assets/ArrowLeft';
import { ArrowRight } from '@/core/assets/ArrowRight';
import { ErrorIcon } from '@/core/assets/ErrorIcon';
import { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';

export type DatePickerProps = {
  dayClassName?: (date: Date) => string;
  foundObservanceDate: { date: string; name: string } | null;
  handleChange: (name: string, value: Date | null) => void;
  value: Date | null;
  name: string;
};

export const DataPicker: FC<DatePickerProps> = ({ dayClassName, foundObservanceDate, handleChange, value, name }) => {
  return (
    <div className="">
      <p className="pb-2 leading-none">Date</p>
      <DatePicker
        selected={value}
        onChange={(date) => handleChange(name, date)}
        calendarStartDay={1}
        inline
        dayClassName={dayClassName}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className="flex items-center justify-between px-2">
            <button onClick={decreaseMonth}>
              <ArrowLeft />
            </button>

            <span className="text-base font-medium text-[#000853]">
              {date.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>

            <button onClick={increaseMonth}>
              <ArrowRight />
            </button>
          </div>
        )}
      />
      {foundObservanceDate && (
        <div className="flex items-center gap-2">
          <ErrorIcon color="#CBB6E5" />
          <p className="text-sm">{foundObservanceDate.name}</p>
        </div>
      )}
    </div>
  );
};
