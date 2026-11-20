import React, { useState } from 'react';
import { Calculator, AlertTriangle, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ImportCostCalculatorProps {
  onRequestProforma: (infoText: string) => void;
}

export const ImportCostCalculator: React.FC<ImportCostCalculatorProps> = ({ onRequestProforma }) => {
  const [euroPrice, setEuroPrice] = useState<number>(85000);
  const [exchangeRate, setExchangeRate] = useState<number>(72000);
  const [dutyRate, setDutyRate] = useState<number>(0.30);
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  // Math
  const baseToman = (euroPrice || 0) * (exchangeRate || 0);
  const shippingAndInsuranceToman = baseToman * 0.20;
  const customsDutyToman = baseToman * dutyRate;
  const estimatedTotalToman = baseToman + shippingAndInsuranceToman + customsDutyToman;

  const fmt = (n: number) => n.toLocaleString('fa-IR') + ' تومان';
  const fmtEuro = (n: number) => n.toLocaleString('fa-IR') + ' یورو';

  return (
    <section id="calculator" className="py-20 bg-[#090d14] border-t border-white/5 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>ابزار تعاملی هوشمند</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            ماشین‌حساب تخمین هزینه واردات
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            برآورد سریع و شفاف ارزش ریالی دستگاه، هزینه‌های حمل دریایی، بیمه و عوارض تخمینی گمرکی
          </p>
        </div>

        <div className="calc-wrap">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                قیمت دستگاه در اروپا (یورو €)
              </label>
              <input
                type="number"
                min="0"
                step="5000"
                value={euroPrice || ''}
                onChange={(e) => {
                  setEuroPrice(Number(e.target.value));
                  setHasCalculated(true);
                }}
                placeholder="مثلاً 85000"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-mono text-left"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                نرخ تخمینی حواله یورو (تومان)
              </label>
              <input
                type="number"
                min="0"
                step="500"
                value={exchangeRate || ''}
                onChange={(e) => {
                  setExchangeRate(Number(e.target.value));
                  setHasCalculated(true);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-mono text-left"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                نوع تجهیزات (جهت اعمال نرخ تقریبی حقوق گمرکی)
              </label>
              <select
                value={dutyRate}
                onChange={(e) => {
                  setDutyRate(Number(e.target.value));
                  setHasCalculated(true);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value={0.30}>دستگاه‌های تراش و فرز CNC (تقریباً ۳۰٪)</option>
                <option value={0.25}>پرس‌های هیدرولیک و قالب‌سازی (تقریباً ۲۵٪)</option>
                <option value={0.20}>ربات‌های صنعتی و اتوماسیون (تقریباً ۲۰٪)</option>
                <option value={0.15}>کمپرسورها و پمپ‌های صنعتی (تقریباً ۱۵٪)</option>
                <option value={0.20}>خطوط کامل تولید کارخانجات (تقریباً ۲۰٪ معافیت تولیدی)</option>
              </select>
            </div>
          </div>

          {/* Results Output */}
          <div className="calc-result">
            <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ریز برآورد مالی واردات:</span>
            </h3>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="calc-line">
                <span>قیمت پایه خرید در اروپا:</span>
                <strong className="text-white font-mono ltr-num">{fmtEuro(euroPrice)}</strong>
              </div>

              <div className="calc-line">
                <span>معادل ریالی در مبدأ:</span>
                <strong className="text-slate-300 font-mono ltr-num">{fmt(baseToman)}</strong>
              </div>

              <div className="calc-line">
                <span>حمل دریایی، کانتینربندی و بیمه (~۲۰٪):</span>
                <strong className="text-slate-300 font-mono ltr-num">{fmt(shippingAndInsuranceToman)}</strong>
              </div>

              <div className="calc-line">
                <span>عوارض و حقوق ورودی گمرک:</span>
                <strong className="text-slate-300 font-mono ltr-num">{fmt(customsDutyToman)}</strong>
              </div>

              <div className="calc-line total pt-3 border-t border-amber-500/30">
                <span className="font-bold text-white text-sm">تخمین کل سرمایه‌گذاری (CFR + ترخیص):</span>
                <strong className="text-lg sm:text-xl font-black text-amber-400 font-mono ltr-num">
                  {fmt(estimatedTotalToman)}
                </strong>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-4 text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-white/5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                این ارقام برآوردی اولیه است. نرخ دقیق بر اساس پروفرما رسمی، وزن دقیق کانتینر و تعرفه EPL تعیین می‌گردد.
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onRequestProforma(
                  `استعلام پیش‌فاکتور با ماشین‌حساب: قیمت اروپا ${euroPrice} یورو - برآورد نهایی: ${fmt(estimatedTotalToman)}`
                );
              }}
              className="btn-primary full mt-4 text-xs font-bold py-3 cursor-pointer"
            >
              <span>دریافت پیش‌فاکتور رسمی و دقیق (Proforma)</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
