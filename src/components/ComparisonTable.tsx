import React from 'react';
import { Check, X, ShieldCheck, ArrowLeft } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const rows = [
    {
      feature: 'نحوه قیمت‌گذاری و شفافیت مالی',
      em: 'خرید مستقیم از کارخانه و مزایده‌های اروپا بدون واسطه',
      others: 'افزودن ۱۵ تا ۲۵ درصد کارمزد چندلایه دلالان محلی',
      emPositive: true
    },
    {
      feature: 'بازرسی فنی قبل از تسویه (Inspection)',
      em: 'تست مکانیکی و خطای هندسی در محل اروپا + فیلم تست روز',
      others: 'خرید ندیده بر اساس چند عکس تلگرامی نامشخص',
      emPositive: true
    },
    {
      feature: 'اسناد گمرکی و اظهار در EPL',
      em: 'پرفورمای رسمی، گواهی مبدأ اتاق بازرگانی اتریش/آلمان و بارنامه معتبر',
      others: 'فاکتورهای صوری، نقص مدارک و ماندگاری طولانی در گمرک',
      emPositive: true
    },
    {
      feature: 'شرایط حمل بین‌المللی (Logistics)',
      em: 'تحویل CFR بنادر ایران با مهاربندی تخصصی و کانتینربندی ایمن',
      others: 'واگذاری حمل به خطوط نامعتبر با ریسک آسیب فیزیکی به دستگاه',
      emPositive: true
    },
    {
      feature: 'دفتر مستقر در قلب اروپا',
      em: 'دفتر رسمی فعال در وین اتریش با سابقه بیش از ۱۵ سال',
      others: 'واسطه‌های موقت بدون دفتر ثبتی و قانونی در اروپا',
      emPositive: true
    },
    {
      feature: 'تأمین قطعات یدکی و پشتیبانی فنی',
      em: 'تأمین بردهای اصلی زیمنس/هایدن‌هاین و قطعات مصرفی',
      others: 'قطع ارتباط و عدم پاسخگویی به محض دریافت وجه',
      emPositive: true
    }
  ];

  return (
    <section className="py-20 bg-[#0b0f14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <span>تفاوت ما با بازار سنتی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            چرا European Machinery؟
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            مقایسه شفاف خدمات بازرگانی مستقیم دفتر وین و تهران با واسطه‌های متفرقه
          </p>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900/90 border-b border-white/10">
                  <th className="p-4 sm:p-5 font-bold text-white w-1/3">معیار ارزیابی</th>
                  <th className="p-4 sm:p-5 font-bold text-amber-400 w-1/3 bg-amber-500/10 border-x border-amber-500/20">
                    شرکت European Machinery (اتریش · ایران)
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-slate-400 w-1/3">واسطه‌ها و دلالان متفرقه</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-900/60'}>
                    <td className="p-4 sm:p-5 font-semibold text-slate-300">
                      {row.feature}
                    </td>

                    <td className="p-4 sm:p-5 bg-amber-500/5 border-x border-amber-500/20">
                      <div className="flex items-start gap-2 text-slate-100 font-medium">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span>{row.em}</span>
                      </div>
                    </td>

                    <td className="p-4 sm:p-5 text-slate-400">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5" />
                        </span>
                        <span>{row.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bilateral Trade Banner */}
        <div className="mt-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 group">
          <img
            src="/assets/aistudio/dbfdeb88-d106-4ca9-849a-81b8671ef8f2_b5f840e4.png"
            alt="مجموعه European Machinery - واردات مستقیم ماشین‌آلات صنعتی از اروپا به ایران - اتریش به تهران"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-101"
          />
        </div>
      </div>
    </section>
  );
};
