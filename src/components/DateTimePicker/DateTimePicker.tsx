'use client';

import { fetchNationalHoliday } from '@/core/api/fetchNationalHoliday';
import { fetchObservance } from '@/core/api/fetchObservance';
import { FC, useEffect, useMemo, useState } from 'react';
import { DataPicker } from '../DataPicker';
import { TimeSlots } from '../TimeSlots';
import { toYYYYMMDD } from '@/core/utils/toYYMMDD';
import { Holiday } from '@/core/types/holiday';

export type DateTimePickerProps = {
  dateName: string;
  timeName: string;
  dateValue: Date | null;
  timeValue: number;
  handleChange: (name: string, value: string | Date | null | number) => void;
};

export const DateTimePicker: FC<DateTimePickerProps> = ({ dateName, timeName, dateValue, timeValue, handleChange }) => {
  const [isClient, setIsClient] = useState(false);

  const [dataObservance, setDataObservance] = useState<Holiday[]>([]);
  const [dataNationalHoliday, setDataNationalHoliday] = useState<Holiday[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    handleChange(timeName, null);
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

  const datesObservance = useMemo(() => dataObservance?.map((item) => new Date(item.date)) ?? [], [dataObservance]);
  const datesNationalHoliday = useMemo(
    () => dataNationalHoliday?.map((item) => new Date(item.date)) ?? [],
    [dataNationalHoliday],
  );

  const datesName = useMemo(
    () =>
      dataObservance?.map((item) => ({
        date: item.date,
        name: item.name,
      })) ?? [],
    [dataObservance],
  );

  const blockDates = useMemo(
    () => [...(dataObservance ?? []), ...(dataNationalHoliday ?? [])].map((item) => item.date),
    [dataObservance, dataNationalHoliday],
  );

  const specialDays = useMemo(
    () => [...datesObservance, ...datesNationalHoliday],
    [datesObservance, datesNationalHoliday],
  );

  const dayClassName = (d: Date) => {
    const isSpecial =
      d.getDay() === 0 || // niedziele
      specialDays.some(
        (sd) => sd.getFullYear() === d.getFullYear() && sd.getMonth() === d.getMonth() && sd.getDate() === d.getDate(),
      );

    return isSpecial ? 'custom-highlight' : '';
  };

  const foundBlockDate = blockDates.find((item) => item === toYYYYMMDD(dateValue));

  const isBlockDate = !!foundBlockDate;

  const foundObservanceDate = useMemo(() => {
    if (!dateValue) return null;
    const normalized = toYYYYMMDD(dateValue);
    return datesName.find((item) => item.date === normalized) ?? null;
  }, [dateValue, datesName]);

  if (!isClient) return null;

  if (!dataObservance || !dataNationalHoliday) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-[24px] sm:flex-row">
      <DataPicker
        name={dateName}
        dayClassName={dayClassName}
        foundObservanceDate={foundObservanceDate}
        value={dateValue}
        handleChange={handleChange}
      />
      {isBlockDate ? null : <TimeSlots value={timeValue} handleChange={handleChange} name={timeName} />}
    </div>
  );
};
