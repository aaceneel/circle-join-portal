
// Validation functions for form inputs

// Validate name format (only letters and at least 2 chars per name part)
export const validateName = (name: string): boolean => {
  const nameParts = name.trim().split(/\s+/);
  const validFormat = /^[A-Za-z]+$/;
  
  if (nameParts.length < 2) return false;
  
  return nameParts.every(part => {
    return validFormat.test(part) && part.length >= 2;
  });
};

// Validate phone number format
export const validatePhone = (phone: string): boolean => {
  // Check for country code (must start with +)
  const phoneRegex = /^\+[0-9]{1,4}[0-9\s]{5,14}$/;
  return phoneRegex.test(phone);
};
