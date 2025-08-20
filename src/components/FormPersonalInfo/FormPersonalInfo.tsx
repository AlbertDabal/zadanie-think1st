'use client';

import React, { useState } from 'react';
import { useFormValidation } from './hooks/useFormValidation';
import { validateEmail } from './utils/validateEmail';
import { FormData, FormErrors } from './types';
import { TextField } from '../Textfield';
import { SliderRange } from '../SliderRange';
import { InputFile } from '../InputFile';
import { DateTimePicker } from '../DateTimePicker';
import { CTA } from '../CTA';

export const FormPersonalInfo = () => {
  const defaultValue: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    age: 8,
    date: null,
    time: null,
    file: [],
  };

  const defaultErrors: FormErrors = {
    email: false,
  };

  const [errors, setErrors] = useState(defaultErrors);
  const [formData, setFormData] = useState(defaultValue);
  const isFormValid = useFormValidation(formData, errors);

  const handleInputChange = (name: string, value: string | number | null | File[]) => {
    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: !validateEmail(value as string) }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log('formData', formData);

  const handleSubmit = () => {
    setFormData(defaultValue);
    setErrors(defaultErrors);
  };

  return (
    <>
      <h1 className="pb-[32px] text-2xl leading-none font-medium">Personal info</h1>
      <div className="flex flex-col gap-[24px] pb-[48px]">
        <TextField label="First Name" name="firstName" handleChange={handleInputChange} value={formData.firstName} />
        <TextField label="Last Name" name="lastName" handleChange={handleInputChange} value={formData.lastName} />
        <TextField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          handleChange={handleInputChange}
          error={errors.email}
        />
        <SliderRange name="age" value={formData.age} handleChange={handleInputChange} />
        <InputFile name="file" files={formData.file} handleChange={handleInputChange} />
      </div>
      <h1 className="pb-[32px] text-2xl leading-none font-medium">Your workout</h1>

      <DateTimePicker dateName="date" timeName="time" />

      <div className="pt-[32px]">
        <CTA disabled={isFormValid} handleSubmit={handleSubmit} />
      </div>
    </>
  );
};
