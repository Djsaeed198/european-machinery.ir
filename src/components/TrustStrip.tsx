import React from 'react';
import { Award, SearchCheck, Ship, BadgePercent } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      icon: Award,
      title: 'مشاوره تخصصی و رایگان خرید',
      desc: 'سنجش ارزش، قیمت‌گذاری و انتخاب اقتصادی‌ترین گزینه برای خط تولید'
    },
    {
      icon: SearchCheck,
      title: 'ارزیابی دقیق فنی در قلب اروپا',
      desc: 'تست مکانیکی، هیدرولیک، بردهای الکترونیکی و ساعت کارکرد واقعی'
    },
    {
      icon: Ship,
      title: 'تحویل رسمی CFR در بنادر ایران',
      desc: 'بسته‌بندی کانتینری استاندارد، بیمه حمل بین‌الملل و صدور بارنامه رسمی'
    },
    {
      icon: BadgePercent,
      title: 'خرید مستقیم با حذف واسطه‌ها',
      desc: 'خرید بی‌واسطه از کارخانجات اتریش، آلمان، مزایده‌های بزرگ و اوراقچیان صنعتی'
    }
  ];

  return (
    <section className="bg-[#101722] border-y border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-amber-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
