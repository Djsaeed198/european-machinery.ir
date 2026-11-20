import React from 'react';
import { ArrowLeft, MessageSquare, Ship, Award, CheckCircle2, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background with industrial dark overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-10 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('/assets/aistudio/photo_2026-01-09_11-56-53_5d66e12b.jpg')`,
          filter: 'brightness(0.22) contrast(1.15)'
        }}
      />
      
      {/* Subtle radial gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14]/80 via-[#0b0f14]/60 to-[#0b0f14] -z-10 pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-3xl">
          {/* Trust Kicker */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>پل ارتباطی مستقیم صنعت ایران و بازارهای صنعتی اروپا</span>
            <span className="text-slate-500">·</span>
            <span className="font-semibold text-amber-400">اتریش 🇦🇹 و آلمان 🇩🇪</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.25] mb-6">
            متخصص واردات و فروش <br />
            <span className="text-gradient-amber">ماشین‌آلات صنعتی نو و دست‌دوم</span> <br />
            از قلب اروپا
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 font-normal max-w-2xl">
            ارزیابی، بازاریابی و تأمین مستقیم انواع ماشین‌ابزار، خطوط تولید کارخانجات، ماشین‌آلات CNC، تجهیزات فرآوری فلز، پلاستیک و چاپ با استانداردهای اتحادیه اروپا و شرایط تحویل CFR در بنادر مقصد.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
            >
              <span>مشاهده کاتالوگ ماشین‌آلات</span>
              <ArrowLeft className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-xl backdrop-blur-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>درخواست مشاوره رایگان خرید</span>
            </a>

            <a
              href="https://wa.me/989231505100"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 rounded-xl transition-all"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span>واتس‌اپ مستقیم: <span className="ltr-num font-mono text-xs">00989231505100</span></span>
            </a>
          </div>

          {/* 4 Quantitative Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-5 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-md">
            <div className="border-l border-white/10 pl-3 sm:pl-4 last:border-none">
              <span className="block text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">
                +۱۵
              </span>
              <span className="text-xs text-slate-400 font-medium">سال تجربه در اروپا</span>
            </div>

            <div className="border-l border-white/10 pl-3 sm:pl-4 last:border-none">
              <span className="block text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">
                +۵۰۰
              </span>
              <span className="text-xs text-slate-400 font-medium">دستگاه و خط تولید فعال</span>
            </div>

            <div className="border-l border-white/10 pl-3 sm:pl-4 last:border-none">
              <span className="block text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">
                ۲ دفتر
              </span>
              <span className="text-xs text-slate-400 font-medium">وین (اتریش) و تهران</span>
            </div>

            <div>
              <span className="block text-2xl sm:text-3xl font-black text-amber-400">
                CFR
              </span>
              <span className="text-xs text-slate-400 font-medium">تحویل رسمی بنادر ایران</span>
            </div>
          </div>
        </div>
      </div>

      {/* Down Chevron */}
      <a
        href="#catalog"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 hover:text-amber-400 transition-colors animate-bounce"
        aria-label="پیمایش به بخش کاتالوگ"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};
