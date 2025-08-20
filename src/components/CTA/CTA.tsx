import React, { FC } from 'react';

type CTAProps = {
  disabled?: boolean;
};

export const CTA: FC<CTAProps> = ({ disabled = true }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="bg-button hover:bg-button-hover disabled:bg-button-inactive w-full cursor-pointer rounded px-8 py-4 text-lg leading-none font-medium text-white"
    >
      Send Application
    </button>
  );
};
