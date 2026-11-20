import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';

interface DownloadCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadCatalogModal: React.FC<DownloadCatalogModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [downloadReady, setDownloadReady] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setDownloadReady(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="glass-panel w-full max-w-md rounded-2xl overflow-hidden border border-amber-500/30 p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            دانلود کاتالوگ جامع تجهیزات و خطوط تولید ۲۰۲۶
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            شامل فهرست ماشین‌آلات CNC، پرس‌ها، کارخانجات فعال آماده فروش در اتریش و آلمان و جدول زمان‌بندی تحویل CFR
          </p>
        </div>

        {downloadReady ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">کاتالوگ آماده دریافت است</h4>
            <p className="text-xs text-slate-300">
              یک نسخه نیز به همراه لیست قیمت روز برای شما ارسال خواهد شد.
            </p>
            <a
              href="#catalog"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl shadow-lg shadow-amber-500/25"
            >
              <Download className="w-4 h-4" />
              <span>دریافت کاتالوگ (PDF - 18MB)</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                نام و نام خانوادگی *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً: مهندس رضایی"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                شماره همراه (واتساپ) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="۰۹۱۲..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-left"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                آدرس ایمیل (اختیاری)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rezaei@company.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono text-left"
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <Download className="w-4 h-4" />
              <span>دانلود رایگان کاتالوگ ۲۰۲۶</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>بدون اسپم · حفظ حریم خصوصی صنعتگران</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
