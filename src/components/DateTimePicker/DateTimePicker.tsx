'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { DataPicker } from '../DataPicker';
import { TimeSlots } from '../TimeSlots';
import { toYYYYMMDD } from '@/core/utils/toYYMMDD';
import { createDayClassName } from './utils/createDayClassName';
import { useHolidays } from './hooks/useHolidays';

export type DateTimePickerProps = {
  dateName: string;
  timeName: string;
  dateValue: Date | null;
  timeValue: string | null;
  handleChange: (name: string, value: string | Date | null | number) => void;
};

export const DateTimePicker: FC<DateTimePickerProps> = ({ dateName, timeName, dateValue, timeValue, handleChange }) => {
  const [isClient, setIsClient] = useState(false);
  const { dataObservance, dataNationalHoliday, allHolidays, loading } = useHolidays();

  useEffect(() => setIsClient(true), []);
  useEffect(() => handleChange(timeName, null), [dateValue]);

  const dayClassName = useMemo(() => createDayClassName(allHolidays), [allHolidays]);

  const blockDates = useMemo(() => allHolidays.map((item) => item.date), [allHolidays]);

  const isBlockDate = dateValue ? blockDates.includes(toYYYYMMDD(dateValue) ?? '') : false;

  const foundObservanceDate = useMemo(() => {
    if (!dateValue) return null;
    const normalized = toYYYYMMDD(dateValue);
    return dataObservance.concat(dataNationalHoliday).find((item) => item.date === normalized) ?? null;
  }, [dateValue, dataObservance, dataNationalHoliday]);

  if (!isClient || loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <DataPicker
        name={dateName}
        dayClassName={dayClassName}
        foundObservanceDate={foundObservanceDate}
        value={dateValue}
        handleChange={handleChange}
      />
      {!isBlockDate && <TimeSlots value={timeValue} handleChange={handleChange} name={timeName} />}
    </div>
  );
};
