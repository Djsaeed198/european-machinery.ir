import React from 'react';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';

export const TehranMapSection: React.FC = () => {
  return (
    <div className="mt-12 glass-panel rounded-2xl overflow-hidden border border-white/10 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">موقعیت و دسترسی به دفتر تهران</h4>
            <span className="text-xs text-slate-400">منطقه ونک، هماهنگی جلسات حضوری و بررسی قراردادها</span>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=Tehran+Vanak"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>مسیریابی در نقشه</span>
        </a>
      </div>

      {/* Styled Map Container */}
      <div className="relative aspect-[21/9] min-h-[260px] rounded-xl overflow-hidden border border-white/10 bg-slate-950">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12948.33758369225!2d51.399587!3d35.759325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e070e1c22a36b%3A0x6b8bc6b16e45f917!2sVanak%20Square%2C%20Tehran!5e0!3m2!1sen!2s!4v1714652400000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: 'invert(90%) hue-rotate(180deg) saturate(60%) brightness(85%) contrast(110%)'
          }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="دفتر تهران European Machinery"
        />

        {/* Overlay Badge */}
        <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-200 backdrop-blur-md flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>ساعت پذیرش مراجعین: شنبه تا چهارشنبه ۹:۰۰ الی ۱۷:۰۰</span>
        </div>
      </div>
    </div>
  );
};
