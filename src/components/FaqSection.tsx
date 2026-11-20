import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowLeft } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'فرآیند خرید و حمل CFR تا بنادر ایران چقدر زمان می‌برد؟',
      a: 'معمولاً پس از عقد قرارداد و صدور پرفرما، فرآیند بازرسی و بارگیری در اروپا ۵ الی ۱۰ روز کاری زمان می‌برد. ترانزیت دریایی از بنادر هامبورگ، روتردام یا آنتورپ به بندر شهید رجایی (بندرعباس) بین ۲۲ الی ۳۴ روز دریایی است. مدارک اصلی پستی همزمان برای ترخیص‌کار شما ارسال می‌گردد.'
    },
    {
      q: 'سلامت فنی و ساعت کارکرد دستگاه‌های دست‌دوم اروپایی چگونه ارزیابی و تضمین می‌شود؟',
      a: 'کارشناسان مهندسی ما در دفاتر اتریش و آلمان شخصاً در محل کارخانه یا انبار فروشنده حاضر شده، ساعت کارکرد برد الکترونیکی اصلی (Spindle Hours) را چک می‌کنند، لقی محورها و سیستم هیدرولیک را تست کرده و فیلم کامل عملکرد با ذکر تاریخ و پلاک دستگاه برای شما ارسال می‌نمایند. همچنین امکان بازرسی رسمی توسط مؤسسات بازرسی بین‌المللی مانند TÜV اتریش یا SGS فراهم است.'
    },
    {
      q: 'آیا خریدار یا کارشناس فنی ایشان می‌تواند قبل از خرید، دستگاه را در اتریش یا آلمان ببیند؟',
      a: 'بله، صددرصد. European Machinery امکان هماهنگی بازدید حضوری شما در کارخانجات اتریش، آلمان و سوئیس را فراهم می‌کند و کارشناس بازرگانی ما در تمام طول بازدید و تست آزمایشی همراه شما خواهد بود.'
    },
    {
      q: 'شرایط تحویل CFR شامل چه مواردی است؟',
      a: 'شرایط CFR (Cost and Freight) مطابق قواعد اینکوترمز شامل هزینه کامل خرید دستگاه، دمونتاژ اصولی، بسته‌بندی پالت چوبی ضد رطوبت صادراتی، مهاربندی داخل کانتینر، بیمه حمل دریایی و کرایه حمل بین‌المللی کشتی تا تخلیه بر روی اسکله بنادر مقصد در ایران (بندرعباس، بوشهر و...) می‌باشد.'
    },
    {
      q: 'روش‌های پرداخت و تسویه حساب چگونه انجام می‌شود؟',
      a: 'پرداخت‌ها می‌تواند به صورت حواله مستقیم ارزی (یورو) به حساب شرکتی ما در اتریش یا از طریق سیستم بانکی رسمی، صرافی‌های معتبر و مورد تأیید بانک مرکزی و یا تسویه توافقی در دفتر تهران صورت پذیرد.'
    },
    {
      q: 'آیا برای ترخیص گمرکی و ثبت سفارش در سامانه EPL پشتیبانی ارائه می‌دهید؟',
      a: 'بله. ما کلیه اسناد موردنیاز گمرک شامل پیش‌فاکتور رسمی (Proforma)، پکینگ لیست تفکیکی، بارنامه دریایی و گواهی مبدأ (Certificate of Origin) اتاق بازرگانی اتریش یا آلمان را با کد تعرفه دقیق (HS Code) آماده می‌کنیم تا فرآیند اظهار در سامانه جامع تجارت و EPL بدون کوچک‌ترین ابهام انجام شود.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#090d14] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>پاسخ به ابهامات متداول</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            پرسش‌های متداول صنعتگران و خریداران
          </h2>
          <p className="text-slate-400 text-sm">
            تمام آنچه درباره فرآیند خرید، بازرسی در اروپا، پرداخت ارزی و ترخیص گمرکی باید بدانید
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span className="leading-snug">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-300' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-slate-900/40">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-900/70 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <span>سؤال دیگری دارید که در این لیست نبود؟</span>
          <a
            href="https://wa.me/989231505100"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>پاسخ مستقیم در واتساپ (۰۹۲۳۱۵۰۵۱۰۰)</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
