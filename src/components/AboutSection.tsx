import React from 'react';
import { CheckCircle2, ShieldCheck, Award, Building2, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0e141d] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 group">
              <img
                src="/assets/aistudio/20_____________________________f615628d.png"
                alt="۲۰ سال تجربه واردات ماشین آلات صنعتی European Machinery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-amber-400 tabular-nums">
                    +۲۰
                  </div>
                  <div>
                    <strong className="block text-xs sm:text-sm text-white font-bold">
                      سال سابقه تجارت بین‌الملل و واردات
                    </strong>
                    <span className="text-[11px] text-slate-300">
                      تضمین ۱۰۰٪ اصالت و کارشناسی فنی ماشین‌آلات در اروپا
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <span>درباره European Machinery (یوروپین ماشینری)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-snug">
              متخصص اروپایی تجهیزات صنعتی <br />
              <span className="text-gradient-amber">مستعمل، استوک و نو</span>
            </h2>

            <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                مجموعه <strong>European Machinery</strong> یک شرکت پیشرو در زمینه واردات و فروش انواع دستگاه‌های صنعتی نو، استوک و دست‌دوم و همچنین انواع قطعات و تجهیزات صنعتی از مبدأ اروپا است. ما به‌عنوان یک <em>ارائه‌دهنده خدمات کامل (Full-Service Provider)</em>، شریک قابل‌اعتماد شما برای <strong>ارزیابی، بازاریابی، خرید و بازیافت ماشین‌آلات مستعمل، کارخانه‌های صنعتی و دارایی‌ها</strong> در آلمان، اتریش، سراسر اروپا و جهان هستیم.
              </p>
              <p>
                با بیش از ۲۰ سال تجربه مستمر، مجموعه European Machinery از صنایع گوناگونی همچون <strong>فرآوری فلز، پردازش پلاستیک، چاپ و بسته‌بندی، کارتن‌سازی و خطوط تولید کامل</strong> در زمینه خرید، فروش و بازاریابی حرفه‌ای ماشین‌ابزارهای مستعمل و خطوط پیشرفته CNC پشتیبانی می‌کند.
              </p>
            </div>

            {/* Verification Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'دفتر رسمی در وین اتریش و تهران',
                'عضویت در شبکه‌های سورسینگ صنعتی اروپا',
                'امکان بازرسی فیزیکی قبل از تسویه',
                'ارائه کلیه اسناد گمرکی معتبر و EPL',
                'تضمین ساعت کارکرد واقعی در اروپا',
                'پشتیبانی تأمین قطعات یدکی خاص'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all shadow-md shadow-amber-500/20"
              >
                <span>درخواست مشاوره خرید و ارزیابی</span>
              </a>

              <a
                href="tel:+989231505100"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-700 rounded-xl transition-colors"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>تماس مستقیم با کارشناس ارشد (۰۹۲۳۱۵۰۵۱۰۰)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Vienna-Tehran Panoramic Bridge Banner */}
        <div className="mt-14 glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
          <div className="relative aspect-[21/7] sm:aspect-[21/6] w-full bg-slate-950 overflow-hidden">
            <img
              src="/assets/aistudio/Whisk_2f7e90bc4a_67f82608.jpg"
              alt="دفتر مرکزی در اتریش و دفتر تهران European Machinery"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 max-w-xl text-right">
              <span className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-black inline-block mb-2 shadow-md">
                🇦🇹 دفتر اتریش (وین) · 🇮🇷 دفتر تهران
              </span>
              <h3 className="text-base sm:text-xl font-black text-white drop-shadow-md">
                پل ارتباطی صنعتگران ایران با بزرگترین کارخانجات و حراجی‌های اروپا
              </h3>
            </div>
          </div>
        </div>

        {/* Global Sourcing Network Map Banner */}
        <div className="mt-8 glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-6 sm:p-8 bg-slate-900/60">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                <span>The European Machinery Group · Trusted Partner</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                شبکه جهانی تأمین، کارشناسی و لجستیک ماشین‌آلات صنعتی
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                زنجیره یکپارچه از کارخانجات صنعتی آلمان، اتریش، ایتالیا و فرانسه تا تحویل رسمی بنادر مقصد
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              <span>استعلام دستگاه از اروپا</span>
            </a>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-950 shadow-inner group">
            <img
              src="/assets/aistudio/Whisk_bd0bb1fe75_478c47fb.jpg"
              alt="نقشه سورسینگ بین‌المللی و شبکه جهانی European Machinery"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-102"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
