import React from 'react';
import { SearchCheck, Globe2, PackageCheck, Lightbulb, RefreshCw, Headphones } from 'lucide-react';

export const Competencies: React.FC = () => {
  const list = [
    {
      icon: SearchCheck,
      title: 'ارزیابی دقیق و تخصصی ماشین‌آلات',
      desc: 'بررسی همه‌جانبه سلامت قطعات مکانیکی، سیستم‌های هیدرولیکی، بردهای الکترونیکی زیمنس و هایدن‌هاین، و ثبت ساعت کارکرد واقعی در محل کارخانجات اروپایی پیش از انجام معامله.'
    },
    {
      icon: Globe2,
      title: 'بازاریابی حرفه‌ای در سطح اروپا و جهان',
      desc: 'دسترسی بی‌واسطه به شبکه گسترده کارخانجات صنعتی، مزایده‌های بزرگ ورشکستگی صنعتی (Insolvency Auctions) و انبارهای ماشین‌آلات مازاد در آلمان، اتریش و سوئیس.'
    },
    {
      icon: PackageCheck,
      title: 'مدیریت جامع پروژه از موجودی تا تحویل',
      desc: 'هدایت و اجرای صفر تا صد پروژه‌ها؛ از علامت‌گذاری کابل‌ها، دمونتاژ اصولی مهندسی، بسته‌بندی پالت چوبی صادراتی تا حمل ویژه کانتینری و تحویل به صورت CFR در بنادر مقصد.'
    },
    {
      icon: Lightbulb,
      title: 'دانش عمیق بازار تجهیزات صنعتی اروپا',
      desc: 'تسلط کامل بر استانداردهای ایمنی CE و DIN، برندهای مطرح اروپایی و سازوکارهای ارزش‌گذاری عادلانه دارایی‌های صنعتی متناسب با نیاز خط تولید و بودجه خریدار.'
    },
    {
      icon: RefreshCw,
      title: 'پشتیبانی مداوم برای بهینه‌سازی پارک ماشین‌آلات',
      desc: 'همراهی مداوم برای نوسازی ناوگان تولید کارخانجات، تعویض ماشین‌آلات فرسوده، بازاریابی و فروش تجهیزات مازاد مستعمل، و تأمین پایدار قطعات یدکی مصرفی و کمیاب.'
    },
    {
      icon: Headphones,
      title: 'مشاوره رایگان و مستقیم خرید',
      desc: 'مشاورین ارشد ما در دفاتر تهران و وین با دانش فنی روز آماده پاسخگویی تخصصی به سوالات فنی صنعتگران و ارائه تحلیل قیمت و توجیه اقتصادی تجهیزات هستند.'
    }
  ];

  return (
    <section id="competencies" className="py-20 bg-[#0e141d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <span>نقاط تمایز و شایستگی‌ها</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            شایستگی‌های اصلی مجموعه European Machinery
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            ارائه خدمات جامع و مهندسی‌شده در تمامی مراحل ارزیابی، بازاریابی و ورود دستگاه به چرخه خطوط تولید کشور
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
