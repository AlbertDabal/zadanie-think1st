'use client';

import { DelateIcon } from '@/core/assets/DelateIcon';
import { ChangeEvent, DragEvent, FC, MouseEvent, useRef } from 'react';

export type InputFileProps = {
  name: string;
  files: File[] | [];
  handleChange: (name: string, value: File[]) => void;
};

export const InputFile: FC<InputFileProps> = ({ name, files, handleChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleChange(name, [droppedFile]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleChange(name, [selectedFile]);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleChange(name, []);
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
              <button onClick={handleDelete}>
                <DelateIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
