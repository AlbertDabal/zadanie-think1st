import { useEffect, useState } from 'react';
import { fetchObservance } from '@/core/api/fetchObservance';
import { fetchNationalHoliday } from '@/core/api/fetchNationalHoliday';
import { Holiday } from '@/core/types/holiday';

export const useHolidays = () => {
  const [dataObservance, setDataObservance] = useState<Holiday[]>([]);
  const [dataNationalHoliday, setDataNationalHoliday] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [observanceRes, holidayRes] = await Promise.all([fetchObservance(), fetchNationalHoliday()]);

        setDataObservance(observanceRes ?? []);
        setDataNationalHoliday(holidayRes ?? []);
      } catch (err) {
        console.error('Błąd podczas pobierania świąt:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allHolidays = [...dataObservance, ...dataNationalHoliday];

  return { dataObservance, dataNationalHoliday, allHolidays, loading };
};
