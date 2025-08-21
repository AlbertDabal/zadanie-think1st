import { useEffect, useState } from 'react';
import { FormData, FormErrors } from '../types';

export const useFormValidation = (formData: FormData, errors: FormErrors) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Check for empty fields or null values
    const hasEmptyFields = Object.entries(formData).some(([key, value]) => {
      // Special check for 'file' field
      if (key === 'file' && Array.isArray(value)) {
        return value.length === 0; // invalid if no files
      }
      return value === '' || value === null;
    });

    // Check if there are any validation errors
    const hasErrors = Object.values(errors).some(Boolean);

    setIsValid(!hasEmptyFields && !hasErrors);
  }, [formData, errors]);

  return isValid;
};
