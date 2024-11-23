import React, { useEffect, useState, useRef } from 'react';
import { Phone, Mail, User, Calendar, Clock, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import FomoDisclaimer from './FomoDisclaimer';
import { useApi } from '../hooks/useApi';
import { trackMetaConversion } from '../metaPixel';

interface ConsultationFormProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
  investment_capacity: string;
  risk_tolerance: string;
  experience_level: string;
  time_horizon: string;
  preferred_package: string;
}

interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  preferred_date?: string;
  preferred_time?: string;
}

export default function ConsultationForm({ onClose }: ConsultationFormProps) {
  const { fetchApi } = useApi();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    preferred_date: '',
    preferred_time: '10:00',
    investment_capacity: 'medium',
    risk_tolerance: 'moderate',
    experience_level: 'beginner',
    time_horizon: 'medium',
    preferred_package: 'basic'
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const tracked = useRef<boolean>(false);

  useEffect(() => {
    if (!tracked.current) {
      trackMetaConversion('Kontakt');
      tracked.current = true;
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
      isValid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name muss mindestens 3 Zeichen lang sein';
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[\d\s+()-]{10,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer ist erforderlich';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Ungültige Telefonnummer';
      isValid = false;
    }

    // Email validation (optional but must be valid if provided)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
      isValid = false;
    }

    // Date validation
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
      await fetchApi('/contacts', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          status: 'new'
        })
      });

      setSubmitSuccess(true);
      trackMetaConversion('Lead');
      
      // Close form after success message
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy-900 mb-4">
            Vielen Dank!
          </h2>
          <p className="text-gray-600 mb-6">
            Ihre Anfrage wurde erfolgreich übermittelt. Wir werden Sie schnellstmöglich kontaktieren.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-navy-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-navy-800 transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    );
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

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
            Kostenlose Beratung
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Wir rufen Sie gerne zurück und beraten Sie ausführlich
          </p>
          
          <FomoDisclaimer className="mb-6" />
        </div>

        {submitError && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-lg sm:text-xl font-medium text-navy-900 mb-2 sm:mb-3">
              <User className="inline-block mr-2 h-5 sm:h-6 w-5 sm:w-6 text-gold-500" />
              Ihr Name
            </label>
            <input
              type="text"
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-xl border-2 rounded-xl focus:ring-2 focus:ring-gold-500/20 outline-none transition-colors ${
                errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gold-500'
              }`}
              placeholder="Max Mustermann"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) {
                  setErrors({ ...errors, name: undefined });
                }
              }}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-lg sm:text-xl font-medium text-navy-900 mb-2 sm:mb-3">
              <Phone className="inline-block mr-2 h-5 sm:h-6 w-5 sm:w-6 text-gold-500" />
              Ihre Telefonnummer
            </label>
            <input
              type="tel"
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-xl border-2 rounded-xl focus:ring-2 focus:ring-gold-500/20 outline-none transition-colors ${
                errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gold-500'
              }`}
              placeholder="0123 45678900"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) {
                  setErrors({ ...errors, phone: undefined });
                }
              }}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
            <p className="mt-2 text-base sm:text-lg text-gray-600">
              Unter dieser Nummer erreichen wir Sie für die persönliche Beratung
            </p>
          </div>

          <div>
            <label className="block text-lg sm:text-xl font-medium text-navy-900 mb-2 sm:mb-3">
              <Mail className="inline-block mr-2 h-5 sm:h-6 w-5 sm:w-6 text-gold-500" />
              Ihre E-Mail (optional)
            </label>
            <input
              type="email"
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-xl border-2 rounded-xl focus:ring-2 focus:ring-gold-500/20 outline-none transition-colors ${
                errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gold-500'
              }`}
              placeholder="max@beispiel.de"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) {
                  setErrors({ ...errors, email: undefined });
                }
              }}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-lg sm:text-xl font-medium text-navy-900 mb-2 sm:mb-3">
                <Calendar className="inline-block mr-2 h-5 sm:h-6 w-5 sm:w-6 text-gold-500" />
                Wunschtermin
              </label>
              <input
                type="date"
                min={getMinDate()}
                className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-xl border-2 rounded-xl focus:ring-2 focus:ring-gold-500/20 outline-none transition-colors ${
                  errors.preferred_date ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gold-500'
                }`}
                value={formData.preferred_date}
                onChange={(e) => {
                  setFormData({ ...formData, preferred_date: e.target.value });
                  if (errors.preferred_date) {
                    setErrors({ ...errors, preferred_date: undefined });
                  }
                }}
              />
              {errors.preferred_date && (
                <p className="mt-1 text-sm text-red-500">{errors.preferred_date}</p>
              )}
            </div>

            <div>
              <label className="block text-lg sm:text-xl font-medium text-navy-900 mb-2 sm:mb-3">
                <Clock className="inline-block mr-2 h-5 sm:h-6 w-5 sm:w-6 text-gold-500" />
                Wunschuhrzeit
              </label>
              <select
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-xl border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 outline-none transition-colors"
                value={formData.preferred_time}
                onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
              >
                <option value="09:00">09:00 Uhr</option>
                <option value="10:00">10:00 Uhr</option>
                <option value="11:00">11:00 Uhr</option>
                <option value="14:00">14:00 Uhr</option>
                <option value="15:00">15:00 Uhr</option>
                <option value="16:00">16:00 Uhr</option>
              </select>
            </div>
          </div>

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
            <p className="mt-3 sm:mt-4 text-center text-base sm:text-lg text-gray-600">
              Wir melden uns noch heute bei Ihnen
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}