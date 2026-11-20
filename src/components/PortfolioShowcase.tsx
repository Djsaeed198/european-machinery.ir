import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Ship, 
  ShieldCheck, 
  ChevronLeft, 
  Search, 
  SlidersHorizontal,
  FileCheck,
  Building,
  Sparkles,
  X
} from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  year: number;
  origin: string;
  status: string;
  badgeColor: string;
  image: string;
  specs: string;
  brand?: string;
}

export const PortfolioShowcase: React.FC<{ onRequestInquiry: (name: string) => void }> = ({ onRequestInquiry }) => {
  const [filter, setFilter] = useState('همه');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    // --- 6 Original Delivered Projects ---
    {
      id: 'proj-1',
      title: 'دستگاه فرز ۵ محور DMG MORI DMU 75 monoBLOCK',
      category: 'CNC',
      client: 'تحویل کارخانه قطعه‌سازی خودرو (تبریز)',
      year: 2021,
      origin: 'آلمان 🇩🇪 (اشتوتگارت)',
      status: 'تحویل نهایی در کارخانه خریدار',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      specs: 'کنترل هایدن‌هاین TNC 640 · اسپیندل ۲۰,۰۰۰ دور · ۶۰ ابزار اتوماتیک',
      brand: 'DMG MORI'
    },
    {
      id: 'proj-2',
      title: 'پرس هیدرولیک قالب‌سازی ۸۰۰ تن SMG Schuler',
      category: 'پرس',
      client: 'تحویل صنایع لوازم خانگی (اصفهان)',
      year: 2019,
      origin: 'اتریش 🇦🇹 (لینتس)',
      status: 'ترخیص قطعی از بندر شهید رجایی',
      badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      specs: 'میز کار ۲۸۰۰×۱۸۰۰ mm · سیستم سنسوریک نوری بیمار · پمپ رکسروت',
      brand: 'Schuler'
    },
    {
      id: 'proj-3',
      title: 'خط کامل برش لیزر فایبر ۱۵ کیلووات TRUMPF',
      category: 'لیزر',
      client: 'تحویل مجتمع فولاد و سازه‌های فلزی (مشهد)',
      year: 2022,
      origin: 'آلمان 🇩🇪 (دیتزینگن)',
      status: 'راه‌اندازی کامل و تولید آزمایشی',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      specs: 'برش ورق استیل ۳۵ میل · میز دوبل تعویض ۲۲ ثانیه‌ای · چیلر اورجینال',
      brand: 'TRUMPF'
    },
    {
      id: 'proj-4',
      title: 'سلول رباتیک جوشکاری پیوسته KUKA + فرونیوس اتریش',
      category: 'رباتیک',
      client: 'تحویل خطوط تولید ادوات کشاورزی (شیراز)',
      year: 2023,
      origin: 'اتریش 🇦🇹 (وین)',
      status: 'تحویل نهایی و آموزش اپراتوری',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      specs: 'شعاع کاری ۳,۱۰۰ mm · پکیج Fronius CMT جوش سرد بدون پاشش',
      brand: 'KUKA'
    },
    {
      id: 'proj-5',
      title: 'خط پیوسته ورق کارتن ۵ لایه ۲.۵ متری BHS',
      category: 'خطوط تولید',
      client: 'کارخانجات کارتن و بسته‌بندی سلولزی (قزوین)',
      year: 2018,
      origin: 'آلمان 🇩🇪 (وایهر)',
      status: 'حمل دریایی با ۱۶ کانتینر ۴۰ فوت HC',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      specs: 'ظرفیت ۳۰۰ متر در دقیقه · کنترل PLC زیمنس S7-1500 · دایکات روتاری',
      brand: 'BHS Corrugated'
    },
    {
      id: 'proj-6',
      title: 'دستگاه تزریق پلاستیک تمام‌الکتریک ENGEL 200T',
      category: 'پلاستیک',
      client: 'صنایع تجهیزات پزشکی و دارویی (تهران)',
      year: 2024,
      origin: 'اتریش 🇦🇹 (شورتبرگ)',
      status: 'موجود در انبار اتریش (آماده بارگیری)',
      badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
      specs: 'دقت تزریق میکرونی · مناسب کلین‌روم کلاس ۱۰۰۰۰ · موتورهای سروو اتریشی',
      brand: 'ENGEL'
    },

    // --- 25 New Verified Projects ---
    {
      id: 'proj-7',
      title: 'دستگاه تراش CNC ۴ محور دو اسپیندل Index G200',
      category: 'CNC',
      client: 'صنایع هوانوردی و قطعات دقیق (اصفهان)',
      year: 2020,
      origin: 'آلمان 🇩🇪 (اسلینگن)',
      status: 'ترخیص قطعی از گمرک شهریار تهران',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      specs: 'قطر چرخش ۲۲۰ mm · کنترل زیمنس Sinumerik 840D sl · تغذیه‌کننده بار اتوماتیک فیدر',
      brand: 'INDEX'
    },
    {
      id: 'proj-8',
      title: 'دستگاه برش لیزر فایبر ۱۰ کیلووات Bystronic ByStar Fiber',
      category: 'لیزر',
      client: 'صنایع سازه‌های فلزی سنگین (اراک)',
      year: 2022,
      origin: 'سوئیس 🇨🇭 (نیدروانتس)',
      status: 'تحویل نهایی در کارخانه خریدار',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      specs: 'ابعاد میز ۴۰۰۰×۲۰۰۰ mm · سورس لیزر فایبر با بازده ۴۰٪ · بارگیری اتوماتیک ByTrans',
      brand: 'Bystronic'
    },
    {
      id: 'proj-9',
      title: 'پرس برک CNC هیدرولیک ۳۲۰ تن Trumpf TruBend 5320',
      category: 'پرس',
      client: 'کارخانجات تابلوسازی و تجهیزات برق (تبریز)',
      year: 2021,
      origin: 'آلمان 🇩🇪 (دیتزینگن)',
      status: 'ترخیص و نصب در سایت صنعتی تبریز',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
      specs: 'طول خمکاری ۴۴۲۰ mm · سیستم کنترل زاویه لیزری ACB · سنسور ۶ محور بَک‌گیج هوشمند',
      brand: 'TRUMPF'
    },
    {
      id: 'proj-10',
      title: 'سلول رباتیک بسته‌بندی و پالتایزینگ ABB IRB 660',
      category: 'رباتیک',
      client: 'مجتمع صنایع غذایی و لبنی (آمل)',
      year: 2023,
      origin: 'سوئد 🇸🇪 (وستراس)',
      status: 'راه‌اندازی خط و تحویل کلید در دست',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      specs: 'ظرفیت حمل ۲۵۰ کیلوگرم · شعاع کاری ۳.۱۵ متر · گریپر وکیوم ماتریسی چندردیفه',
      brand: 'ABB'
    },
    {
      id: 'proj-11',
      title: 'دستگاه فرز ۵ محور همزمان Hermle C42 U MT Dynamic',
      category: 'CNC',
      client: 'قالب‌سازی دقیق و ایمپلنت پزشکی (تهران)',
      year: 2022,
      origin: 'آلمان 🇩🇪 (گوشایم)',
      status: 'ترخیص قطعی از بندر شهید رجایی',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
      specs: 'میز چرخشی ۸۰۰ mm · تراشکاری و فرزکاری هیبرید همزمان · دور اسپیندل ۲۴,۰۰۰ rpm',
      brand: 'Hermle'
    },
    {
      id: 'proj-12',
      title: 'پرس هیدرولیک کشش عمیق ۱۲۰۰ تن Dieffenbacher',
      category: 'پرس',
      client: 'مجموعه قطعه‌سازی بدنه خودرو (ساوه)',
      year: 2018,
      origin: 'آلمان 🇩🇪 (اپینگن)',
      status: 'ترخیص و پایان بتن‌ریزی فونداسیون',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      specs: 'کوسن هیدرولیک ۴۰۰ تن CNC · سرعت فرود ۶۰۰ mm/s · سیستم بازیافت توان انرژی هیدرولیک',
      brand: 'Dieffenbacher'
    },
    {
      id: 'proj-13',
      title: 'خط اکستروژن لوله پلی‌اتیلن ۵ لایه KraussMaffei تا ۶۳۰mm',
      category: 'خطوط تولید',
      client: 'صنایع انتقال آب و پتروشیمی (خوزستان)',
      year: 2019,
      origin: 'آلمان 🇩🇪 (مونیخ)',
      status: 'حمل دریایی با کانتینرهای اوپن‌تاپ',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
      specs: 'قطر لوله ۱۱۰ تا ۶۳۰ mm · گراویمتریک دوزینگ دیجیتال آنلاین · حوضچه خنک‌کننده استیل ۳۱۶',
      brand: 'KraussMaffei'
    },
    {
      id: 'proj-14',
      title: 'دستگاه وایرکات CNC میکرونی AgieCharmilles CUT P 550',
      category: 'CNC',
      client: 'صنایع قالب‌های پروگرسیو و سنبه‌ماتریس (کرج)',
      year: 2021,
      origin: 'سوئیس 🇨🇭 (ژنو)',
      status: 'تحویل نهایی و راه‌اندازی با سیم ۰.۱',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?auto=format&fit=crop&w=800&q=80',
      specs: 'کورس کورس ۵۵۰×۳۵۰×۴۰۰ mm · ژنراتور CleanCut برای صافی سطح Ra ۰.۰۸ · سیم‌کشی اتوماتیک',
      brand: 'GF Machining Solutions'
    },
    {
      id: 'proj-15',
      title: 'کمپرسور اسکرو اویل‌فری صنعتی Kaeser DSG 290-2 SFC',
      category: 'کمپرسور',
      client: 'کارخانجات داروسازی و تزریقی (رشت)',
      year: 2023,
      origin: 'آلمان 🇩🇪 (کوبورگ)',
      status: 'ترخیص هوایی از گمرک امام خمینی',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      specs: 'دبی هوای فشرده ۲۹.۴ m³/min · درایو دور متغیر اینورتر SFC · استاندارد هوای پاک ISO Class 0',
      brand: 'Kaeser'
    },
    {
      id: 'proj-16',
      title: 'ربات جوشکاری نقطه‌ای سنگین Fanuc R-2000iC/165F',
      category: 'رباتیک',
      client: 'خطوط بدنه و شاسی خودروهای تجاری (تهران)',
      year: 2022,
      origin: 'لوکزامبورگ 🇱🇺 (اش-سور-الزت)',
      status: 'تحویل و کالیبراسیون تخصصی مسیر',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      specs: 'توان حمل ۱۶۵ کیلوگرم · گان جوشکاری سروو موتور Servogun · پکیج شلنگ و کابل مخفی DressPack',
      brand: 'Fanuc'
    },
    {
      id: 'proj-17',
      title: 'دستگاه واترجت ۵ محور دقیق Flow Mach 500 Dynamic XD',
      category: 'لیزر',
      client: 'برش کامپوزیت‌های هوایی، سنگ و تیتانیوم (مشهد)',
      year: 2020,
      origin: 'آلمان 🇩🇪 (برتن)',
      status: 'ترخیص قطعی از بندر شهید رجایی',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
      specs: 'پمپ فوق فشار ۶۵۰۰ بار HyperJet · هد دینامیک ۵ محور XD با جبران زاویه مخروطی برش',
      brand: 'Flow Waterjet'
    },
    {
      id: 'proj-18',
      title: 'دستگاه چاپ فلکسو ۱۰ رنگ سیلندر مرکزی Windmöller & Hölscher',
      category: 'خطوط تولید',
      client: 'مجتمع صنایع چاپ و بسته‌بندی انعطاف‌پذیر (همدان)',
      year: 2017,
      origin: 'آلمان 🇩🇪 (لنگریش)',
      status: 'ترخیص و نصب توسط تکنسین اروپایی',
      badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      specs: 'عرض چاپ ۱۳۰۰ mm · سرعت ۵۰۰ متر بر دقیقه · تعویض سریع آستین (Sleeve) و کنترل هوشمند رنگ',
      brand: 'W&H'
    },
    {
      id: 'proj-19',
      title: 'دستگاه تراش CNC سنگین Gildemeister NEF 600',
      category: 'CNC',
      client: 'صنایع نفت و گاز و شیرآلات سرچاهی (اهواز)',
      year: 2019,
      origin: 'آلمان 🇩🇪 (بیله‌فلد)',
      status: 'تحویل نهایی در کارگاه منطقه صنعتی',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
      specs: 'طول تراشکاری ۲۰۰۰ mm · گلویی اسپیندل ۱۰۲ mm · تارت ۱۲ ایستگاه ابزار زنده VDI 40',
      brand: 'DMG MORI'
    },
    {
      id: 'proj-20',
      title: 'دستگاه بسته‌بندی ترموفرمینگ اتوماتیک Multivac R 535',
      category: 'بسته‌بندی',
      client: 'صنایع فرآورده‌های پروتئینی و گوشتی (شیراز)',
      year: 2023,
      origin: 'آلمان 🇩🇪 (ولفرتشوندن)',
      status: 'ترخیص قطعی و راه‌اندازی اتمسفر اصلاح‌شده (MAP)',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80',
      specs: 'سرعت ۱۵ سیکل در دقیقه · تزریق گاز خنثی نیتروژن · سازگار کامل با فویل‌های انعطاف‌پذیر و سخت',
      brand: 'Multivac'
    },
    {
      id: 'proj-21',
      title: 'دستگاه لوله‌خم‌کن تمام‌الکتریک ۹ محور BLM ELECT 102',
      category: 'CNC',
      client: 'تولید شاسی و سیستم اگزوز خودروهای سنگین (تبریز)',
      year: 2021,
      origin: 'ایتالیا 🇮🇹 (کانتو)',
      status: 'ترخیص گمرک سهلان تبریز و تحویل کارخانه',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
      specs: 'ظرفیت قطر لوله تا ۱۰۲ mm · شعاع خم متغیر و چندطبقه قالب · نرم‌افزار سه‌بعدی شبیه‌سازی VGP3D',
      brand: 'BLM Group'
    },
    {
      id: 'proj-22',
      title: 'پرس پانچ CNC پرسرعت Trumpf TruPunch 5000',
      category: 'پرس',
      client: 'صنایع آسانسور، پله‌برقی و تابلوبرق (زنجان)',
      year: 2020,
      origin: 'آلمان 🇩🇪 (دیتزینگن)',
      status: 'نصب، آزمون ضربه و راه‌اندازی خط',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581092787765-e3dec91144e3?auto=format&fit=crop&w=800&q=80',
      specs: 'نیروی پانچ ۲۲۰ کیلونیوتن · نرخ ضربه ۱۲۰۰ در دقیقه · تعویض ابزار فول اتومات ۲.۸ ثانیه‌ای',
      brand: 'TRUMPF'
    },
    {
      id: 'proj-23',
      title: 'خط اتوماتیک تولید کیسه و پاکت سیمان Windmöller AD 8330',
      category: 'خطوط تولید',
      client: 'کارخانجات پاکت‌سازی و صنایع معدنی (یزد)',
      year: 2018,
      origin: 'اتریش 🇦🇹 (وین)',
      status: 'ترخیص قطعی گمرکی بر مبنای تشریفات CFR',
      badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      specs: 'تولید ۳۳۰ پاکت در دقیقه · سیستم چسب سرد و گرم هیبریدی · دوخت انتهایی بدون نشتی پودری',
      brand: 'W&H / Garant'
    },
    {
      id: 'proj-24',
      title: 'دستگاه تزریق پلاستیک دو صفحه‌ای سنگین KraussMaffei GX 650',
      category: 'پلاستیک',
      client: 'تولید جعبه‌های صنعتی باتری و پالتهای پلیمری (کاشان)',
      year: 2022,
      origin: 'آلمان 🇩🇪 (مونیخ)',
      status: 'تحویل در خط تولید کارخانه خریدار',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
      specs: 'تناژ گیره ۶۵۰ تن · کنترلر لمسی هوشمند MC6 · ربات خروج قطعه خطی ۳ محوره سروو',
      brand: 'KraussMaffei'
    },
    {
      id: 'proj-25',
      title: 'دستگاه سنگ تخت و مقاطع دقیق Blohm Planomat HP 612',
      category: 'CNC',
      client: 'تولید تیغه‌های صنعتی، ریل‌ها و ابزار دقیق (اراک)',
      year: 2021,
      origin: 'آلمان 🇩🇪 (هامبورگ)',
      status: 'ترخیص و تحویل با گزارش کالیبراسیون هندسی',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      specs: 'میز سنگ‌زنی ۱۲۰۰×۶۰۰ mm · اسپیندل سنگ ۱۵ کیلووات · سیستم اندازه‌گیری لیزری ابعاد کار',
      brand: 'Blohm'
    },
    {
      id: 'proj-26',
      title: 'ربات پاشش رنگ صنعتی ضدانفجار Dürr EcoRP E043i',
      category: 'رباتیک',
      client: 'صنایع رنگ‌آمیزی بدنه خودرو و لوازم خانگی (اصفهان)',
      year: 2022,
      origin: 'آلمان 🇩🇪 (بیتیگهایم)',
      status: 'ترخیص و اجرای کلین‌روم سالن رنگ',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      specs: 'استاندارد ضدانفجار ATEX Zone 1 · نازل اتمایزر روتاری ۶۰,۰۰۰ دور در دقیقه با راندمان رنگ ۹۵٪',
      brand: 'Dürr'
    },
    {
      id: 'proj-27',
      title: 'دستگاه برش لوله و پروفیل لیزری Bystronic ByTube Star 130',
      category: 'لیزر',
      client: 'صنایع سازه و مبلمان اداری مدرن (تهران)',
      year: 2023,
      origin: 'سوئیس 🇨🇭 (نیدروانتس)',
      status: 'ترخیص از گمرک فرودگاه امام خمینی',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      specs: 'برش لوله از قطر ۱۰ تا ۱۳۰ mm · طول شاخه ۶.۵ متر · سیستم بارگیری باندل اتوماتیک تا ۴ تن',
      brand: 'Bystronic'
    },
    {
      id: 'proj-28',
      title: 'کمپرسور توربو سانتریفیوژ اویل‌فری Atlas Copco ZH 1000',
      category: 'کمپرسور',
      client: 'مجتمع پتروشیمی و گازهای صنعتی (عسلویه)',
      year: 2020,
      origin: 'بلژیک 🇧🇪 (آنتورپ)',
      status: 'ترخیص بندر امام و راه‌اندازی با نظارت مستقیم مهندسین اروپایی',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      specs: 'فشار کاری ۱۰.۵ بار · دبی ۹,۵۰۰ m³/h · ایمپلرهای تیتانیومی ماشینکاری‌شده با CNC ۵ محور',
      brand: 'Atlas Copco'
    },
    {
      id: 'proj-29',
      title: 'دستگاه بسته‌بندی کارتونر پیوسته Uhlmann C 2305',
      category: 'بسته‌بندی',
      client: 'کارخانجات داروسازی و آنتی‌بیوتیک (تهران)',
      year: 2021,
      origin: 'آلمان 🇩🇪 (لاوپهایم)',
      status: 'ترخیص با گواهی معتبر GMP اروپا',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80',
      specs: 'سرعت ۳۰۰ جعبه در دقیقه · فیدر اتوماتیک بروشور و جعبه · سنسورهای بارکدخوان و Vision OCR',
      brand: 'Uhlmann'
    },
    {
      id: 'proj-30',
      title: 'دستگاه بورینگ CNC سنگین جدول‌دار Škoda HCW 2',
      category: 'CNC',
      client: 'صنایع سنگین و ماشین‌سازی توربین‌های نیروگاهی (کرج)',
      year: 2018,
      origin: 'جمهوری چک 🇨🇿 (پلزن)',
      status: 'حمل دریایی و بوژی‌های فوق‌سنگین کمرشکن',
      badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      specs: 'قطر اسپیندل ۱۶۰ mm · کورس محور X ۱۰ متر · محور Y ۴ متر · میز چرخشی CNC با تحمل ۶۰ تن وزن',
      brand: 'ŠKODA'
    },
    {
      id: 'proj-31',
      title: 'دستگاه بادکن و دمشی بطری پت Krones Contiform 3 Pro',
      category: 'پلاستیک',
      client: 'کارخانجات آبمیوه، روغن و نوشیدنی‌های گازدار (ارومیه)',
      year: 2022,
      origin: 'آلمان 🇩🇪 (نویتراوبلینگ)',
      status: 'تحویل نهایی، تست CIP و بهره‌برداری',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
      specs: 'تولید ۲۴,۰۰۰ بطری در ساعت · سیستم بازیافت هوای فشرده AirWizard · صرفه‌جویی انرژی مصرفی ۴۵٪',
      brand: 'Krones'
    }
  ];

  const categories = ['همه', 'CNC', 'پرس', 'لیزر', 'رباتیک', 'خطوط تولید', 'پلاستیک', 'بسته‌بندی', 'کمپرسور'];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = filter === 'همه' || p.category === filter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        p.title.toLowerCase().includes(q) || 
        p.client.toLowerCase().includes(q) || 
        p.origin.toLowerCase().includes(q) || 
        p.specs.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [projects, filter, searchQuery]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  return (
    <section id="portfolio" className="py-20 bg-[#0b0f14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>کارنامه، سوابق ترخیص و اصالت تجاری</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
              نمونه پروژه‌ها و ماشین‌آلات ترخیص‌شده
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              سوابق مستند واردات، بازرسی حضوری در کارخانجات آلمان، اتریش، سوئیس و ایتالیا، ترخیص قطعی در بنادر شهید رجایی و گمرکات زمینی و تحویل در خط تولید صنایع سراسر کشور.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-white/10 text-xs self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400">بانک پروژه‌ها:</span>
            <span className="font-bold text-amber-400 font-mono text-sm">{projects.length} دستگاه ثبت‌شده</span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/10 mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
            {categories.map((c) => {
              const count = c === 'همه' 
                ? projects.length 
                : projects.filter(p => p.category === c).length;
              return (
                <button
                  key={c}
                  onClick={() => {
                    setFilter(c);
                    setVisibleCount(9);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    filter === c
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950/70 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
                  }`}
                >
                  <span>{c}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    filter === c ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(9);
              }}
              placeholder="جستجوی مدل، برند، شهر..."
              className="w-full pl-3 pr-9 py-2 text-xs bg-slate-950/90 text-white rounded-xl border border-white/10 focus:border-amber-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter if Filtered */}
        {(filter !== 'همه' || searchQuery) && (
          <div className="text-xs text-slate-400 mb-4 flex items-center justify-between">
            <span>
              نمایش <strong className="text-amber-400 font-mono">{filteredProjects.length}</strong> مورد مطابق با فیلتر انتخابی
            </span>
            <button 
              onClick={() => { setFilter('همه'); setSearchQuery(''); }}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-white/5">
            <Search className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <h4 className="text-white font-bold text-base mb-1">دستگاهی با این مشخصات یافت نشد</h4>
            <p className="text-slate-400 text-xs max-w-md mx-auto mb-4">
              می‌توانید دستگاه مورد نظر خود را سفارش دهید؛ کارشناسان اروپایی ما آن را در شبکه کارخانجات اروپا جستجو و تأمین خواهند کرد.
            </p>
            <button
              onClick={() => onRequestInquiry('دستگاه سفارشی')}
              className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-bold rounded-xl hover:bg-amber-300 transition-colors"
            >
              ثبت استعلام دستگاه سفارشی
            </button>
          </div>
        )}

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-amber-500/5 bg-slate-900/40"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Origin Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-slate-900/90 text-slate-200 border border-white/10 backdrop-blur-md">
                      {item.origin}
                    </span>
                  </div>

                  {/* Status Tag */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md border backdrop-blur-md ${item.badgeColor}`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Category Pill at bottom of image */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-400/90 text-slate-950 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <h3 className="font-bold text-white text-base mb-1.5 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item.client}</span>
                    </div>
                    <span className="text-slate-600">·</span>
                    <span className="font-mono text-slate-300">{item.year}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-white/5 line-clamp-3">
                    {item.specs}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-auto">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  برگ سبز و اصالت فنی
                </span>

                <button
                  onClick={() => onRequestInquiry(item.title)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer py-1"
                >
                  <span>استعلام دستگاه مشابه</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 9, filteredProjects.length))}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 hover:border-amber-400 text-sm font-bold transition-all shadow-lg hover:shadow-amber-500/10 cursor-pointer"
            >
              <span>مشاهده پروژه‌های بیشتر</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/10 text-xs font-mono text-amber-400">
                +{filteredProjects.length - visibleCount} دستگاه دیگر
              </span>
            </button>
            <p className="text-slate-500 text-xs mt-2">
              نمایش {displayedProjects.length} از {filteredProjects.length} پروژه ثبت‌شده
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
