export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatTime = (time: string) => {
  return time.padStart(5, '0') + ' Uhr';
};

export const formatPhone = (phone: string) => {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Format based on length
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  } else if (digits.length === 11) {
    return digits.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
  }
  
  return phone;
};

export const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    new: 'Neu',
    contacted: 'Kontaktiert',
    qualified: 'Qualifiziert',
    converted: 'Konvertiert',
    lost: 'Verloren'
  };
  
  return statusMap[status] || status;
};

export const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-green-100 text-green-800',
    converted: 'bg-purple-100 text-purple-800',
    lost: 'bg-red-100 text-red-800'
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800';
};