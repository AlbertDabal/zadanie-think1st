'use client';

import { ArrowLeft } from '@/core/assets/ArrowLeft';
import { ArrowRight } from '@/core/assets/ArrowRight';
import { ErrorIcon } from '@/core/assets/ErrorIcon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';
import { FC } from 'react';

export type DatePickerProps = {
  dayClassName?: (date: Date) => string;
  foundObservanceDate: { date: string; name: string } | null;
  handleChange: (name: string, value: Date | null) => void;
  value: Date | null;
  name: string;
};

export const DataPicker: FC<DatePickerProps> = ({ dayClassName, foundObservanceDate, handleChange, value, name }) => {
  //NAPRAWIC DATE PICKER DOMYSLNIE JEST DATA I PRZY ZMIANIE MIESIACA
  // TEZ ZMIENIA SIE DZIEN A NIE ZAPISUJE SIE DO STANU

  return (
    <div className="">
      <p className="pb-[8px] leading-none">Date</p>
      <DatePicker
        selected={value}
        onChange={(d) => {
          handleChange(name, d);
        }}
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
        <div className="flex items-center gap-[8px]">
          <ErrorIcon color="#CBB6E5" />
          <p className="text-[14px]">{foundObservanceDate.name}</p>
        </div>
      )}
    </div>
  );
};
