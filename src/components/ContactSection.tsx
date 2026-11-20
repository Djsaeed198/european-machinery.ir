import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, Globe, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { MachineItem } from '../types';

interface ContactSectionProps {
  prefilledMachine?: MachineItem | null;
  prefilledCategory?: string | null;
  onInquirySubmitted?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledMachine,
  prefilledCategory,
  onInquirySubmitted
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceType, setServiceType] = useState('خرید ماشین‌آلات صنعتی نو یا دست‌دوم');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({
    type: null,
    msg: ''
  });

  useEffect(() => {
    if (prefilledMachine) {
      setCategory(prefilledMachine.category);
      setMessage(
        `درخواست استعلام قیمت و پیش‌فاکتور (CFR) برای دستگاه ${prefilledMachine.title} (مدل: ${prefilledMachine.model} - کد: ${prefilledMachine.id})`
      );
    } else if (prefilledCategory) {
      setCategory(prefilledCategory);
      setMessage(`درخواست مشاوره و استعلام قیمت کامل برای "${prefilledCategory}"`);
    }
  }, [prefilledMachine, prefilledCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setStatus({
        type: 'error',
        msg: 'لطفاً نام و نام خانوادگی و شماره تماس مستقیم خود را وارد فرمایید.'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, msg: '' });

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          company,
          serviceType,
          category,
          machineId: prefilledMachine?.id,
          machineTitle: prefilledMachine ? `${prefilledMachine.title} (${prefilledMachine.model})` : undefined,
          message
        })
      });

      const data = await res.json();

      if (data.ok) {
        setStatus({
          type: 'success',
          msg: data.message || 'درخواست استعلام شما با موفقیت ثبت گردید. کارشناسان دفاتر تهران و اتریش در اسرع وقت با شما تماس خواهند گرفت.'
        });
        setName('');
        setPhone('');
        setEmail('');
        setCompany('');
        setMessage('');
        if (onInquirySubmitted) onInquirySubmitted();
      } else {
        throw new Error(data.error || 'خطایی در ثبت فرم رخ داد.');
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        msg: 'ارتباط با سرور برقرار نشد. لطفاً از طریق شماره‌های دفتر یا واتس‌اپ اتریش با ما تماس حاصل فرمایید.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0b0f14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <span>مشاوره تخصصی و رایگان</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            استعلام قیمت، سفارش و راه‌های ارتباطی
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            کارشناسان بازرگانی و فنی ما در دفاتر تهران و اتریش در کوتاه‌ترین زمان آماده پاسخگویی و ارائه پیش‌فاکتور رسمی هستند
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">
              فرم آنلاین استعلام ماشین‌آلات و خطوط تولید
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              جهت تسریع در پاسخگویی، مشخصات دستگاه یا کارخانه مدنظر خود را ثبت فرمایید.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    نام و نام خانوادگی / مسئول خرید *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثلاً: مهندس احمدی"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    شماره تماس مستقیم (موبایل / ثابت) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۲... یا ۰۲۱..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    نام شرکت، کارخانه یا کارگاه
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="نام واحد صنعتی شما"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    آدرس ایمیل
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@company.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    نوع خدمت مورد تقاضا
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="خرید ماشین‌آلات صنعتی نو یا دست‌دوم">خرید ماشین‌آلات صنعتی نو یا دست‌دوم</option>
                    <option value="خرید خط تولید کامل کارخانجات">خرید خط تولید کامل کارخانجات</option>
                    <option value="بازاریابی و فروش ماشین‌آلات مازاد">فروش و بازاریابی ماشین‌آلات مازاد کارخانه</option>
                    <option value="ارزیابی و بهینه‌سازی پارک ماشین‌آلات">ارزیابی فنی و بهینه‌سازی پارک ماشین‌آلات</option>
                    <option value="تأمین قطعات و تجهیزات صنعتی">تأمین قطعات یدکی خاص و مصرفی</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    دسته‌بندی یا نام دستگاه
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="مثلاً: فرز ۵ محور، پرس، خط کارتن، خط تایر..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  مشخصات فنی درخواستی، ظرفیت، سال ساخت یا توضیحات تکمیلی
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="مشخصات دستگاه مدنظر، برند آلمانی/اتریشی، بودجه تخمینی، بندر مقصد یا سوالات فنی..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              {/* Status Alert */}
              {status.type && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 text-xs leading-relaxed ${
                    status.type === 'success'
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/60 border border-red-500/40 text-red-300'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                  <span>{status.msg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>در حال ارسال استعلام...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ارسال درخواست استعلام و دریافت پیش‌فاکتور</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Iran Office Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🇮🇷</span>
                <div>
                  <h4 className="font-bold text-white text-base">دفتر هماهنگی و بازرگانی تهران</h4>
                  <small className="text-xs text-slate-400">مشاوره حضوری، هماهنگی ارزی و عقد قرارداد</small>
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">تلفن و همراه دفتر تهران:</span>
                  <div className="flex flex-col items-end gap-1 font-mono ltr-num">
                    <a href="tel:+989231505100" className="hover:text-amber-400 transition-colors text-amber-400 font-bold">
                      09231505100
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">شماره‌های همراه کارشناسان:</span>
                  <div className="flex flex-col items-end gap-1 font-mono ltr-num text-amber-400">
                    <a href="tel:+989231505100" className="hover:underline">
                      09231505100
                    </a>
                    <a href="tel:+989197340829" className="hover:underline">
                      0919-7340829
                    </a>
                  </div>
                </div>

                <div className="pt-1 text-slate-400 text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>تهران، منطقه بازرگانی و صنعتی پایتخت</span>
                </div>
              </div>
            </div>

            {/* Austria Office Card */}
            <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-slate-900/80">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🇦🇹</span>
                <div>
                  <h4 className="font-bold text-white text-base">دفتر مرکزی اتریش (وین)</h4>
                  <small className="text-xs text-amber-400">ارزیابی، بازرسی در کارخانجات و تحویل CFR</small>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">تلفن مستقیم اتریش:</span>
                  <div className="flex flex-col items-end gap-1 font-mono ltr-num text-white">
                    <a href="tel:+436889763257" className="hover:text-amber-400">
                      0043-688-976-3257
                    </a>
                    <a href="tel:+436889763256" className="hover:text-amber-400">
                      0043-688-976-3256
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs">
                    <i className="fa-brands fa-whatsapp text-base"></i>
                    <span>واتس‌اپ مستقیم</span>
                  </div>
                  <a
                    href="https://wa.me/989231505100"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors font-mono ltr-num"
                  >
                    ارسال پیام در واتساپ
                  </a>
                </div>
              </div>
            </div>

            {/* Digital Channels Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>ایمیل رسمی مکاتبات:</span>
                  </div>
                  <a
                    href="mailto:Europa.Machinery@Gmail.com"
                    className="font-mono text-slate-200 hover:text-amber-400 ltr-num"
                  >
                    Europa.Machinery@Gmail.com
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <span>وب‌سایت رسمی:</span>
                  </div>
                  <a
                    href="https://www.european-machinery.ir"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-amber-400 hover:underline ltr-num"
                  >
                    www.european-machinery.ir
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
