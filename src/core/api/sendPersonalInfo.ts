import { FormDataSend } from '../types/formDataSend';

export const sendPersonalInfo = async (data: FormDataSend) => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error while sending data: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Data sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending data:', error);
  }
};
