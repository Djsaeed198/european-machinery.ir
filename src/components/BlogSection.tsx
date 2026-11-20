import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowLeft, X, Share2, CheckCircle2 } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<null | typeof articles[0]>(null);

  const articles = [
    {
      id: 1,
      tag: 'راهنمای خرید CNC',
      title: '۵ نکته حیاتی در ارزیابی و خرید دستگاه CNC دست‌دوم اروپایی',
      summary: 'چگونه ساعت کارکرد واقعی، میزان لقی محورها (Backlash) و سلامت اسپیندل را در کارخانجات آلمان و اتریش قبل از معامله تست کنیم؟',
      readTime: '۵ دقیقه مطالعه',
      date: 'آبان ۱۴۰۵',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      content: `
        خرید ماشین‌آلات CNC کارکرده اروپایی یکی از هوشمندانه‌ترین راه‌های کاهش هزینه‌های سرمایه‌گذاری برای واحدهای تولیدی است، به شرطی که ارزیابی فنی دقیق صورت گیرد. در این مقاله به ۵ شاخص کلیدی می‌پردازیم:
        
        ۱. بررسی سلامت هندسی و تست بال‌بار (Ballbar Test):
        صرف روشن شدن دستگاه تضمین‌کننده دقت آن نیست. باید انحراف خطی و خطای دایره‌ای محورهای X، Y و Z با ابزار کالیبراسیون سنجیده شود تا از عدم وجود لرزش در بستر ریخته‌گری اطمینان حاصل گردد.

        ۲. تفکیک ساعت برق از ساعت کارکرد اسپیندل (Spindle Hours):
        بسیاری از واسطه‌ها ساعت روشن بودن کنترلر (Power-on Hours) را به عنوان کارکرد اعلام می‌کنند، در حالی که پارامتر حیاتی ساعت کار واقعی اسپیندل و تراشکاری است.

        ۳. اصالت سیستم کنترل (Heidenhain یا Siemens):
        بررسی نسخه نرم‌افزار، سلامت بردهای درایو و عدم دستکاری در کدهای PLC ضامن پایداری سیستم در کارکرد ۳ شیفت است.

        ۴. وضعیت ریل‌های راهنما (Linear Guides) و بال‌اسکرو:
        گریس‌کاری و سیستم روغن‌کاری مرکزی اتوماتیک باید تمیز و بدون رسوب براده باشد تا از سایش زودرس جلوگیری شود.

        ۵. استعلام تاریخچه سرویس در اروپا:
        دستگاه‌هایی که در کارخانجات صنعتی آلمان و اتریش تحت قرارداد سرویس سالانه خودروسازی‌ها بوده‌اند، از نظر سلامت مکانیکی در بالاترین سطح قرار دارند.
      `
    },
    {
      id: 2,
      tag: 'مقایسه فنی پرس‌ها',
      title: 'تفاوت پرس هیدرولیک و مکانیکی؛ کدام گزینه برای خط تولید شما اقتصادی‌تر است؟',
      summary: 'تحلیل جامع سرعت کورس، کنترل فشار در طول مسیر، هزینه‌های نگهداری و تناسب هر پرس با کشش عمیق یا سمبه‌ماتریس قطعات فلزی.',
      readTime: '۶ دقیقه مطالعه',
      date: 'مهر ۱۴۰۵',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      content: `
        یکی از رایج‌ترین سوالات صنعتگران قطعه‌سازی، انتخاب میان پرس‌های هیدرولیک سنگین (مانند Schuler یا Müller) و پرس‌های مکانیکی لنگ است:
        
        • پرس‌های هیدرولیک (Hydraulic Presses):
        برای قطعاتی که نیاز به کشش عمیق (Deep Drawing)، فشار ثابت در تمام طول کورس و شکل‌دهی ورق‌های فولادی ضخیم دارند، پرس‌های هیدرولیک گزینه‌ای بی‌رقیب هستند. قابلیت تنظیم دقیق سرعت و تناژ در هر میلی‌متر از کورس، کیفیت نهایی قطعه را تضمین می‌کند.

        • پرس‌های مکانیکی (Mechanical Crank Presses):
        سرعت ضربه بسیار بالاتری دارند و برای عملیات برش، سوراخ‌کاری، سمبه‌ماتریس سریع و تیراژهای میلیونی ایده‌آل هستند، هرچند حداکثر تناژ فقط در انتهای کورس اعمال می‌شود.

        نتیجه‌گیری بازرگانی:
        برای پروژه‌های چندمنظوره و قالب‌سازی با تنوع ابعاد، پرس‌های هیدرولیک انعطاف‌پذیری بسیار بیشتری ارائه می‌دهند.
      `
    },
    {
      id: 3,
      tag: 'قوانین گمرک و EPL',
      title: 'راهنمای گام‌به‌گام ثبت سفارش و ترخیص ماشین‌آلات صنعتی در سامانه EPL',
      summary: 'مدارک الزامی اظهار گمرکی، ثبت پرفرما در سامانه جامع تجارت، معافیت‌های گمرکی بند «غ» برای خطوط تولید و نقش بارنامه معتبر دریایی.',
      readTime: '۷ دقیقه مطالعه',
      date: 'شهریور ۱۴۰۵',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      content: `
        فرآیند ترخیص ماشین‌آلات صنعتی بدون داشتن اسناد معتبر می‌تواند هزینه‌های دموراژ سنگینی به همراه داشته باشد:
        
        ۱. تطبیق شماره تعرفه (HS Code) در پیش‌فاکتور:
        پرفورمای صادرشده از دفتر اتریش با ذکر دقیق کد تعرفه و شرح تفکیکی قطعات مانع از مغایرت در اظهار سامانه EPL می‌شود.

        ۲. معافیت حقوق ورودی ماشین‌آلات خط تولید:
        بر اساس قوانین گمرکی، واحدهای دارای پروانه بهره‌برداری یا جواز تأسیس در صنایع تولیدی می‌توانند از معافیت حقوق گمرکی ماشین‌آلات نو و کارکرده مجاز بهره‌مند شوند.

        ۳. اهمیت گواهی مبدأ (Certificate of Origin):
        گواهی صادرشده از اتاق بازرگانی وین (WKO) یا اتاق بازرگانی آلمان (DIHK) سند قانونی اصالت کالاست که مأموران ارزیاب گمرک به آن استناد می‌کنند.

        European Machinery کلیه مدارک را پیش از بارگیری به فرمت استاندارد گمرک تطبیق می‌دهد.
      `
    },
    {
      id: 4,
      tag: 'سنجش GEO و بخشنامه‌های اروپا',
      title: 'شاخص‌های سنجش GEO و به‌روزرسانی مستمر استانداردهای ترانزیت اتریش و آلمان',
      summary: 'تحلیل نرخ ارجاع هوش مصنوعی (AI Citation Rate)، انطباق بخشنامه‌های هر ۳ ماه یک‌بار اتاق بازرگانی وین، و ساختار موضوعی خوشه‌ای (Topical Cluster).',
      readTime: '۵ دقیقه مطالعه',
      date: 'آبان ۱۴۰۵ (به‌روزرسانی دوره‌ای)',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      content: `
        در دنیای نوین موتورهای جستجوی مبتنی بر هوش مصنوعی (مانند Perplexity و ChatGPT)، استعلام خریداران صنعتی از مسیر پاسخ‌های تحلیلی می‌گذرد:
        
        ۱. نرخ ارجاع هوش مصنوعی (AI Citation Rate):
        معیار سنجش معرفی European Machinery در پاسخ به سوالات مدیران کارخانجات درباره خرید مستقیم CNC و پرس از اتریش. ثبت داده‌های ساخت‌یافته و فایل استاندارد llms.txt ضامن ارجاع معتبر است.

        ۲. به‌روزرسانی دوره‌ای بخشنامه‌ها (هر ۳ ماه یک‌بار):
        تغییرات عوارض بندری بنادر روتردام و هامبورگ، تعرفه‌های کشتیرانی کانتینری و بخشنامه‌های ترخیص گمرکی هر فصل پایش و در محاسبات لحاظ می‌گردد.

        ۳. ساختار موضوعی خوشه‌ای (Topical Cluster):
        پیوند عمیق میان مشخصات فنی کاتالوگ، استانداردهای بازرسی در مبدأ TÜV/SGS، محاسبه‌گر هزینه‌های CFR و مشاوره تلفنی مستقیم (۰۹۲۳۱۵۰۵۱۰۰) بالاترین نرخ تبدیل کلیک به لید را به ارمغان می‌آورد.
      `
    }
  ];

  return (
    <section id="blog" className="py-20 bg-[#0b0f14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>دانش فنی و بازرگانی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            راهنمای تخصصی خرید و واردات ماشین‌آلات
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            مجموعه مقالات و تجربیات بازرگانی بین‌الملل برای توانمندسازی مدیران صنایع ایران
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((art) => (
            <article
              key={art.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-amber-500/90 text-slate-950 backdrop-blur-md">
                      {art.tag}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {art.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setActiveArticle(art)}
                  className="w-full py-2.5 px-4 text-xs font-bold text-amber-400 hover:text-slate-950 hover:bg-amber-400 rounded-xl transition-all border border-amber-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>مطالعه کامل راهنما</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div 
            className="glass-panel w-full max-w-2xl rounded-2xl overflow-hidden border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="px-2.5 py-1 text-xs font-bold rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {activeArticle.tag}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mb-4 leading-snug">
              {activeArticle.title}
            </h2>

            <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-slate-950">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-4 whitespace-pre-line bg-slate-900/60 p-5 rounded-xl border border-white/5">
              {activeArticle.content}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                نگارش و تنظیم: دپارتمان فنی European Machinery
              </span>

              <a
                href="#contact"
                onClick={() => setActiveArticle(null)}
                className="btn-primary text-xs font-bold py-2 px-4 cursor-pointer"
              >
                مشاوره درباره این موضوع
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
