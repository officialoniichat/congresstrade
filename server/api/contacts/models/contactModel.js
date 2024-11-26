export function validateContact(data) {
  const errors = {};

  // Required fields
  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Phone is required';
  } else if (!/^[\d\s+()-]{10,}$/.test(data.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (!data.preferred_date) {
    errors.preferred_date = 'Date is required';
  } else {
    const selectedDate = new Date(data.preferred_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.preferred_date = 'Date cannot be in the past';
    }
  }

  if (!data.preferred_time) {
    errors.preferred_time = 'Time is required';
  }

  // Optional fields
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email address';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}