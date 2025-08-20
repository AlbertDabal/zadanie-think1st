import * as React from 'react';

export const ArrowLeft = () => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group cursor-pointer" // grupa dla hover
    >
      <path
        d="M9.5 16.866a1 1 0 010-1.732l9-5.196a1 1 0 011.5.866v10.392a1 1 0 01-1.5.866l-9-5.196z"
        fill="#CBB6E5"
        className="transition-colors duration-200 group-hover:fill-[#761BE4]" // zmienia tylko path przy hover na SVG
      />
    </svg>
  );
};
