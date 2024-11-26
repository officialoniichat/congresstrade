import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { DateTimeInputsProps } from './types';

export default function DateTimeInputs({
  date,
  time,
  onDateChange,
  onTimeChange,
  dateError
}: DateTimeInputsProps) {
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
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
            dateError ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gold-500'
          }`}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
        />
        {dateError && (
          <p className="mt-1 text-sm text-red-500">{dateError}</p>
        )}
      </div>

      <div>
        <label className="block text-lg sm:text-xl font-medium text-navy-900 mb-2 sm:mb-3">
          <Clock className="inline-block mr-2 h-5 sm:h-6 w-5 sm:w-6 text-gold-500" />
          Wunschuhrzeit
        </label>
        <select
          className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-xl border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 outline-none transition-colors"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
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
  );
}