'use client';

import { ErrorIcon } from '@/core/assets/ErrorIcon';
import clsx from 'clsx';
import { FC } from 'react';

type TextFieldProps = {
  placeholder?: string;
  label: string;
  type?: 'text' | 'email';
  name: string;
  handleChange: (name: string, value: string | number | null) => void;
  error?: boolean;
  value: string;
};

export const TextField: FC<TextFieldProps> = ({ type, label, handleChange, name, error, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-regular leading-none">{label}</label>
      <input
        onChange={(e) => handleChange(name, e.target.value)}
        type={type || 'text'}
        value={value}
        className={clsx(
          'h-12 rounded-lg px-[18px] py-4 outline-1 outline-[#CBB6E5] focus:outline-2',
          error
            ? 'bg-[#FEECEC] outline-2 outline-[#ED4545] focus:outline-[#ED4545]'
            : 'bg-[#FFFFFF] focus:bg-[#FAF9FA] focus:outline-[#761BE4]',
        )}
      />

      {error && type === 'email' && (
        <div className="relative mt-1 flex gap-2 text-sm">
          <ErrorIcon />
          <div className="flex flex-col gap-1 leading-none">
            <p>Please use correct formatting.</p>
            <p>Example: address@email.com</p>
          </div>
        </div>
      )}
    </div>
  );
};
