import React from 'react';

export const LogoCloud: React.FC = () => {
  const brands = [
    { name: 'DMG MORI', country: 'آلمان / ژاپن', type: 'تراش و فرز ۵ محور' },
    { name: 'TRUMPF', country: 'آلمان', type: 'برش لیزر و پرس برک' },
    { name: 'KUKA', country: 'آلمان', type: 'رباتیک و اتوماسیون' },
    { name: 'SCHULER', country: 'آلمان', type: 'پرس‌های هیدرولیک سنگین' },
    { name: 'ENGEL', country: 'اتریش', type: 'تزریق پلاستیک الکتریک' },
    { name: 'BHS CORRUGATED', country: 'آلمان', type: 'خطوط ورق و کارتن‌سازی' },
    { name: 'ATLAS COPCO', country: 'سوئد / آلمان', type: 'کمپرسورهای فشارقوی' },
    { name: 'WEILER', country: 'آلمان', type: 'تراش‌های صنعتی سنگین' },
    { name: 'BYSTRONIC', country: 'سوئیس', type: 'برش لیزر و فرم‌دهی ورق' },
    { name: 'GEA NIRO', country: 'آلمان / سوئیس', type: 'خطوط فرآوری و شیرخشک' },
  ];

  return (
    <section className="py-12 bg-[#090d13] border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-xs font-semibold text-slate-400 tracking-wider">
            همکاری و سورسینگ بی‌واسطه از برترین برندهای ماشین‌ابزار و کارخانجات اتحادیه اروپا
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {brands.map((b) => (
            <div
              key={b.name}
              className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5 hover:border-amber-500/30 hover:bg-slate-800/50 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <strong className="text-sm sm:text-base font-black text-slate-300 group-hover:text-amber-400 font-mono tracking-wider transition-colors">
                {b.name}
              </strong>
              <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                <span>{b.country}</span>
                <span>·</span>
                <span>{b.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
