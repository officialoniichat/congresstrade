export function formatDate(date) {
  return new Date(date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

export function formatTime(time) {
  return time.padStart(5, '0') + ' Uhr';
}

export function formatPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  } else if (digits.length === 11) {
    return digits.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
  }
  
  return phone;
}

export function formatStatus(status) {
  const statusMap = {
    new: 'Neu',
    contacted: 'Kontaktiert',
    qualified: 'Qualifiziert',
    converted: 'Konvertiert',
    lost: 'Verloren'
  };
  
  return statusMap[status] || status;
}