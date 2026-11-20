import React from 'react';
import { Layers, Disc, Milk, Box, Trees, Shirt, Utensils, Zap, ShieldCheck, ArrowLeft, Droplets, HardHat } from 'lucide-react';

interface ProductionLinesProps {
  onSelectCategoryForInquiry: (catTitle: string) => void;
}

export const ProductionLines: React.FC<ProductionLinesProps> = ({ onSelectCategoryForInquiry }) => {
  const lines = [
    {
      icon: Disc,
      title: 'خط تولید تایر و قطعات لاستیکی',
      desc: 'خطوط کامل اکستروژن سرد، بنبوری، پرس پخت تایر رادیال و کلندر لاستیک با تکنولوژی آلمان و ایتالیا.',
      capacity: 'ظرفیت ۱,۰۰۰ تا ۳,۰۰۰ حلقه در روز'
    },
    {
      icon: Milk,
      title: 'خطوط فرآوری لبنیات و شیرخشک',
      desc: 'اسپری درایرهای صنعتی، اواپراتورهای تغلیظ، پاستوریزاتور و پرکن‌های اسپتیک استاندارد دارویی سوئیس و آلمان.',
      capacity: 'ظرفیت ۲ تا ۱۰ تن در ساعت'
    },
    {
      icon: Box,
      title: 'کارتن‌سازی، کاغذ و مقوا',
      desc: 'خطوط تولید ورق کارتن چندلایه، مقوای بهداشتی، دستگاه‌های چاپ و دایکات و بسته‌بندی تمام اتوماتیک.',
      capacity: 'عرض کاری ۲.۲ تا ۲.۸ متر'
    },
    {
      icon: Trees,
      title: 'تخته فشرده و نئوپان (MDF)',
      desc: 'سیستم‌های تولید نئوپان و MDF از چوب، باگاس، کاه و کلش مجهز به پرس‌های پیوسته (Continuous Press) اروپایی.',
      capacity: 'ظرفیت ۱۰۰ تا ۴۰۰ متر مکعب در روز'
    },
    {
      icon: Shirt,
      title: 'صنایع نساجی و نخ‌ریسی',
      desc: 'خطوط رینگ و اپن‌اند ریسندگی، ماشین‌آلات بافندگی مدرن، تکمیل، رنگرزی و چاپ پارچه اروپایی.',
      capacity: 'خطوط کامل با قطعات فابریک'
    },
    {
      icon: Utensils,
      title: 'خطوط نان صنعتی و قنادی',
      desc: 'میکسرها، خطوط برش و رول فرمینگ، فرهای تونلی پیوسته و بسته‌بندی تحت گاز محافظت‌شده.',
      capacity: 'ظرفیت ۵۰۰ تا ۲۰۰۰ کیلوگرم در ساعت'
    },
    {
      icon: Zap,
      title: 'کابل‌سازی، لوله و اکستروژن',
      desc: 'خطوط کشش مس و آلومینیوم، اکسترودر عایق و روکش کابل فشار قوی، تولید لوله‌های پلی‌اتیلن و کاروگیت.',
      capacity: 'استاندارد DIN / IEC اروپایی'
    },
    {
      icon: Droplets,
      title: 'پمپ‌های صنعتی، پالایش و لایروبی',
      desc: 'پمپ‌های غول‌پیکر انتقال آب، ایستگاه‌های پالایشگاهی، تسویه، لایروبی بنادر، تخلیه و مکش صنعتی لجن.',
      capacity: 'دبی‌های ۵۰۰ تا ۱۰,۰۰۰ متر مکعب'
    },
    {
      icon: HardHat,
      title: 'ماشین‌آلات راهسازی، جرثقیل و معدن',
      desc: 'جرثقیل‌های کارگاهی و بندری سنگین، مته‌های حفاری گمانه‌زنی و دکل‌های تخصصی استخراج معدن.',
      capacity: 'تناژهای ۴۰ تا ۵۰۰ تن'
    }
  ];

  return (
    <section id="production-lines" className="py-20 bg-[#0b0f14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <span>پروژه‌های کارخانه‌ای کلید در دست (Turnkey)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            تأمین خطوط تولید کامل کارخانجات از اروپا
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            امکان شناسایی، خرید، دمونتاژ مهندسی، بسته‌بندی، حمل دریایی CFR و انتقال دانش فنی راه‌اندازی خطوط صنعتی نو و کارکرده فعال در اتریش، آلمان و اتحادیه اروپا
          </p>
        </div>

        {/* Showcase Factory Banner */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 group">
          <img
            src="/assets/aistudio/f5830aad-fdc1-44ac-816f-05d2aa6aa690_632d8371.png"
            alt="واردات ماشین‌آلات صنعتی اروپا - نو و دست‌دوم - دفاتر: اتریش و تهران"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-101"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lines.map((line, idx) => {
            const IconComp = line.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-amber-400/80 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                      {line.capacity}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {line.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {line.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => onSelectCategoryForInquiry(line.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>استعلام قیمت خط کامل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-500">تحویل بنادر ایران</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner for Custom Production Lines */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">خط تولید خاصی در نظر دارید؟</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                تیم بازرگانی دفتر اتریش آماده بررسی اختصاصی فهرست خطوط تولید مازاد در کارخانجات آلمان، سوئیس و سراسر اروپا می‌باشد.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl whitespace-nowrap shadow-md shadow-amber-500/20 transition-all hover:scale-105"
          >
            سفارش استعلام خط تولید اختصاصی
          </a>
        </div>
      </div>
    </section>
  );
};
