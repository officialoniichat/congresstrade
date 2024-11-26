import React, { useState } from 'react';
import { Phone, Mail, User, X, AlertCircle } from 'lucide-react';
import { tracking } from '../../services/tracking';
import FormHeader from './FormHeader';
import FormInput from './FormInput';
import FormSuccess from './FormSuccess';
import DateTimeInputs from './DateTimeInputs';
import { ConsultationFormProps, FormData, ValidationErrors } from './types';

export default function ConsultationForm({ onClose }: ConsultationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    preferred_date: '',
    preferred_time: '10:00'
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
      isValid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name muss mindestens 3 Zeichen lang sein';
      isValid = false;
    }

    const phoneRegex = /^[\d\s+()-]{10,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer ist erforderlich';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Ungültige Telefonnummer';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
      isValid = false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.preferred_date);
    if (!formData.preferred_date) {
      newErrors.preferred_date = 'Datum ist erforderlich';
      isValid = false;
    } else if (selectedDate < today) {
      newErrors.preferred_date = 'Datum kann nicht in der Vergangenheit liegen';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fehler beim Senden der Anfrage');
      }

      // Track successful consultation request
      tracking.trackConsultationRequest(formData);

      setSubmitSuccess(true);
      setTimeout(onClose, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return <FormSuccess onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="relative bg-white rounded-2xl p-4 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-400 hover:text-navy-900 transition-colors"
          aria-label="Schließen"
        >
          <X className="h-6 sm:h-8 w-6 sm:w-8" />
        </button>

        <FormHeader 
          title="Kostenlose Beratung"
          subtitle="Wir rufen Sie gerne zurück und beraten Sie ausführlich"
        />

        {submitError && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <FormInput
            label="Ihr Name"
            type="text"
            value={formData.name}
            onChange={(value) => {
              setFormData({ ...formData, name: value });
              if (errors.name) {
                setErrors({ ...errors, name: undefined });
              }
            }}
            error={errors.name}
            required
            icon={User}
            placeholder="Max Mustermann"
          />

          <FormInput
            label="Ihre Telefonnummer"
            type="tel"
            value={formData.phone}
            onChange={(value) => {
              setFormData({ ...formData, phone: value });
              if (errors.phone) {
                setErrors({ ...errors, phone: undefined });
              }
            }}
            error={errors.phone}
            required
            icon={Phone}
            placeholder="0123 45678900"
          />

          <FormInput
            label="Ihre E-Mail (optional)"
            type="email"
            value={formData.email}
            onChange={(value) => {
              setFormData({ ...formData, email: value });
              if (errors.email) {
                setErrors({ ...errors, email: undefined });
              }
            }}
            error={errors.email}
            icon={Mail}
            placeholder="max@beispiel.de"
          />

          <DateTimeInputs
            date={formData.preferred_date}
            time={formData.preferred_time}
            onDateChange={(value) => {
              setFormData({ ...formData, preferred_date: value });
              if (errors.preferred_date) {
                setErrors({ ...errors, preferred_date: undefined });
              }
            }}
            onTimeChange={(value) => setFormData({ ...formData, preferred_time: value })}
            dateError={errors.preferred_date}
          />

          <div className="pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-navy-900 text-white text-lg sm:text-xl font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-navy-800 transition-colors focus:ring-4 focus:ring-navy-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
              ) : (
                'Einen der 7 verfügbaren Plätze sichern'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}