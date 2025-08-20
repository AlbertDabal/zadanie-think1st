'use client';

import { DelateIcon } from '@/core/assets/DelateIcon';
import React, { useRef, useState } from 'react';

export const InputFile = () => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFiles([droppedFile]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFiles([selectedFile]);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <p className="pb-[8px] leading-none">Photo</p>

      {files.length === 0 ? (
        <div
          className="flex cursor-pointer items-center justify-center rounded-[8px] border-1 border-[#CBB6E5] bg-white py-[40px] text-center hover:bg-gray-100"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick}
        >
          <div className="flex items-center gap-2">
            <p className="text-[#761BE4] underline underline-offset-3">Upload a file</p>
            <p className="hidden text-[#898DA9] sm:flex">or drag and drop here</p>
          </div>
          <input ref={inputRef} type="file" onChange={handleFileSelect} className="hidden" />
        </div>
      ) : (
        <div
          className="flex cursor-pointer items-center justify-center rounded-[8px] border-1 border-[#CBB6E5] bg-white py-[40px] text-center hover:bg-gray-100"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick}
        >
          {files.map((file, index) => (
            <div className="flex items-center gap-[5px]" key={index}>
              <div key={index}>{file.name}</div>
              <button onClick={() => setFiles([])}>
                <DelateIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
