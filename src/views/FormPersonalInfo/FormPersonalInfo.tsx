'use client';

import React, { useState } from 'react';
import { useFormValidation } from './hooks/useFormValidation';
import { validateEmail } from './utils/validateEmail';
import { FormData, FormErrors } from './types';

import { toYYYYMMDD } from '@/core/utils/toYYMMDD';
import { sendPersonalInfo } from '@/core/api/sendPersonalInfo';
import { FormDataSend } from '@/core/types/formDataSend';
import { TextField } from '@/components/Textfield';
import { SliderRange } from '@/components/SliderRange';
import { InputFile } from '@/components/InputFile';
import { DateTimePicker } from '@/components/DateTimePicker';
import { CTA } from '@/components/CTA';

export const FormPersonalInfo = () => {
  const defaultValue: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    age: 8,
    date: null,
    time: '',
    file: [],
  };

  const defaultErrors: FormErrors = {
    email: false,
  };

  const [errors, setErrors] = useState(defaultErrors);
  const [formData, setFormData] = useState(defaultValue);
  const isFormValid = useFormValidation(formData, errors);

  const handleInputChange = (name: string, value: string | number | null | File[] | Date) => {
    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: !validateEmail(value as string) }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const payload: FormDataSend = {
      ...formData,
      date: toYYYYMMDD(formData.date),
    };

    sendPersonalInfo(payload);

    setFormData(defaultValue);
    setErrors(defaultErrors);
  };

  return (
    <>
      <h1 className="pb-8 text-2xl leading-none font-medium">Personal info</h1>
      <div className="flex flex-col gap-6 pb-12">
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
      <h1 className="pb-8 text-2xl leading-none font-medium">Your workout</h1>

      <DateTimePicker
        dateName="date"
        timeName="time"
        dateValue={formData.date}
        timeValue={formData.time}
        handleChange={handleInputChange}
      />

      <div className="pt-8">
        <CTA disabled={!isFormValid} handleSubmit={handleSubmit} />
      </div>
    </>
  );
};
