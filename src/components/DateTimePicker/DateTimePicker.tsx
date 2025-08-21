'use client';

import { fetchNationalHoliday } from '@/core/api/fetchNationalHoliday';
import { fetchObservance } from '@/core/api/fetchObservance';
import { FC, useEffect, useMemo, useState } from 'react';
import { DataPicker } from '../DataPicker';
import { TimeSlots } from '../TimeSlots';
import { toYYYYMMDD } from '@/core/utils/toYYMMDD';

export type DateTimePickerProps = {
  dateName: string;
  timeName: string;
  dateValue: string;
  timeValue: string;
  handleChange: (name: string, value: string) => void;
};

export const DateTimePicker: FC<DateTimePickerProps> = ({ dateName, timeName, dateValue, timeValue, handleChange }) => {
  const [isClient, setIsClient] = useState(false);

  const [id, setId] = useState(null);

  const [dataObservance, setDataObservance] = useState(null);
  const [dataNationalHoliday, setDataNationalHoliday] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setId(null);
  }, [dateValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [observanceRes, holidayRes] = await Promise.all([fetchObservance(), fetchNationalHoliday()]);
        setDataObservance(observanceRes);
        setDataNationalHoliday(holidayRes);
      } catch (err) {
        console.error('Błąd podczas pobierania:', err);
      }
    };

    fetchData();
  }, []);

  const datesObservance = dataObservance?.map((item) => new Date(item.date)) ?? [];
  const datesNationalHoliday = dataNationalHoliday?.map((item) => new Date(item.date)) ?? [];

  const datesName =
    dataObservance?.map((item) => ({
      date: item.date,
      name: item.name,
    })) ?? [];

  const blockDates = [...(dataObservance ?? []), ...(dataNationalHoliday ?? [])].map((item) => item.date);

  const specialDays = [...datesObservance, ...datesNationalHoliday];

  const dayClassName = (d: Date) => {
    const isSpecial =
      d.getDay() === 0 || // niedziele
      specialDays.some(
        (sd) => sd.getFullYear() === d.getFullYear() && sd.getMonth() === d.getMonth() && sd.getDate() === d.getDate(),
      );

    return isSpecial ? 'custom-highlight' : undefined;
  };

  const foundBlockDate = blockDates.find((item) => item === toYYYYMMDD(dateValue));

  const isBlockDate = !!foundBlockDate;

  console.log('datesName', datesName);

  // const foundObservanceDate = datesName.find((item) => item.date === toYYYYMMDD(dateValue));

  const foundObservanceDate = useMemo(() => {
    if (!dateValue) return null;

    const normalized = toYYYYMMDD(dateValue);

    return datesName.find((item) => item.date === normalized) ?? null;
  }, [dateValue]);

  if (!isClient) return null;

  if (!dataObservance || !dataNationalHoliday) return <div>Loading...</div>;

  console.log('dayClassName', dayClassName);

  return (
    <div className="flex flex-col gap-[24px] sm:flex-row">
      <DataPicker
        name={dateName}
        dayClassName={dayClassName}
        foundObservanceDate={foundObservanceDate}
        value={dateValue}
        handleChange={handleChange}
      />
      {isBlockDate ? null : <TimeSlots id={id} setId={setId} />}
    </div>
  );
};
