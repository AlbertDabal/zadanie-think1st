import { useEffect, useState } from 'react';
import { FormData, FormErrors } from '../types';

export const useFormValidation = (formData: FormData, errors: FormErrors) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const hasEmptyFields = Object.values(formData).some((value) => value === '' || value === null);
    const hasErrors = Object.values(errors).some(Boolean);
    setIsValid(!hasEmptyFields && !hasErrors);
  }, [formData, errors]);

  return isValid;
};
