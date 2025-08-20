export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  date: Date | null;
  time: Date | null;
  file: File[] | [];
};

export type FormErrors = {
  email: boolean;
};
