import React from 'react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/989231505100"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="ارتباط مستقیم در واتس‌اپ"
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
    >
      {/* Ping ring animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping-slow pointer-events-none -z-10" />

      <i className="fa-brands fa-whatsapp text-3xl"></i>

      {/* Hover tooltip */}
      <span className="absolute right-16 bg-slate-900 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-white/10 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        گفتگو مستقیم در واتس‌اپ (۰۹۲۳۱۵۰۵۱۰۰)
      </span>
    </a>
  );
};
