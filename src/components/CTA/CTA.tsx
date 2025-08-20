import React, { FC } from 'react';

type CTAProps = {
  disabled?: boolean;
  handleSubmit: () => void;
};

export const CTA: FC<CTAProps> = ({ disabled, handleSubmit }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={handleSubmit}
      className="bg-button hover:bg-button-hover disabled:bg-button-inactive w-full cursor-pointer rounded px-8 py-4 text-lg leading-none font-medium text-white"
    >
      Send Application
    </button>
  );
};
