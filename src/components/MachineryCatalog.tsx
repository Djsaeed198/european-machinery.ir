import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, ExternalLink, ShieldCheck, MapPin, Calendar, Layers, ChevronLeft } from 'lucide-react';
import { MachineItem } from '../types';

interface MachineryCatalogProps {
  machines: MachineItem[];
  onSelectMachine: (machine: MachineItem) => void;
  onRequestQuote: (machine: MachineItem) => void;
}

export const MachineryCatalog: React.FC<MachineryCatalogProps> = ({
  machines,
  onSelectMachine,
  onRequestQuote
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [selectedCondition, setSelectedCondition] = useState('همه');
  const [selectedCountry, setSelectedCountry] = useState('همه');

  const categories = [
    'همه',
    'تراش و فرز (CNC)',
    'پرس‌های هیدرولیک و مکانیکی',
    'برش لیزر و حکاکی',
    'ربات‌های صنعتی و اتوماسیون',
    'خطوط تولید و کارخانجات',
    'صنایع کارتن‌سازی و بسته‌بندی',
    'صنایع پلاستیک و چاپ',
    'کمپرسورهای هوا و گاز'
  ];

  const conditions = [
    'همه',
    'نو (New)',
    'استوک کارخانه‌ای (Factory Stock)',
    'دست‌دوم تمیز (Used/Inspected)'
  ];

  const countries = [
    'همه',
    'آلمان 🇩🇪',
    'اتریش 🇦🇹',
    'سوئیس 🇨🇭',
    'ایتالیا 🇮🇹'
  ];

  const filteredMachines = useMemo(() => {
    return machines.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'همه' || item.category === selectedCategory;

      const matchesCondition =
        selectedCondition === 'همه' || item.condition.includes(selectedCondition.replace(/ \(.*\)/, ''));

      const matchesCountry =
        selectedCountry === 'همه' || item.country.includes(selectedCountry.split(' ')[0]);

      return matchesSearch && matchesCategory && matchesCondition && matchesCountry;
    });
  }, [machines, searchTerm, selectedCategory, selectedCondition, selectedCountry]);

  return (
    <section id="catalog" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>کاتالوگ اختصاصی تجهیزات اروپایی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            جستجوی پیشرفته ماشین‌آلات صنعتی
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            امکان فیلتر بر اساس دسته‌بندی تخصصی، وضعیت دستگاه (نو، استوک یا دست‌دوم با برگه کارشناسی)، کشور مبدأ و مدل فنی
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-panel rounded-2xl p-6 mb-10 space-y-5">
          {/* Main search bar */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجوی مدل (مثلاً: DMG MORI، TRUMPF، پرس، اکسترودر، فرز، KUKA)..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pr-12 pl-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                پاک کردن
              </button>
            )}
          </div>

          {/* Filter Rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Category Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                دسته‌بندی تجهیزات
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                وضعیت دستگاه
              </label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
              >
                {conditions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Country Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                کشور مبدأ در اروپا
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Active Filters tags and count */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>
                تعداد ماشین‌آلات مطابق با فیلترها:{' '}
                <strong className="text-amber-400 font-bold tabular-nums">
                  {filteredMachines.length}
                </strong>{' '}
                دستگاه
              </span>
            </div>

            {(selectedCategory !== 'همه' || selectedCondition !== 'همه' || selectedCountry !== 'همه' || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory('همه');
                  setSelectedCondition('همه');
                  setSelectedCountry('همه');
                  setSearchTerm('');
                }}
                className="text-amber-400 hover:text-amber-300 font-medium hover:underline"
              >
                بازنشانی همه فیلترها
              </button>
            )}
          </div>
        </div>

        {/* Machinery Grid */}
        {filteredMachines.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center max-w-lg mx-auto">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">دستگاهی با این مشخصات یافت نشد</h3>
            <p className="text-slate-400 text-sm mb-6">
              می‌توانید فیلترها را تغییر دهید یا مستقیماً مدل مورد نظر خود را برای استعلام اختصاصی از کارخانجات اتریش و آلمان ارسال نمایید.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              استعلام اختصاصی مدل سفارشی
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMachines.map((machine) => (
              <div
                key={machine.id}
                className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Fallback */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                  <img
                    src={machine.image}
                    alt={machine.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Top Origin and Condition Pills */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-slate-900/90 border border-white/15 text-slate-200 backdrop-blur-md">
                      {machine.country} · {machine.city}
                    </span>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-md backdrop-blur-md border ${
                        machine.condition.includes('نو')
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30'
                          : machine.condition.includes('استوک')
                          ? 'bg-amber-950/80 text-amber-400 border-amber-500/30'
                          : 'bg-blue-950/80 text-blue-300 border-blue-500/30'
                      }`}
                    >
                      {machine.condition}
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-slate-300 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>مدل: {machine.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-amber-400 mb-1">
                      {machine.category}
                    </div>
                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {machine.title}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono mb-3 line-clamp-1 ltr-num">
                      {machine.model}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                      {machine.description}
                    </p>

                    {/* Quick Specs Snippets */}
                    <div className="bg-slate-900/60 rounded-xl p-3 border border-white/5 space-y-1.5 mb-4 text-[11px]">
                      {Object.entries(machine.specs).slice(0, 3).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center text-slate-300">
                          <span className="text-slate-400">{key}:</span>
                          <span className="font-semibold text-white ltr-num text-left">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div>
                    <div className="text-xs font-bold text-amber-400 mb-3 flex items-center justify-between">
                      <span>شرایط فروش:</span>
                      <span className="text-slate-200 font-normal">{machine.price}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() => onSelectMachine(machine)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <span>مشخصات فنی</span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onRequestQuote(machine)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-colors shadow-sm shadow-amber-500/20"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>استعلام CFR</span>
                      </button>
                    </div>

                    {/* WhatsApp Quick Link */}
                    <a
                      href={`https://wa.me/989231505100?text=${encodeURIComponent(
                        `سلام، در مورد استعلام قیمت و مشخصات دستگاه ${machine.title} (${machine.model}) تماس می‌گیرم.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                    >
                      <i className="fa-brands fa-whatsapp text-sm"></i>
                      <span>استعلام فوری در واتس‌اپ</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
