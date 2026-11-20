import React from 'react';
import { Star, Quote, Building2, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'مهندس محمدرضا زمانی',
      role: 'مدیر تولید و تجهیزات مجتمع قطعه‌سازی خودرو',
      city: 'تبریز',
      device: 'فرز ۵ محور DMG MORI آلمان',
      text: 'برای خرید دستگاه ۵ محور کارکرده دغدغه خطای میکرونی و فرسودگی داشتیم. کارشناس European Machinery در اشتوتگارت بازرسی لیزری هندسی انجام داد و فیلم کامل تست بال‌بار فرستاد. دستگاه با پکینگ چوبی ضد رطوبت به بندر شهید رجایی رسید و مدارک ترخیص EPL بی‌نقص بود.',
      rating: 5
    },
    {
      name: 'دکتر علیرضا افشار',
      role: 'مدیرعامل صنایع کارتن و بسته‌بندی البرز',
      city: 'قزوین',
      device: 'خط کامل ورق فلوتینگ ۲.۵ متری BHS آلمان',
      text: 'خرید یک خط تولید کامل با ۱۶ کانتینر پروژه بسیار سنگینی است. تیم اتریش و تهران تمام مراحل را از نشانه‌گذاری کابل‌ها و هماهنگی ترانزیت دریایی تا صدور گواهی مبدأ اتاق بازرگانی وین مدیریت کردند. بیش از ۲۰ درصد صرفه‌جویی نسبت به واسطه‌های متفرقه تجربه کردیم.',
      rating: 5
    },
    {
      name: 'مهندس حمید باقری',
      role: 'رئیس هیئت مدیره قالب‌سازی پارس قالب',
      city: 'اصفهان',
      device: 'پرس هیدرولیک ۸۰۰ تن Schuler',
      text: 'شفافیت مالی و پاسخگویی دفتر اتریش بی‌نظیر بود. دستگاه دقیقاً مطابق گزارش اولیه فنی و ساعات کارکرد واقعی تحویل داده شد و در راه‌اندازی سیستم هیدرولیک رکسروت هم پشتیبانی فنی کامل ارائه دادند.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-[#090d14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <span>رضایت و اعتماد صنعتگران</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            تجربه مدیران صنایع و کارخانجات ایران
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            نظرات خریدارانی که خطوط تولید و ماشین‌آلات خود را از طریق دفتر اتریش و تهران European Machinery تأمین کرده‌اند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-amber-500/20 mb-3" />

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  «{r.text}»
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">{r.name}</h4>
                    <span className="text-[11px] text-slate-400 block mt-0.5">{r.role} ({r.city})</span>
                  </div>
                </div>

                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-white/5 text-[10px] text-amber-400 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>دستگاه تأمین‌شده: {r.device}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
