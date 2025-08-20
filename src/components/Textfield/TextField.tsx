import React, { FC } from 'react';
import clsx from 'clsx';
import { ErrorIcon } from '@/core/assets/ErrorIcon';

type TextFieldProps = {
  placeholder?: string;
  value?: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  type?: 'text' | 'email';
};

//todo dodać walidacje meila

export const TextField: FC<TextFieldProps> = ({ type, label, error }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="font-regular leading-none">{label}</label>
      <input
        type={type || 'text'}
        className={clsx(
          'h-[48px] rounded-lg px-[18px] py-[16px] outline-1 outline-[#CBB6E5] focus:outline-2',
          error
            ? 'bg-[#FEECEC] outline-2 outline-[#ED4545] focus:outline-[#ED4545]'
            : 'bg-[#FFFFFF] focus:bg-[#FAF9FA] focus:outline-[#761BE4]',
        )}
      />

      {error && type === 'email' && (
        <div className="relative mt-1 flex gap-[8px] text-[14px]">
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
