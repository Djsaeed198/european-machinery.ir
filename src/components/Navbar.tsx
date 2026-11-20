import React, { useState, useEffect } from 'react';
import { Phone, ShieldCheck, Menu, X, Settings } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  pendingInquiriesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, pendingInquiriesCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0f14]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a href="#home" className="flex items-center shrink-0 group">
            <img
              src="/logo.png"
              alt="European Machinery"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-md transition-transform group-hover:scale-105"
            />
          </a>

          {/* Zone 2: Nav Links (4-5 single-line clean links) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#catalog" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              کاتالوگ ماشین‌آلات
            </a>
            <a href="#competencies" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              شایستگی‌های اصلی
            </a>
            <a href="#production-lines" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              خطوط کامل تولید
            </a>
            <a href="#customs" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              مراحل و اسناد گمرکی
            </a>
            <a href="#cfr-calc" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              محاسبه‌گر CFR
            </a>
            <a href="#contact" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              ارتباط با دفاتر
            </a>
          </nav>

          {/* Zone 3: Primary Action & Quick Call */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="tel:+989231505100"
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-amber-400 border border-slate-700 hover:border-amber-500/50 rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="ltr-num font-mono">09231505100</span>
            </a>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors whitespace-nowrap relative"
              title="پنل مدیریت آسان (استعلام‌ها و کاتالوگ)"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span>پنل مدیریت</span>
              {pendingInquiriesCount > 0 && (
                <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.2 rounded-full">
                  {pendingInquiriesCount}
                </span>
              )}
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md shadow-amber-500/25 transition-all hover:scale-105 whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>مشاوره و استعلام قیمت</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-300 hover:text-amber-400 bg-slate-800/80 rounded-lg"
              title="پنل مدیریت"
            >
              <Settings className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="منوی موبایل"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Off-canvas Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101722] border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-200 hover:text-amber-400 border-b border-white/5"
            >
              کاتالوگ ماشین‌آلات
            </a>
            <a
              href="#competencies"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-200 hover:text-amber-400 border-b border-white/5"
            >
              شایستگی‌های اصلی
            </a>
            <a
              href="#production-lines"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-200 hover:text-amber-400 border-b border-white/5"
            >
              خطوط کامل تولید
            </a>
            <a
              href="#customs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-200 hover:text-amber-400 border-b border-white/5"
            >
              مراحل و اسناد گمرکی
            </a>
            <a
              href="#cfr-calc"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-200 hover:text-amber-400 border-b border-white/5"
            >
              محاسبه‌گر حمل CFR
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-200 hover:text-amber-400 border-b border-white/5"
            >
              ارتباط با دفاتر وین و تهران
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="tel:+989231505100"
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800/80 rounded-lg"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>تماس مستقیم با کارشناس: </span>
              <span className="ltr-num font-mono">09231505100</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg"
            >
              مشاوره رایگان و ثبت استعلام
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
