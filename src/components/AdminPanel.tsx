import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit3, Phone, Mail, CheckCircle, Clock, Layers, ShieldCheck, Download, RefreshCw } from 'lucide-react';
import { MachineItem, InquiryItem } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onMachineUpdated: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onMachineUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'machines' | 'add'>('inquiries');
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [machines, setMachines] = useState<MachineItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // New Machine Form State
  const [newTitle, setNewTitle] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newCategory, setNewCategory] = useState('تراش و فرز (CNC)');
  const [newCondition, setNewCondition] = useState<'نو (New)' | 'استوک کارخانه‌ای (Factory Stock)' | 'دست‌دوم تمیز (Used/Inspected)'>('دست‌دوم تمیز (Used/Inspected)');
  const [newCountry, setNewCountry] = useState<'آلمان 🇩🇪' | 'اتریش 🇦🇹' | 'سوئیس 🇨🇭' | 'ایتالیا 🇮🇹' | 'آمریکا 🇺🇸'>('آلمان 🇩🇪');
  const [newCity, setNewCity] = useState('');
  const [newYear, setNewYear] = useState(2021);
  const [newPrice, setNewPrice] = useState('استعلام قیمت (تحویل CFR)');
  const [newImage, setNewImage] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');
  const [specsList, setSpecsList] = useState<{ [key: string]: string }>({
    'سیستم کنترل': 'Siemens Sinumerik',
    'وضعیت تست': 'تست فنی در محل کارخانه انجام شده'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inqRes, machRes] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/machines')
      ]);
      const inqData = await inqRes.json();
      const machData = await machRes.json();

      if (inqData.ok) setInquiries(inqData.inquiries || []);
      if (machData.ok) setMachines(machData.machines || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleUpdateStatus = async (id: string, status: InquiryItem['status']) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.ok) {
        setInquiries(prev => prev.map(i => (i.id === id ? { ...i, status } : i)));
        setMsg('وضعیت استعلام به‌روز شد.');
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('آیا از حذف این استعلام اطمینان دارید؟')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.ok) {
        setInquiries(prev => prev.filter(i => i.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteMachine = async (id: string) => {
    if (!window.confirm('آیا از حذف این دستگاه از کاتالوگ اطمینان دارید؟')) return;
    try {
      const res = await fetch(`/api/machines/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.ok) {
        setMachines(prev => prev.filter(m => m.id !== id));
        onMachineUpdated();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecVal.trim()) {
      setSpecsList(prev => ({ ...prev, [newSpecKey.trim()]: newSpecVal.trim() }));
      setNewSpecKey('');
      setNewSpecVal('');
    }
  };

  const handleCreateMachine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newModel.trim()) {
      alert('لطفاً عنوان و مدل دستگاه را وارد فرمایید.');
      return;
    }

    try {
      const res = await fetch('/api/machines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          model: newModel,
          category: newCategory,
          condition: newCondition,
          country: newCountry,
          city: newCity || 'وین',
          year: newYear,
          price: newPrice,
          image: newImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
          specs: specsList,
          description: newDesc || 'دستگاه صنعتی سالم با تست سلامت در مبدأ اروپا و شرایط تحویل CFR.',
          deliveryTerms: 'CFR بنادر ایران همراه با گواهی مبدأ و پکینگ لیست'
        })
      });

      const data = await res.json();
      if (data.ok) {
        setMsg('دستگاه جدید با موفقیت به کاتالوگ اضافه شد.');
        setNewTitle('');
        setNewModel('');
        setNewDesc('');
        setActiveTab('machines');
        fetchData();
        onMachineUpdated();
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="glass-panel w-full max-w-5xl rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl relative my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Header */}
        <div className="p-5 border-b border-white/10 bg-slate-900/95 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
              مدیریت
            </span>
            <div>
              <h2 className="text-base font-bold text-white">
                پنل مدیریت آسان European Machinery
              </h2>
              <span className="text-xs text-slate-400">
                مدیریت استعلام‌های مشتریان، افزودن و ویرایش ماشین‌آلات کاتالوگ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
              title="تازه‌سازی داده‌ها"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-slate-900/60">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'border-amber-400 text-amber-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <span>استعلام‌ها و پیام‌های دریافتی</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-[10px] tabular-nums">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('machines')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'machines'
                ? 'border-amber-400 text-amber-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <span>مدیریت ماشین‌آلات کاتالوگ</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-700 text-[10px] tabular-nums">
              {machines.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'add'
                ? 'border-amber-400 text-amber-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>افزودن دستگاه جدید</span>
          </button>
        </div>

        {/* Success Msg Banner */}
        {msg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300">
            {msg}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  هیچ استعلام جدیدی ثبت نشده است.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-white">{inq.name}</strong>
                          {inq.company && (
                            <span className="text-xs text-slate-400">({inq.company})</span>
                          )}
                          <span className="text-[11px] text-slate-500 font-mono">
                            {inq.createdAt}
                          </span>
                        </div>

                        {/* Status Dropdown */}
                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleUpdateStatus(inq.id, e.target.value as InquiryItem['status'])
                            }
                            className={`text-xs px-2.5 py-1 rounded-lg font-bold border ${
                              inq.status === 'جدید'
                                ? 'bg-amber-950 text-amber-300 border-amber-600'
                                : inq.status === 'در حال بررسی در اتریش'
                                ? 'bg-blue-950 text-blue-300 border-blue-600'
                                : inq.status === 'استعلام قیمت ارسال شد'
                                ? 'bg-purple-950 text-purple-300 border-purple-600'
                                : 'bg-emerald-950 text-emerald-300 border-emerald-600'
                            }`}
                          >
                            <option value="جدید">جدید</option>
                            <option value="در حال بررسی در اتریش">در حال بررسی در اتریش</option>
                            <option value="استعلام قیمت ارسال شد">استعلام قیمت ارسال شد</option>
                            <option value="تکمیل شده">تکمیل شده</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                            title="حذف پیام"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Detail row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400">تلفن تماس: </span>
                          <a
                            href={`tel:${inq.phone}`}
                            className="text-amber-400 font-mono font-bold hover:underline ltr-num"
                          >
                            {inq.phone}
                          </a>
                        </div>
                        {inq.email && (
                          <div>
                            <span className="text-slate-400">ایمیل: </span>
                            <span className="font-mono text-slate-300 ltr-num">{inq.email}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-slate-400">نوع خدمت: </span>
                          <span className="text-slate-200">{inq.serviceType}</span>
                        </div>
                        {inq.machineTitle && (
                          <div>
                            <span className="text-slate-400">دستگاه درخواستی: </span>
                            <span className="text-amber-400 font-semibold">{inq.machineTitle}</span>
                          </div>
                        )}
                      </div>

                      {/* Message Body */}
                      <div className="bg-slate-950/60 p-3 rounded-lg text-xs text-slate-300 leading-relaxed border border-white/5">
                        {inq.message}
                      </div>

                      {/* Direct Call / WhatsApp buttons */}
                      <div className="flex items-center gap-3 pt-1">
                        <a
                          href={`tel:${inq.phone}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg bg-amber-500 text-slate-950"
                        >
                          <Phone className="w-3 h-3" />
                          <span>تماس تلفنی</span>
                        </a>
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg bg-emerald-600 text-white"
                        >
                          <i className="fa-brands fa-whatsapp"></i>
                          <span>ارسال پیام واتس‌اپ</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MACHINES LIST */}
          {activeTab === 'machines' && (
            <div className="space-y-3">
              {machines.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="w-16 h-12 object-cover rounded-lg bg-slate-950 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{m.title}</h4>
                      <div className="text-xs text-amber-400 font-mono ltr-num">{m.model}</div>
                      <div className="text-[11px] text-slate-400">
                        {m.category} · {m.country} ({m.city}) · مدل {m.year}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteMachine(m.id)}
                      className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 rounded-lg transition-colors"
                      title="حذف از کاتالوگ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ADD NEW MACHINE */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateMachine} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    عنوان دستگاه (فارسی) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="مثلاً: دستگاه فرز ۵ محور سی‌ان‌سی پرسرعت"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    برند و مدل فنی (انگلیسی) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    placeholder="DMG MORI DMU 50"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    دسته‌بندی
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="تراش و فرز (CNC)">تراش و فرز (CNC)</option>
                    <option value="پرس‌های هیدرولیک و مکانیکی">پرس‌های هیدرولیک و مکانیکی</option>
                    <option value="برش لیزر و حکاکی">برش لیزر و حکاکی</option>
                    <option value="ربات‌های صنعتی و اتوماسیون">ربات‌های صنعتی و اتوماسیون</option>
                    <option value="خطوط تولید و کارخانجات">خطوط تولید و کارخانجات</option>
                    <option value="صنایع کارتن‌سازی و بسته‌بندی">صنایع کارتن‌سازی و بسته‌بندی</option>
                    <option value="صنایع پلاستیک و چاپ">صنایع پلاستیک و چاپ</option>
                    <option value="کمپرسورهای هوا و گاز">کمپرسورهای هوا و گاز</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    کشور سازنده / مبدأ
                  </label>
                  <select
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="آلمان 🇩🇪">آلمان 🇩🇪</option>
                    <option value="اتریش 🇦🇹">اتریش 🇦🇹</option>
                    <option value="سوئیس 🇨🇭">سوئیس 🇨🇭</option>
                    <option value="ایتالیا 🇮🇹">ایتالیا 🇮🇹</option>
                    <option value="آمریکا 🇺🇸">آمریکا 🇺🇸</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    وضعیت فنی
                  </label>
                  <select
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="دست‌دوم تمیز (Used/Inspected)">دست‌دوم تمیز (Used/Inspected)</option>
                    <option value="استوک کارخانه‌ای (Factory Stock)">استوک کارخانه‌ای (Factory Stock)</option>
                    <option value="نو (New)">نو (New)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    شهر مبدأ در اروپا
                  </label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="وین / مونیخ / زوریخ"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    سال ساخت
                  </label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    قیمت یا شرایط تحویل
                  </label>
                  <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="استعلام قیمت (تحویل CFR)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  آدرس تصویر دستگاه (URL)
                </label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono text-left"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  توضیحات و گزارش کارشناسی در اروپا
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="وضعیت سلامت مکانیکی، الکتریکی، دقت هندسی و مدارک..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none"
                ></textarea>
              </div>

              {/* Add Custom Specs */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 space-y-2">
                <label className="block text-xs font-semibold text-amber-400">
                  مشخصات فنی دستگاه:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    placeholder="نام ویژگی (مثلاً: کورس حرکتی)"
                    className="w-1/2 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={newSpecVal}
                    onChange={(e) => setNewSpecVal(e.target.value)}
                    placeholder="مقدار (مثلاً: X: 600mm)"
                    className="w-1/2 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono text-left"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-lg whitespace-nowrap"
                  >
                    افزودن ویژگی
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {Object.entries(specsList).map(([k, v]) => (
                    <span
                      key={k}
                      className="text-[11px] px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 border border-white/5"
                    >
                      {k}: <strong className="text-amber-400 font-mono">{v}</strong>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 rounded-xl shadow-md shadow-amber-500/20"
              >
                ثبت و انتشار دستگاه در کاتالوگ سایت
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
