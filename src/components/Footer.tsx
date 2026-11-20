import React from 'react';
import { Phone, Mail, Globe, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#080c10] border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="European Machinery"
                className="h-12 w-auto object-contain drop-shadow-md"
              />
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              واردکننده مستقیم مدرن‌ترین ماشین‌آلات صنعتی نو و دست‌دوم از قلب اروپا و آمریکا. دفتر مرکزی در اتریش (وین) و دفتر هماهنگی در تهران. تحویل با شرایط CFR در بنادر ایران به همراه ارزیابی فنی در مبدأ و اسناد کامل ترخیص EPL.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500">
              <span>اتریش 🇦🇹</span>
              <span>·</span>
              <span>آلمان 🇩🇪</span>
              <span>·</span>
              <span>سوئیس 🇨🇭</span>
              <span>·</span>
              <span>ایتالیا 🇮🇹</span>
              <span>·</span>
              <span>ایران 🇮🇷</span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  کاتالوگ و جستجوی ماشین‌آلات
                </a>
              </li>
              <li>
                <a href="#competencies" className="hover:text-amber-400 transition-colors">
                  شایستگی‌های اصلی مجموعه
                </a>
              </li>
              <li>
                <a href="#production-lines" className="hover:text-amber-400 transition-colors">
                  خطوط کامل کارخانجات (تایر، لبنیات، کارتن)
                </a>
              </li>
              <li>
                <a href="#customs" className="hover:text-amber-400 transition-colors">
                  مراحل ترخیص، اسناد EPL و پرفورما
                </a>
              </li>
              <li>
                <a href="#cfr-calc" className="hover:text-amber-400 transition-colors">
                  محاسبه‌گر حمل دریایی CFR
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  مشاوره تخصصی و استعلام قیمت
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contacts (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-white text-sm mb-4">راه‌های ارتباط مستقیم</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span>تلفن و همراه ایران:</span>
                <span className="font-mono ltr-num text-slate-200">09231505100</span>
              </div>
              <div className="flex items-center justify-between">
                <span>همراه کارشناسان ایران:</span>
                <span className="font-mono ltr-num text-amber-400">09231505100 | 0919-7340829</span>
              </div>
              <div className="flex items-center justify-between">
                <span>دفتر اتریش (تماس و واتس‌اپ):</span>
                <span className="font-mono ltr-num text-white">0043-688-976-3257</span>
              </div>
              <div className="flex items-center justify-between">
                <span>دفتر اتریش (خط دوم):</span>
                <span className="font-mono ltr-num text-slate-300">0043-688-976-3256</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span>ایمیل مکاتبات:</span>
                <span className="font-mono ltr-num text-slate-200">Europa.Machinery@Gmail.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span>وب‌سایت رسمی:</span>
                <span className="font-mono ltr-num text-amber-400">www.european-machinery.ir</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © کلیه حقوق مادی و معنوی برای شرکت بازرگانی European Machinery محفوظ است.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">با ما، صنعت خود را جهانی کنید 🌍⚙️</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-600 hover:text-amber-400 transition-colors underline"
            >
              پنل مدیریت
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
