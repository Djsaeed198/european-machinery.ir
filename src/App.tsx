/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react'
import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  Boxes,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  Clock3,
  Factory,
  FileText,
  Globe2,
  Headphones,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
  Zap,
  Settings,
  Ship,
  Layers,
  Filter,
  Calendar,
  ExternalLink,
  Download,
  Star,
  CheckCircle2,
  HelpCircle,
  Calculator,
  BookOpen,
} from 'lucide-react'

import { MachineItem, InquiryItem, StatsData } from './types'
import { MachineDetailModal } from './components/MachineDetailModal'
import { AdminPanel } from './components/AdminPanel'
import { CfrCalculator } from './components/CfrCalculator'
import { CustomsAndProcess } from './components/CustomsAndProcess'
import { ProductionLines } from './components/ProductionLines'
import { LogoCloud } from './components/LogoCloud'
import { PortfolioShowcase } from './components/PortfolioShowcase'
import { Testimonials } from './components/Testimonials'
import { ComparisonTable } from './components/ComparisonTable'
import { FaqSection } from './components/FaqSection'
import { DownloadCatalogModal } from './components/DownloadCatalogModal'
import { ImportCostCalculator } from './components/ImportCostCalculator'
import { BlogSection } from './components/BlogSection'
import { TehranMapSection } from './components/TehranMapSection'
import { AboutSection } from './components/AboutSection'

const services = [
  { icon: Globe2, title: 'تأمین مستقیم از اروپا', text: 'دسترسی مستقیم به شبکه فروشندگان و کارخانه‌های معتبر اروپا، بدون واسطه.' },
  { icon: Boxes, title: 'سبد کامل ماشین‌آلات', text: 'از CNC و پرس تا خطوط تولید کامل، متناسب با نیاز هر صنعت.' },
  { icon: BadgeCheck, title: 'ارزیابی تخصصی', text: 'بررسی فنی، ارزش‌گذاری و انتخاب مطمئن برای خرید دستگاه دست‌دوم.' },
  { icon: Truck, title: 'تحویل CFR بنادر ایران', text: 'مدیریت حمل‌ونقل و تشریفات واردات تا تحویل ایمن در مقصد.' },
  { icon: ShieldCheck, title: 'بازرسی پیش از خرید', text: 'بازدید و کنترل دقیق دستگاه در محل فروشنده پیش از نهایی‌سازی.' },
  { icon: Headphones, title: 'مشاوره تا راه‌اندازی', text: 'همراهی کارشناسان ما از انتخاب دستگاه تا نصب و بهره‌برداری.' },
]

const quickCategories = [
  ['CNC', 'تراش و فرز (CNC)'],
  ['Press', 'پرس‌های هیدرولیک و مکانیکی'],
  ['Weld', 'جوش و برش صنعتی'],
  ['Robot', 'ربات‌های صنعتی و اتوماسیون'],
  ['Air', 'کمپرسورهای هوا و گاز'],
  ['Pack', 'صنایع کارتن‌سازی و بسته‌بندی'],
  ['Wood', 'صنایع چوب و نئوپان'],
  ['Laser', 'برش لیزر فایبر و حکاکی'],
]

