import React from 'react';

export default function ArticleHeader() {
  return (
    <div>
      <div className="flex items-center gap-4 text-gray-500 text-sm sm:text-base mb-8">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/59/DER_SPIEGEL_logo.svg"
          alt="Der Spiegel Logo"
          className="h-6 sm:h-8"
        />
        <span>Wirtschaft & Politik</span>
        <span>•</span>
        <span>12 Min. Lesezeit</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-bold text-navy-900 mb-6">
        Die Pelosi-Methode: Wie die ehemalige Speakerin des US-Kongresses ein Vermögen an der Börse macht
      </h2>

      <div className="flex items-center gap-4 mb-12">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Thomas Weber"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-navy-900">Von Thomas Weber</p>
          <p className="text-gray-500">Finanzredakteur, Der Spiegel</p>
        </div>
      </div>
    </div>
  );
}