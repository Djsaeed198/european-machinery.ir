import React from 'react';
import { X, CheckCircle2, ShieldAlert, Ship, MapPin, Calendar, FileText, Phone } from 'lucide-react';
import { MachineItem } from '../types';

interface MachineDetailModalProps {
  machine: MachineItem | null;
  onClose: () => void;
  onRequestQuote: (machine: MachineItem) => void;
}

export const MachineDetailModal: React.FC<MachineDetailModalProps> = ({
  machine,
  onClose,
  onRequestQuote
}) => {
  if (!machine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="glass-panel w-full max-w-3xl rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
              EM
            </span>
            <div>
              <h2 className="text-base font-bold text-white line-clamp-1">{machine.title}</h2>
              <span className="text-xs text-amber-400 font-mono ltr-num">{machine.model}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Image & Key Badges */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/10">
            <img
              src={machine.image}
              alt={machine.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-900/90 text-white border border-white/10 backdrop-blur-md">
                {machine.country} · {machine.city}
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-lg bg-amber-500/90 text-slate-950 backdrop-blur-md">
                مدل: {machine.year}
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-900/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                {machine.condition}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 mb-2">توضیحات و گزارش کارشناسی در اروپا:</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-white/5">
              {machine.description}
            </p>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>مشخصات فنی و استانداردهای صنعتی:</span>
            </h3>
            <div className="border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-xs sm:text-sm text-right">
                <tbody>
                  {Object.entries(machine.specs).map(([specKey, specVal], idx) => (
                    <tr
                      key={specKey}
                      className={`border-b border-white/5 ${
                        idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-900/80'
                      }`}
                    >
                      <td className="p-3 font-semibold text-slate-400 w-1/3">{specKey}</td>
                      <td className="p-3 text-white font-mono ltr-num text-left">{specVal}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/40">
                    <td className="p-3 font-semibold text-slate-400">شرایط تحویل و بارگیری</td>
                    <td className="p-3 text-amber-400">{machine.deliveryTerms}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Inspection and Customs Guarantee Box */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>تضمین اصالت کالا و انطباق با قرارداد (Inspection Guarantee)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              کلیه تجهیزات صنعتی قبل از بارگیری توسط کارشناسان دفاتر اتریش و آلمان تست هندسی و الکتریکال شده و امکان بازرسی شخص ثالث (SGS یا TÜV) به همراه فیلم‌برداری با پلاک روز کارخانه فراهم است.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/10 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            <span>کد پیگیری دستگاه: </span>
            <strong className="text-white font-mono ltr-num">{machine.id}</strong>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/989231505100?text=${encodeURIComponent(
                `سلام، تقاضای پیش‌فاکتور (Proforma) برای دستگاه ${machine.title} مدل ${machine.model} با شناسه ${machine.id} دارم.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/50 rounded-xl transition-colors"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              <span>استعلام فوری در واتس‌اپ</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onRequestQuote(machine);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all shadow-md shadow-amber-500/25"
            >
              <Ship className="w-4 h-4" />
              <span>درخواست رسمی پیش‌فاکتور (CFR)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
