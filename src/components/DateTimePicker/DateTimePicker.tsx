'use client';

import { fetchNationalHoliday } from '@/core/api/fetchNationalHoliday';
import { fetchObservance } from '@/core/api/fetchObservance';
import { FC, useEffect, useState } from 'react';
import { DataPicker } from '../DataPicker';
import { TimeSlots } from '../TimeSlots';

export type DateTimePickerProps = {
  dateName: string;
  timeName: string;
};

export const DateTimePicker: FC<DateTimePickerProps> = ({ dateName, timeName }) => {
  const [isClient, setIsClient] = useState(false);

  const [date, setDate] = useState<Date | null>(new Date());
  const [id, setId] = useState(null);

  const [dataObservance, setDataObservance] = useState(null);
  const [dataNationalHoliday, setDataNationalHoliday] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setId(null);
  }, [date]);

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

  const toYYYYMMDD = (d: Date) => d.toISOString().split('T')[0];

  const foundBlockDate = blockDates.find((item) => item === toYYYYMMDD(date));

  const isBlockDate = !!foundBlockDate;

  const foundObservanceDate = datesName.find((item) => item.date === toYYYYMMDD(date));

  if (!isClient) return null;

  if (!dataObservance || !dataNationalHoliday) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-[24px] sm:flex-row">
      <DataPicker date={date} setDate={setDate} dayClassName={dayClassName} foundObservanceDate={foundObservanceDate} />
      {isBlockDate ? null : <TimeSlots id={id} setId={setId} />}
    </div>
  );
};