const process = [
  ['۰۱', 'نیازسنجی و مشاوره', 'نوع، مدل و مشخصات فنی موردنیاز خود را با ما در میان بگذارید.'],
  ['۰۲', 'جست‌وجو و پیشنهاد', 'تیم ما بهترین گزینه‌ها را از کارخانجات و مزایده‌های اروپا شناسایی و ارائه می‌کند.'],
  ['۰۳', 'بازرسی و معامله', 'پس از تأیید شما، بازرسی تخصصی TÜV/SGS و فرآیند صدور پرفرما انجام می‌شود.'],
  ['۰۴', 'حمل CFR و تحویل', 'دستگاه با مدیریت کامل بارگیری کانتینری، ترخیص EPL و تحویل در بنادر ایران انجام می‌گردد.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [catalogModalOpen, setCatalogModalOpen] = useState(false)
  const [lang, setLang] = useState<'fa' | 'de' | 'en'>('fa')

  // Backend state
  const [machines, setMachines] = useState<MachineItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('همه')
  const [selectedCondition, setSelectedCondition] = useState<string>('همه')
  const [selectedCountry, setSelectedCountry] = useState<string>('همه')
  const [selectedMachine, setSelectedMachine] = useState<MachineItem | null>(null)
  const [adminOpen, setAdminOpen] = useState(false)
  const [stats, setStats] = useState<StatsData | null>(null)

  // Form state
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [deviceType, setDeviceType] = useState('CNC و ماشین‌ابزار')
  const [deviceCondition, setDeviceCondition] = useState('دست‌دوم با برگه کارشناسی')
  const [budget, setBudget] = useState('۱ تا ۳ میلیارد تومان')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  const fetchMachines = async () => {
    try {
      const res = await fetch('/api/machines')
      const data = await res.json()
      if (data.ok) {
        setMachines(data.machines || [])
      }
    } catch (err) {
      console.error('Error fetching machines:', err)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats')
      const data = await res.json()
      if (data.ok) {
        setStats(data.stats)
      }
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  useEffect(() => {
    fetchMachines()
    fetchStats()

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filtered machinery list
  const filteredMachines = machines.filter((item) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(q) ||
      item.model.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q)

    const matchesCategory =
      selectedCategory === 'همه' || item.category.includes(selectedCategory)

    const matchesCondition =
      selectedCondition === 'همه' || item.condition.includes(selectedCondition)

    const matchesCountry =
      selectedCountry === 'همه' || item.country.includes(selectedCountry)

    return matchesSearch && matchesCategory && matchesCondition && matchesCountry
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !phone.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          whatsapp,
          budget,
          serviceType: `خرید ${deviceType} (${deviceCondition})`,
          category: deviceType,
          message: message || `درخواست استعلام قیمت برای ${deviceType} - بودجه: ${budget}`,
        }),
      })
      const data = await res.json()
      if (data.ok) {
        setSubmitted(true)
        setToastMsg('استعلام شما با موفقیت ثبت شد. کارشناسان وین و تهران در اسرع وقت تماس خواهند گرفت.')
        setName('')
        setPhone('')
        setWhatsapp('')
        setMessage('')
        fetchStats()
        setTimeout(() => setToastMsg(''), 5000)
      }
    } catch (e) {
      console.error(e)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickCategoryClick = (catTitle: string) => {
    setSelectedCategory(catTitle)
    const el = document.getElementById('catalog-items')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleRequestQuote = (machine: MachineItem) => {
    setDeviceType(machine.category)
    setMessage(`درخواست استعلام قیمت و پیش‌فاکتور (CFR) برای دستگاه ${machine.title} (${machine.model}) - کد ${machine.id}`)
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCfrQuoteRequested = (info: { origin: string; dest: string; cargo: string; time: string }) => {
    setDeviceType('استعلام حمل دریایی CFR')
    setMessage(`درخواست استعلام ترانزیت CFR از ${info.origin} به ${info.dest} با ${info.cargo} (مدت تخمینی: ${info.time})`)
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleProformaFromCalc = (calcNote: string) => {
    setMessage(calcNote)
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="site-shell">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 border border-emerald-500 text-emerald-200 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Sticky Header Section (Stays fixed at top when scrolling) */}
      <div className="sticky top-0 z-50 w-full">
        {!isScrolled && (
          <div className="topline transition-all duration-300">
            <div className="flex items-center gap-3">
              <span>
                <span className="live-dot" /> تأمین مستقیم ماشین‌آلات اروپایی نو و دست‌دوم
              </span>
              <span className="topline-desktop">
                دفتر اتریش (وین) · دفتر تهران · پاسخگویی در تمام روزهای کاری
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Switch */}
              <div className="flex items-center gap-1.5 text-[11px] font-mono bg-slate-900 px-2 py-0.5 rounded border border-white/10">
                <button
                  onClick={() => setLang('fa')}
                  className={`hover:text-amber-400 cursor-pointer ${lang === 'fa' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                >
                  🇮🇷 FA
                </button>
                <span className="text-slate-600">|</span>
                <button
                  onClick={() => setLang('de')}
                  className={`hover:text-amber-400 cursor-pointer ${lang === 'de' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                >
                  🇦🇹 DE
                </button>
                <span className="text-slate-600">|</span>
                <button
                  onClick={() => setLang('en')}
                  className={`hover:text-amber-400 cursor-pointer ${lang === 'en' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                >
                  🇬🇧 EN
                </button>
              </div>

              <button
                onClick={() => setAdminOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold bg-slate-900/80 px-2.5 py-0.5 rounded border border-amber-500/30 cursor-pointer"
                title="پنل مدیریت آسان"
              >
                <Settings size={13} />
                <span>پنل مدیریت</span>
                {stats?.pendingInquiries ? (
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                ) : null}
              </button>
            </div>
          </div>
        )}

        {/* Navbar */}
        <header className={`navbar transition-all duration-300 ${isScrolled ? 'scrolled shadow-2xl' : ''}`}>
          <a href="#top" className="brand" aria-label="European Machinery home">
            <img
              src="/logo.png"
              alt="European Machinery"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-md transition-transform hover:scale-105"
            />
          </a>

          <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
            <a href="#catalog" onClick={() => setMenuOpen(false)}>
              کاتالوگ ماشین‌آلات
            </a>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>
              پروژه‌ها
            </a>
            <a href="#calculator" onClick={() => setMenuOpen(false)}>
              تخمین هزینه
            </a>
            <a href="#production-lines" onClick={() => setMenuOpen(false)}>
              خطوط تولید
            </a>
            <a href="#customs" onClick={() => setMenuOpen(false)}>
              اسناد گمرکی
            </a>
            <a href="#cfr-calc" onClick={() => setMenuOpen(false)}>
              محاسبه‌گر CFR
            </a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              سؤالات متداول
            </a>
            <a href="#blog" onClick={() => setMenuOpen(false)}>
              مقالات
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              تماس با ما
            </a>
          </nav>

          <div className="nav-actions">
            <a href="tel:+989231505100" className="phone-link">
              <Phone size={16} /> ۰۹۲۳۱۵۰۵۱۰۰
            </a>

            <button
              onClick={() => setCatalogModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-400 hover:text-amber-300 bg-slate-900 border border-amber-500/30 rounded-xl cursor-pointer"
            >
              <Download size={14} />
              <span>کاتالوگ ۲۰۲۶</span>
            </button>

            <a href="#contact" className="button button-primary">
              درخواست مشاوره <ArrowLeft size={16} />
            </a>

            <button
              className="search-button"
              aria-label="جستجو"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={19} />
            </button>

            <button
              className="menu-button"
              aria-label="باز کردن منو"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </header>

        {/* Quick Search Dropdown Panel */}
        {searchOpen && (
          <div className="search-panel">
          <div className="container">
            <Search size={19} className="text-amber-400" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی مدل (مثلاً: DMG MORI، TRUMPF، KUKA) یا دسته‌بندی..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-white"
              >
                پاک کردن
              </button>
            )}
            <span onClick={() => setSearchOpen(false)} className="cursor-pointer">
              بستن
            </span>
          </div>
        </div>
      )}
      </div>

      {/* Hero Section */}
      <section className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-grid" />
        <div className="container hero-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="hero-copy lg:col-span-7">
              <div className="eyebrow">
                <span className="live-dot" /> شریک صنعتی شما در اروپا
              </div>
              <h1>
                ماشین‌آلاتی برای
                <br />
                <em>فردای صنعت</em> شما
              </h1>
              <p>
                واردات مستقیم ماشین‌آلات صنعتی نو و دست‌دوم از اروپا؛ با اصالت، بررسی تخصصی در آلمان و اتریش و همراهی تا راه‌اندازی و تحویل رسمی CFR در بنادر مقصد.
              </p>
              <div className="hero-actions">
                <a href="#catalog" className="button button-primary">
                  مشاهده کاتالوگ <ArrowLeft size={17} />
                </a>
                <button
                  onClick={() => setCatalogModalOpen(true)}
                  className="button button-ghost cursor-pointer"
                >
                  <Download size={16} className="text-amber-400" />
                  <span>دانلود کاتالوگ ۲۰۲۶</span>
                </button>
                <a href="#contact" className="button button-ghost">
                  ثبت درخواست خرید <ArrowUpLeft size={17} />
                </a>
              </div>
              <div className="trust-note">
                <span className="trust-avatars">
                  <i>AT</i>
                  <i>IR</i>
                  <i>EU</i>
                </span>
                <span>
                  <b>+۲۰ سال</b> تجربه در تجارت و سورسینگ ماشین‌آلات اروپا
                </span>
              </div>
            </div>

            {/* Visual Showcase Card with User Poster */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-950/80 backdrop-blur-md p-2 group hover:border-amber-400 transition-all">
                <img
                  src="/assets/aistudio/__________________________9b704415.jpg"
                  alt="واردات ماشین آلات صنعتی نو و دست دوم از اروپا - مشاوره رایگان"
                  className="w-full h-auto rounded-xl object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 border border-white/10 px-3 py-1 rounded-full text-[11px] font-bold text-amber-400 backdrop-blur-md">
                  دفتر وین 🇦🇹 و تهران 🇮🇷
                </div>
              </div>
            </div>
          </div>

          <div className="hero-stats">
            <div>
              <strong>۱۵+</strong>
              <span>سال تجربه بین‌الملل</span>
            </div>
            <div>
              <strong>۲۵۰۰+</strong>
              <span>دستگاه تأمین‌شده</span>
            </div>
            <div>
              <strong>۲۷</strong>
              <span>کشور تحت پوشش</span>
            </div>
            <div>
              <strong>۹۸٪</strong>
              <span>رضایت صنعتگران</span>
            </div>
          </div>
        </div>
        <a href="#services" className="scroll-cue">
          <ChevronDown size={18} />
          <span>کشف کنید</span>
        </a>
      </section>

      {/* Trust Strip */}
      <section className="trust-strip">
        <div className="container trust-items">
          <div>
            <Globe2 />
            <span>
              <b>تأمین از قلب اروپا</b>
              <small>اتریش، آلمان و سراسر اروپا</small>
            </span>
          </div>
          <div>
            <ShieldCheck />
            <span>
              <b>تضمین اصالت و سلامت</b>
              <small>بازرسی فنی TÜV پیش از خرید</small>
            </span>
          </div>
          <div>
            <Zap />
            <span>
              <b>پاسخگویی سریع</b>
              <small>مشاوره رایگان تخصصی مهندسی</small>
            </span>
          </div>
          <div>
            <Truck />
            <span>
              <b>تحویل مطمئن</b>
              <small>شرایط رسمی CFR بنادر ایران</small>
            </span>
          </div>
        </div>
      </section>

      {/* Logo Cloud (Premier European Brands) */}
      <LogoCloud />

      {/* Services Section */}
      <section className="section services-section" id="services">
        <div className="container">
          <SectionIntro
            kicker="چرا European Machinery"
            title={
              <>
                یک شریک مطمئن، <em>فراتر از معامله</em>
              </>
            }
            text="ما فقط دستگاه نمی‌فروشیم؛ راهکار صنعتی متناسب با مسیر رشد کسب‌وکار شما ارائه می‌دهیم."
          />

          {/* Services Infographic Banner */}
          <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 group">
            <img
              src="/assets/aistudio/_________4b7e2405.jpg"
              alt="خدمات ما - European Machinery"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-101"
            />
          </div>

          <div className="services-grid">
            {services.map(({ icon: Icon, title, text }, index) => (
              <article className="service-card" key={title}>
                <span className="card-number">{`۰${index + 1}`}</span>
                <div className="icon-box">
                  <Icon size={22} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#contact">
                  بیشتر بدانید <ChevronLeft size={15} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase (Real Delivered Projects) */}
      <PortfolioShowcase
        onRequestInquiry={(machineName) => {
          setDeviceType(machineName)
          setMessage(`درخواست استعلام برای دستگاه مشابه با "${machineName}"`)
          const el = document.getElementById('contact')
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      />

      {/* Interactive Import Cost Calculator */}
      <ImportCostCalculator onRequestProforma={handleProformaFromCalc} />

      {/* Catalog & Categories Section */}
      <section className="section catalog-section" id="catalog">
        <div className="container">
          <div className="section-heading-row">
            <SectionIntro
              kicker="کاتالوگ ماشین‌آلات"
              title={
                <>
                  برای هر صنعت، <em>یک راهکار تخصصی</em>
                </>
              }
              text="در میان دسته‌بندی‌های متنوع ماشین‌آلات نو و دست‌دوم اروپایی جست‌وجو کنید."
            />
            <a className="text-link" href="#catalog-items">
              مشاهده جدول کامل تجهیزات <ArrowLeft size={16} />
            </a>
          </div>

          {/* Online Marketplace Banner */}
          <div className="mb-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 group">
            <img
              src="/assets/aistudio/________________________112aa5ff.png"
              alt="بازار آنلاین ماشین‌آلات - بیش از ۲۰۰,۰۰۰ آگهی نو و دست دوم آماده تحویل"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-101"
            />
          </div>

          {/* 8 Quick Category Visual Tiles */}
          <div className="category-grid mb-12">
            {quickCategories.map(([label, title], index) => (
              <button
                type="button"
                onClick={() => handleQuickCategoryClick(title)}
                className="category-card text-right w-full cursor-pointer"
                key={label}
              >
                <div className={`category-visual visual-${index + 1}`}>
                  <span>{label}</span>
                </div>
                <div className="category-title">
                  <span>{title}</span>
                  <ChevronLeft size={17} />
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Advanced Search & Filter Bar */}
          <div id="catalog-items" className="glass-panel rounded-2xl p-6 mb-8 space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی مدل (مثلاً: DMG MORI، TRUMPF، پرس شولر، اکسترودر)..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-11 pl-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="همه">همه دسته‌ها</option>
                  <option value="تراش و فرز">تراش و فرز (CNC)</option>
                  <option value="پرس">پرس‌های هیدرولیک و مکانیکی</option>
                  <option value="لیزر">برش لیزر و حکاکی</option>
                  <option value="ربات">رباتیک و اتوماسیون</option>
                  <option value="کارتن">کارتن‌سازی و بسته‌بندی</option>
                  <option value="پلاستیک">پلاستیک و چاپ</option>
                  <option value="کمپرسور">کمپرسورهای هوا</option>
                  <option value="خطوط تولید">خطوط تولید کامل</option>
                </select>

                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="همه">همه کشورها</option>
                  <option value="آلمان">آلمان 🇩🇪</option>
                  <option value="اتریش">اتریش 🇦🇹</option>
                  <option value="سوئیس">سوئیس 🇨🇭</option>
                  <option value="ایتالیا">ایتالیا 🇮🇹</option>
                </select>

                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="همه">همه وضعیت‌ها</option>
                  <option value="نو">نو (New)</option>
                  <option value="استوک">استوک کارخانه‌ای</option>
                  <option value="دست‌دوم">دست‌دوم تمیز کارشناسی‌شده</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400">
              <span>
                نمایش{' '}
                <strong className="text-amber-400 font-bold tabular-nums">
                  {filteredMachines.length}
                </strong>{' '}
                ماشین صنعتی فعال
              </span>
              {(selectedCategory !== 'همه' || selectedCountry !== 'همه' || selectedCondition !== 'همه' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('همه')
                    setSelectedCountry('همه')
                    setSelectedCondition('همه')
                    setSearchQuery('')
                  }}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  پاک کردن فیلترها
                </button>
              )}
            </div>
          </div>

          {/* Machinery Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMachines.map((machine) => (
              <div
                key={machine.id}
                className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                    <img
                      src={machine.image}
                      alt={machine.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        ;(e.target as HTMLElement).style.display = 'none'
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-slate-900/90 border border-white/10 text-white backdrop-blur-md">
                        {machine.country} · {machine.city}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/90 text-slate-950 backdrop-blur-md">
                        {machine.condition}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-semibold text-amber-400 block mb-1">
                      {machine.category}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {machine.title}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono mb-3 ltr-num">
                      {machine.model} · {machine.year}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                      {machine.description}
                    </p>

                    <div className="bg-slate-900/70 rounded-xl p-3 border border-white/5 space-y-1 text-[11px] mb-4">
                      {Object.entries(machine.specs).slice(0, 2).map(([k, v]) => (
                        <div key={k} className="flex justify-between items-center text-slate-300">
                          <span className="text-slate-400">{k}:</span>
                          <span className="font-semibold text-white ltr-num text-left">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs py-2">
                    <span className="text-slate-400">قیمت:</span>
                    <span className="text-amber-400 font-bold">{machine.price}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedMachine(machine)}
                      className="py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>مشخصات فنی</span>
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={() => handleRequestQuote(machine)}
                      className="py-2 px-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShieldCheck size={14} />
                      <span>استعلام CFR</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table: European Machinery vs Brokers */}
      <ComparisonTable />

      {/* Turnkey Complete Production Lines */}
      <ProductionLines
        onSelectCategoryForInquiry={(catTitle) => {
          setDeviceType(catTitle)
          setMessage(`درخواست مشاوره تخصصی و پیش‌فاکتور برای "${catTitle}"`)
          const el = document.getElementById('contact')
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      />

      {/* Customer Testimonials & Social Proof */}
      <Testimonials />

      {/* Customs & 4-Step Process Guide */}
      <CustomsAndProcess />

      {/* CFR Maritime Transit Calculator */}
      <CfrCalculator onQuoteRequested={handleCfrQuoteRequested} />

      {/* FAQ Section */}
      <FaqSection />

      {/* Blog & Educational Industrial Guides */}
      <BlogSection />

      {/* About Section */}
      <AboutSection />

      {/* Process Section */}
      <section className="section process-section" id="process">
        <div className="container">
          <SectionIntro
            kicker="مسیر همکاری"
            title={
              <>
                از نیاز شما تا <em>راه‌اندازی</em>
              </>
            }
            text="فرآیندی شفاف و همراهی مستمر، خرید ماشین‌آلات را برای شما ساده می‌کند."
          />

          {/* Process Infographic Roadmap Banner */}
          <div className="mb-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 group">
            <img
              src="/assets/aistudio/__________________51c9aabe.jpg"
              alt="نحوه همکاری با European Machinery و فرآیند خرید ماشین‌آلات"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-101"
            />
          </div>

          <div className="process-grid">
            {process.map(([number, title, text]) => (
              <div className="process-step" key={number}>
                <span className="process-number">{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy">
            <div className="eyebrow">در تماس باشیم</div>
            <h2>
              دستگاه مناسب
              <br />
              <em>شما همینجاست.</em>
            </h2>
            <p>
              مشخصات دستگاه موردنیازتان را برای ما ارسال کنید. کارشناسان ما در کوتاه‌ترین زمان با بهترین پیشنهاد از اروپا با شما تماس می‌گیرند.
            </p>
            <div className="contact-points">
              <a href="tel:+989231505100">
                <span>
                  <Phone size={18} />
                </span>
                <div>
                  <small>دفتر ایران (تهران)</small>
                  <b>۰۹۲۳۱۵۰۵۱۰۰</b>
                </div>
              </a>
              <a href="https://wa.me/989231505100" target="_blank" rel="noreferrer">
                <span>
                  <MessageCircle size={18} />
                </span>
                <div>
                  <small>واتساپ مستقیم و مشاوره سریع</small>
                  <b dir="ltr">0098 923 150 5100</b>
                </div>
              </a>
              <a href="mailto:Europa.Machinery@gmail.com">
                <span>
                  <Mail size={18} />
                </span>
                <div>
                  <small>ایمیل مکاتبات</small>
                  <b>Europa.Machinery@gmail.com</b>
                </div>
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-top">
              <div>
                <span>فرم استعلام پیشرفته</span>
                <h3>مشاوره تخصصی و پیش‌فاکتور (CFR)</h3>
              </div>
              <FileText size={28} />
            </div>

            {submitted ? (
              <div className="success-state">
                <div className="success-icon">
                  <Check />
                </div>
                <h3>درخواست شما با موفقیت ثبت شد</h3>
                <p>کارشناسان دفاتر تهران و اتریش به‌زودی با شما تماس می‌گیرند.</p>
                <button
                  type="button"
                  className="text-link cursor-pointer"
                  onClick={() => setSubmitted(false)}
                >
                  ارسال درخواست جدید
                </button>
              </div>
            ) : (
              <>
                <label>
                  نام و نام خانوادگی / نام کارخانه یا کارگاه *
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثلاً: علی محمدی (کارخانه فرآوری فلز)"
                  />
                </label>

                <div className="form-row">
                  <label>
                    شماره تماس مستقیم *
                    <input
                      required
                      type="tel"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
                    />
                  </label>

                  <label>
                    شماره واتساپ (جهت ارسال ویدیو و پرفرما)
                    <input
                      type="tel"
                      dir="ltr"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="۰۹۱۲... یا شماره خارجی"
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    نوع دستگاه
                    <select
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                    >
                      <option value="CNC و ماشین‌ابزار">تراش و فرز CNC</option>
                      <option value="پرس و فلزکاری">پرس‌های هیدرولیک و مکانیکی</option>
                      <option value="برش لیزر فایبر">برش لیزر فایبر صنعتی</option>
                      <option value="رباتیک و اتوماسیون">رباتیک و اتوماسیون صنعتی</option>
                      <option value="خط تولید کامل">خط کامل کارخانجات (تایر، لبنیات، کارتن)</option>
                      <option value="بسته‌بندی و کارتن‌سازی">بسته‌بندی و کارتن‌سازی</option>
                      <option value="صنایع پلاستیک و چاپ">صنایع پلاستیک و اکسترودر</option>
                      <option value="کمپرسورهای هوا">کمپرسورهای اسکرو و فشارقوی</option>
                      <option value="سایر">سایر تجهیزات صنعتی</option>
                    </select>
                  </label>

                  <label>
                    وضعیت فنی مورد نیاز
                    <select
                      value={deviceCondition}
                      onChange={(e) => setDeviceCondition(e.target.value)}
                    >
                      <option value="دست‌دوم با برگه کارشناسی">دست‌دوم تمیز کارشناسی‌شده در اروپا</option>
                      <option value="استوک کارخانه‌ای">استوک کارخانه‌ای (Factory Stock)</option>
                      <option value="نو (Brand New)">دستگاه کاملاً نو با وارانتی</option>
                      <option value="فرقی ندارد">فرقی ندارد (بهترین نسبت قیمت به کیفیت)</option>
                    </select>
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    بودجه تقریبی سرمایه‌گذاری
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      <option value="کمتر از ۱ میلیارد تومان">کمتر از ۱ میلیارد تومان</option>
                      <option value="۱ تا ۳ میلیارد تومان">۱ تا ۳ میلیارد تومان</option>
                      <option value="۳ تا ۵ میلیارد تومان">۳ تا ۵ میلیارد تومان</option>
                      <option value="بیش از ۵ میلیارد تومان">بیش از ۵ میلیارد تومان (خط کامل)</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-2 pt-6 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded text-amber-500"
                    />
                    <span className="text-xs text-slate-300">مایل به دریافت کاتالوگ PDF و لیست قیمت هستم</span>
                  </label>
                </div>

                <label>
                  مشخصات، ظرفیت، مدل برند (آلمانی/اتریشی) یا توضیحات تکمیلی
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="مدل مدنظر، ابعاد کورس، تناژ یا هرگونه سؤال فنی..."
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="button button-primary submit-button cursor-pointer"
                >
                  {loading ? 'در حال ارسال...' : 'ارسال درخواست استعلام و دریافت پیش‌فاکتور'} <ArrowLeft size={16} />
                </button>

                <small className="form-privacy">
                  <ShieldCheck size={13} /> اطلاعات شما نزد European Machinery محفوظ می‌ماند و مستقیماً به دفتر اتریش و تهران منتقل می‌شود.
                </small>
              </>
            )}
          </form>
        </div>

        {/* Tehran Office Embedded Map */}
        <div className="container">
          <TehranMapSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a href="#top" className="brand footer-brand" aria-label="European Machinery home">
              <img
                src="/logo.png"
                alt="European Machinery"
                className="h-12 w-auto object-contain drop-shadow-md mb-3"
              />
            </a>
            <p>
              واردات مستقیم ماشین‌آلات صنعتی نو و دست‌دوم از اروپا، برای ساختن آینده‌ای بهتر در صنعت ایران.
            </p>
            <div className="socials">
              <a href="https://www.european-machinery.ir" target="_blank" rel="noreferrer" aria-label="Website">
                <Globe2 size={17} />
              </a>
              <button onClick={() => setAdminOpen(true)} className="cursor-pointer" aria-label="مدیریت">
                <Settings size={17} />
              </button>
              <a href="mailto:Europa.Machinery@gmail.com" aria-label="Email">
                <Mail size={17} />
              </a>
            </div>
          </div>

          <div>
            <h4>دسترسی سریع</h4>
            <a href="#catalog">کاتالوگ ماشین‌آلات</a>
            <a href="#portfolio">پروژه‌های ترخیص‌شده</a>
            <a href="#calculator">ماشین‌حساب واردات</a>
            <a href="#production-lines">خطوط کامل کارخانجات</a>
            <a href="#customs">اسناد و ترخیص EPL</a>
            <a href="#cfr-calc">محاسبه‌گر حمل CFR</a>
            <a href="#faq">پرسش‌های متداول</a>
            <a href="#blog">مقالات و راهنماها</a>
            <a href="#about">درباره ما</a>
          </div>

          <div>
            <h4>ارتباط با ما</h4>
            <a href="tel:+989231505100">
              <Phone size={15} /> ۰۹۲۳۱۵۰۵۱۰۰
            </a>
            <a href="tel:+436889763257">
              <Phone size={15} /> ۰۰۴۳-۶۸۸-۹۷۶-۳۲۵۷
            </a>
            <a href="mailto:Europa.Machinery@gmail.com">
              <Mail size={15} /> Europa.Machinery@gmail.com
            </a>
            <a href="#contact">
              <MapPin size={15} /> دفتر وین: اتریش · دفتر تهران: میدان ونک
            </a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© ۲۰۲۶ European Machinery. تمامی حقوق محفوظ است.</span>
          <span>
            ساخته‌شده برای صنعتگران ایران <span className="amber">◆</span>
          </span>
        </div>
      </footer>

      {/* Floating WhatsApp with direct link and label */}
      <a
        className="whatsapp-float"
        href="https://wa.me/989231505100"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تماس در واتساپ"
      >
        <MessageCircle size={24} />
        <span>در واتساپ با ما صحبت کنید</span>
      </a>

      {/* Machine Details Modal */}
      <MachineDetailModal
        machine={selectedMachine}
        onClose={() => setSelectedMachine(null)}
        onRequestQuote={handleRequestQuote}
      />

      {/* Download Catalog PDF Modal */}
      <DownloadCatalogModal
        isOpen={catalogModalOpen}
        onClose={() => setCatalogModalOpen(false)}
      />

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onMachineUpdated={() => {
          fetchMachines()
          fetchStats()
        }}
      />
    </main>
  )
}

function SectionIntro({
  kicker,
  title,
  text,
}: {
  kicker: string
  title: React.ReactNode
  text: string
}) {
  return (
    <div className="section-intro">
      <div className="eyebrow">{kicker}</div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}
