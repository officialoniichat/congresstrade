export const validateContact = (data: any) => {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Phone is required';
  } else if (!/^[\d\s+()-]{10,}$/.test(data.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email address';
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

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateNote = (text: string) => {
  if (!text?.trim()) {
    return 'Note text is required';
  }
  if (text.length > 1000) {
    return 'Note is too long (max 1000 characters)';
  }
  return null;
};

export const validateTag = (tag: string) => {
  if (!tag?.trim()) {
    return 'Tag text is required';
  }
  if (tag.length > 50) {
    return 'Tag is too long (max 50 characters)';
  }
  if (!/^[a-zA-Z0-9\s-]+$/.test(tag)) {
    return 'Tag can only contain letters, numbers, spaces and hyphens';
  }
  return null;
};