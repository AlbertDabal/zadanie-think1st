import * as React from 'react';

export const ArrowRight = () => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group cursor-pointer"
    >
      <path
        d="M22.5 16.866a1 1 0 000-1.732l-9-5.196a1 1 0 00-1.5.866v10.392a1 1 0 001.5.866l9-5.196z"
        fill="#CBB6E5"
        className="transition-colors duration-200 group-hover:fill-[#761BE4]" // zmienia tylko path przy hover na SVG
      />
    </svg>
  );
};
