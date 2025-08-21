import { Holiday } from '../types/holiday';

export const fetchNationalHoliday = async (): Promise<Holiday[]> => {
  try {
    const res = await fetch(`https://api.api-ninjas.com/v1/holidays?country=PL&type=NATIONAL_HOLIDAY`, {
      method: 'GET',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from : ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching API /:`);
    return [];
  }
};
