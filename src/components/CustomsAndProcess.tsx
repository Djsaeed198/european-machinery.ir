import React from 'react';
import { FileCheck, FileSpreadsheet, Ship, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export const CustomsAndProcess: React.FC = () => {
  const steps = [
    {
      num: '۰۱',
      title: 'ارسال مشخصات یا فکس مکتوب',
      desc: 'نوع، مدل، تناژ و مشخصات فنی ماشین‌آلات یا خط تولید مدنظر خود را از طریق فرم سایت یا فکس ارسال فرمایید.'
    },
    {
      num: '۰۲',
      title: 'ارزیابی فنی در کارخانجات اروپا',
      desc: 'کارشناسان دفاتر اتریش و آلمان ضمن بررسی سلامت دستگاه، فیلم‌برداری و تست عملکرد، گزارش کارشناسی تهیه می‌نمایند.'
    },
    {
      num: '۰۳',
      title: 'صدور پیش‌فاکتور رسمی (پرفورما)',
      desc: 'پرفورمای معتبر با ذکر کلیه مشخصات فنی، کد تعرفه گمرکی (HS Code) و شرایط تحویل CFR در بنادر مقصد صادر می‌گردد.'
    },
    {
      num: '۰۴',
      title: 'حمل دریایی و ترخیص در EPL',
      desc: 'بارگیری در کانتینرهای ایمن، صدور بارنامه دریایی و گواهی مبدأ و ارسال اسناد جهت ثبت اظهار در سامانه گمرکی EPL.'
    }
  ];

  const documents = [
    {
      title: 'پیش‌فاکتور رسمی (Proforma Invoice) و پکینگ لیست تفکیکی',
      detail: 'حاوی شماره سریال موتورها، ابعاد کانتینری و تفکیک اجزا جهت ثبت سفارش وزارت صمت.'
    },
    {
      title: 'گواهی مبدأ معتبر (Certificate of Origin)',
      detail: 'صادرشده از اتاق بازرگانی اتریش (WKO) یا آلمان (DIHK) جهت اثبات اصالت اروپایی دستگاه.'
    },
    {
      title: 'بارنامه رسمی کشتیرانی بین‌المللی (Bill of Lading)',
      detail: 'با شرایط حمل CFR بنادر جنوبی کشور (بندرعباس، بوشهر، خرمشهر، چابهار).'
    },
    {
      title: 'گزارش ارزیابی فنی و بازرسی استاندارد (Inspection Certificate)',
      detail: 'مستندات کنترل سلامت قطعات، عدم انحراف شفت و عملکرد هیدرولیک و الکتریک.'
    },
    {
      title: 'کاتالوگ و دفترچه‌های فنی به همراه اسناد ثبت EPL',
      detail: 'جهت تسهیل ترخیص در گمرکات کشور و انطباق با پروانه بهره‌برداری کارخانه خریدار.'
    }
  ];

  return (
    <section id="customs" className="py-20 bg-[#0e141d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <span>مسیر مطمئن و قانونی واردات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            فرآیند گام‌به‌گام خرید و اظهار گمرکی
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            از اولین تماس تا تحویل فیزیکی دستگاه در بنادر ایران؛ شفافیت کامل در اسناد بازرگانی و هماهنگی گمرکی
          </p>
        </div>

        {/* 4 Steps Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-amber-500/40 transition-colors"
            >
              <div className="text-4xl font-black text-amber-400/20 mb-3 tabular-nums group-hover:text-amber-400/40 transition-colors">
                {s.num}
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {s.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Customs Documents Accordion / Showcase Box */}
        <div className="glass-panel p-8 rounded-2xl border border-white/10 bg-slate-900/60">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                اسناد و مدارک بازرگانی تأمین‌شده توسط European Machinery
              </h3>
              <p className="text-xs text-slate-400">
                کلیه مدارک مطابق با استانداردهای گمرک جمهوری اسلامی ایران و سامانه جامع تجارت آماده‌سازی می‌گردد
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-white/5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200 mb-1">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {doc.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice */}
          <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-xs text-slate-300">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              نکته بازرگانی: تمامی اسناد قبل از ارسال اصل پستی، به صورت فایل PDF با کیفیت جهت هماهنگی با ترخیص‌کار و کارشناس ثبت سفارش به خریدار تقدیم می‌شود.
            </span>
          </div>
        </div>

        {/* Visual Workflow Poster */}
        <div className="mt-12 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-bold text-amber-400 block mb-1">
              پوستر راهنمای تصویری مراحل خرید و ترخیص
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white">
              نحوه همکاری با European Machinery در یک نگاه
            </h3>
          </div>
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 group">
            <img
              src="/assets/aistudio/photo_2026-01-09_12-18-41_fa44e0ce.jpg"
              alt="پوستر نحوه همکاری با European Machinery و ادامه فرآیند واردات"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-101"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
