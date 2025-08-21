export type Holiday = {
  country: string;
  iso: string;
  year: number;
  date: string;
  day: string;
  name: string;
  type: 'NATIONAL_HOLIDAY' | 'OBSERVANCE' | 'OTHER';
};
