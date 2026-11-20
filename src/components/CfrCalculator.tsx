import React, { useState } from 'react';
import { Ship, Clock, Navigation, CheckCircle2, ArrowLeft } from 'lucide-react';

interface CfrCalculatorProps {
  onQuoteRequested: (info: { origin: string; dest: string; cargo: string; time: string }) => void;
}

export const CfrCalculator: React.FC<CfrCalculatorProps> = ({ onQuoteRequested }) => {
  const [originPort, setOriginPort] = useState('بندر هامبورگ (آلمان) 🇩🇪');
  const [destPort, setDestPort] = useState('بندر شهید رجایی (بندرعباس) 🇮🇷');
  const [containerType, setContainerType] = useState('کانتینر ۴۰ فوت High Cube (دستگاه‌های استاندارد)');

  const transitEstimates: { [key: string]: { days: string; route: string; tips: string } } = {
    'بندر هامبورگ (آلمان) 🇩🇪': {
      days: '۲۸ الی ۳۴ روز دریایی',
      route: 'دریای شمال → کانال مانش → تنگه جبل‌الطارق → دریای مدیترانه → کانال سوئز → خلیج فارس',
      tips: 'مرکز اصلی بارگیری ماشین‌آلات سنگین صنعتی و دستگاه‌های فرز و تراش آلمانی با مهاربندی تخصصی لنت و سیم بکسل.'
    },
    'بندر آنتورپ (بلژیک) 🇧🇪': {
      days: '۲۵ الی ۳۰ روز دریایی',
      route: 'اقیانوس اطلس شمالی → مدیترانه → کانال سوئز → دریای سرخ → تنگه هرمز',
      tips: 'ایده‌آل برای حمل ماشین‌آلات صنایع پلاستیک و خطوط بسته‌بندی اروپای مرکزی با کمترین زمان توقف ترانزیت.'
    },
    'بندر روتردام (هلند) 🇳🇱': {
      days: '۲۶ الی ۳۲ روز دریایی',
      route: 'کانال مانش → مدیترانه → کانال سوئز → بنادر جنوب ایران',
      tips: 'بزرگترین هاب کانتینری اروپا؛ بهترین نرخ خطوط کشتیرانی برای پلتفرم‌های روباز Flat Rack.'
    },
    'بندر جنوا (ایتالیا) 🇮🇹': {
      days: '۲۰ الی ۲۶ روز دریایی',
      route: 'دریای مدیترانه → کانال سوئز → دریای عمان → خلیج فارس',
      tips: 'سریع‌ترین مسیر دریایی از اروپای جنوبی به سمت خلیج فارس برای ماشین‌آلات قالب‌سازی و پرس‌های هیدرولیک.'
    }
  };

  const selectedInfo = transitEstimates[originPort] || transitEstimates['بندر هامبورگ (آلمان) 🇩🇪'];

  return (
    <section id="cfr-calc" className="py-20 bg-[#0b0f14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <Ship className="w-3.5 h-3.5" />
            <span>لجستیک بین‌الملل و محاسبات دریایی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            محاسبه‌گر مسیر و زمان تحویل CFR
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            برآورد زمان ترانزیت دریایی از معتبرترین بنادر صادراتی اروپا به مقاصد گمرکی جنوب ایران
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Form */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                بندر مبدأ بارگیری در اروپا
              </label>
              <select
                value={originPort}
                onChange={(e) => setOriginPort(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="بندر هامبورگ (آلمان) 🇩🇪">بندر هامبورگ (آلمان) 🇩🇪</option>
                <option value="بندر آنتورپ (بلژیک) 🇧🇪">بندر آنتورپ (بلژیک) 🇧🇪</option>
                <option value="بندر روتردام (هلند) 🇳🇱">بندر روتردام (هلند) 🇳🇱</option>
                <option value="بندر جنوا (ایتالیا) 🇮🇹">بندر جنوا (ایتالیا) 🇮🇹</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                بندر مقصد تحویل در ایران (شرایط CFR)
              </label>
              <select
                value={destPort}
                onChange={(e) => setDestPort(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="بندر شهید رجایی (بندرعباس) 🇮🇷">بندر شهید رجایی (بندرعباس) 🇮🇷 - اصلی‌ترین بندر تجاری</option>
                <option value="بندر بوشهر 🇮🇷">بندر بوشهر 🇮🇷</option>
                <option value="بندر خرمشهر 🇮🇷">بندر خرمشهر 🇮🇷</option>
                <option value="بندر چابهار 🇮🇷">بندر چابهار 🇮🇷</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                نوع کانتینر یا شیوه مهاربندی بار
              </label>
              <select
                value={containerType}
                onChange={(e) => setContainerType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="کانتینر ۴۰ فوت High Cube (دستگاه‌های استاندارد)">کانتینر ۴۰ فوت High Cube (دستگاه‌های استاندارد)</option>
                <option value="پلتفرم باز Flat Rack (پرس‌های غول‌پیکر و قطعات مرتفع)">پلتفرم باز Flat Rack (پرس‌های غول‌پیکر و قطعات مرتفع)</option>
                <option value="کانتینر سقف‌باز Open Top (بارگیری با جرثقیل بالابر)">کانتینر سقف‌باز Open Top (بارگیری با جرثقیل بالابر)</option>
                <option value="کانتینر ۲۰ فوت استاندارد (ماشین‌ابزار تک یا قطعات)">کانتینر ۲۰ فوت استاندارد (ماشین‌ابزار تک یا قطعات)</option>
              </select>
            </div>

            <button
              onClick={() => {
                onQuoteRequested({
                  origin: originPort,
                  dest: destPort,
                  cargo: containerType,
                  time: selectedInfo.days
                });
              }}
              className="w-full py-3.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Ship className="w-4 h-4" />
              <span>ثبت درخواست استعلام هزینه حمل و پیش‌فاکتور</span>
            </button>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-slate-900/80 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <Clock className="w-4 h-4" />
                  <span>زمان تخمینی ترانزیت دریایی:</span>
                </div>
                <span className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums">
                  {selectedInfo.days}
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block mb-1 font-semibold flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-amber-400" />
                    مسیر کشتیرانی لاینر:
                  </span>
                  <p className="text-slate-200 bg-slate-950/70 p-3 rounded-lg border border-white/5 leading-relaxed font-mono text-[11px] sm:text-xs">
                    {selectedInfo.route}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    توضیحات فنی بارگیری در این بندر:
                  </span>
                  <p className="text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-lg border border-white/5">
                    {selectedInfo.tips}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>بیمه دریایی Institute Cargo Clauses (A)</span>
                  <span className="text-emerald-400 font-semibold">پوشش صددرصدی</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>نیاز به هماهنگی ترخیص و پته گمرکی در بندر دارید؟</span>
              <a href="#contact" className="text-amber-400 hover:underline font-bold flex items-center gap-1">
                <span>مشاوره با ترخیص‌کار</span>
                <ArrowLeft className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
