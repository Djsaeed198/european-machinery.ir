import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface MachineItem {
  id: string;
  title: string;
  model: string;
  category: string;
  condition: 'نو (New)' | 'استوک کارخانه‌ای (Factory Stock)' | 'دست‌دوم تمیز (Used/Inspected)';
  country: 'آلمان 🇩🇪' | 'اتریش 🇦🇹' | 'سوئیس 🇨🇭' | 'ایتالیا 🇮🇹' | 'آمریکا 🇺🇸';
  city: string;
  year: number;
  price: string;
  image: string;
  specs: { [key: string]: string };
  description: string;
  deliveryTerms: string;
  featured?: boolean;
}

export interface InquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  serviceType: string;
  category?: string;
  machineId?: string;
  machineTitle?: string;
  message: string;
  budget?: string;
  status: 'جدید' | 'در حال بررسی در اتریش' | 'استعلام قیمت ارسال شد' | 'تکمیل شده';
  createdAt: string;
}

// Initial Seed Machines Database
let machinesDb: MachineItem[] = [
  {
    id: 'em-101',
    title: 'دستگاه فرز ۵ محور سی‌ان‌سی پرسرعت',
    model: 'DMG MORI DMU 50 3rd Gen',
    category: 'تراش و فرز (CNC)',
    condition: 'دست‌دوم تمیز (Used/Inspected)',
    country: 'آلمان 🇩🇪',
    city: 'مونیخ',
    year: 2020,
    price: 'استعلام قیمت (تحویل CFR)',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    specs: {
      'کورس حرکتی': 'X: 650 mm / Y: 520 mm / Z: 475 mm',
      'سرعت اسپیندل': '15,000 RPM (Haimer)',
      'سیستم کنترل': 'Heidenhain TNC 640',
      'تعداد ابزار': '۳۰ عددی اتوماتیک (ATC)',
      'ساعت کارکرد': '۳,۴۰۰ ساعت واقعی'
    },
    description: 'دستگاه فوق‌العاده تمیز در کارگاه قالب‌سازی اتریش، بدون هیچ‌گونه ضربه یا لرزش، دارای گواهی سلامت فنی و هندسی TÜV.',
    deliveryTerms: 'CFR بندرعباس / بوشهر همراه با پکینگ لیست و اسناد ترخیص',
    featured: true
  },
  {
    id: 'em-102',
    title: 'پرس هیدرولیک کشش عمیق و قالب‌سازی ۶۳۰ تن',
    model: 'SCHULER SMG 630 Heavy Duty',
    category: 'پرس‌های هیدرولیک و مکانیکی',
    condition: 'استوک کارخانه‌ای (Factory Stock)',
    country: 'آلمان 🇩🇪',
    city: 'اشتوتگارت',
    year: 2018,
    price: 'استعلام قیمت (تحویل CFR)',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    specs: {
      'ظرفیت اسمی': '۶۳۰ تن هیدرولیک',
      'ابعاد میز کار': '۲۵۰۰ × ۱۶۰۰ میلی‌متر',
      'کورس پیستون': '۸۰۰ میلی‌متر',
      'سرعت بازگشت': '۳۵۰ mm/s',
      'سیستم ایمنی': 'پرده نوری سنسوریک Sick آلمان'
    },
    description: 'مناسب قطعه‌سازی خودرو و فرم‌دهی ورق‌های فولادی ضخیم، بازرسی‌شده در فرانکفورت توسط مهندسین European Machinery.',
    deliveryTerms: 'CFR با حمل ویژه Flat Rack به همراه ترانزیت بیمه‌شده',
    featured: true
  },
  {
    id: 'em-103',
    title: 'دستگاه برش لیزر فایبر صنعتی ۱۲ کیلووات',
    model: 'TRUMPF TruLaser 5030 fiber (12kW)',
    category: 'برش لیزر و حکاکی',
    condition: 'دست‌دوم تمیز (Used/Inspected)',
    country: 'اتریش 🇦🇹',
    city: 'وین',
    year: 2021,
    price: 'استعلام قیمت (تحویل CFR)',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    specs: {
      'توان سورس لیزر': '۱۲,۰۰۰ وات فایبر اصل ترومپف',
      'ابعاد میز برش': '۳۰۰۰ × ۱۵۰۰ میلی‌متر دوار تعویض اتوماتیک',
      'حداکثر ضخامت برش فولاد': '۳۵ میلی‌متر کربن استیل / ۳۰ میلی‌متر استیل',
      'شتاب حرکت': 'تا 2G با هد اتوفوکوس هوشمند'
    },
    description: 'کارکرد در کارخانه صنایع هوایی در اتریش با سابقه سرویس‌های دوره‌ای منظم، خنک‌کننده چیلر دوبل و نرم‌افزار اورجینال TruTops.',
    deliveryTerms: 'CFR کلیه بنادر جنوبی با گواهی مبدأ اتریشی',
    featured: true
  },
  {
    id: 'em-104',
    title: 'سلول رباتیک صنعتی ۶ محوره جوشکاری و جابجایی',
    model: 'KUKA KR 210 R2700 prime + Fronius Cold Metal',
    category: 'ربات‌های صنعتی و اتوماسیون',
    condition: 'استوک کارخانه‌ای (Factory Stock)',
    country: 'اتریش 🇦🇹',
    city: 'لینتس',
    year: 2022,
    price: 'استعلام قیمت (تحویل CFR)',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    specs: {
      'حداکثر ظرفیت بار': '۲۱۰ کیلوگرم',
      'دسترسی بازو': '۲,۷۰۰ میلی‌متر شعاع کاری',
      'کنترلر': 'KR C4 با پنل تاچ هوشمند',
      'پکیج جوش': 'Fronius TPS 500i CMT فول اتوماتیک'
    },
    description: 'سیستم رباتیک کامل همراه با ریل و پوزیشنر دو محوره، تست عملکرد در کارخانه لینتس بدون خطای انحراف تکرارپذیری.',
    deliveryTerms: 'CFR بندرعباس آماده ارسال فوری کانتینری',
    featured: true
  },
  {
    id: 'em-105',
    title: 'خط کامل تولید کارتن و ورق فلوتینگ چندلایه',
    model: 'BHS Corrugated Line 2500mm',
    category: 'صنایع کارتن‌سازی و بسته‌بندی',
    condition: 'دست‌دوم تمیز (Used/Inspected)',
    country: 'آلمان 🇩🇪',
    city: 'هامبورگ',
    year: 2017,
    price: 'استعلام قیمت (تحویل CFR)',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    specs: {
      'عرض مفید کاری': '۲,۵۰۰ میلی‌متر',
      'سرعت تولید خط': '۳۰۰ متر بر دقیقه',
      'انواع فلوت': 'B-Flute, C-Flute, E-Flute سه و پنج لایه',
      'بخش برش و تا': 'اسلاتر اتوماتیک + برش روتاری ۴ رنگ'
    },
    description: 'خط صنعتی عظیم کارتن‌سازی در حال کار در آلمان. امکان بازدید حضوری یا ویدیوکال زنده فنی پیش از عقد قرارداد.',
    deliveryTerms: 'CFR با ۱۲ کانتینر ۴۰ فوت و نظارت تیم اروپایی بر دمونتاژ',
    featured: true
  },
  {
    id: 'em-106',
    title: 'دستگاه تزریق پلاستیک تمام الکتریک اروپایی',
    model: 'ENGEL e-motion 440/160 T (اتریش)',
    category: 'صنایع پلاستیک و چاپ',
    condition: 'نو (New)',
    country: 'اتریش 🇦🇹',
    city: 'شورتبرگ',
    year: 2024,
    price: 'استعلام قیمت ویژه کارخانه',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    specs: {
      'نیروی گیره': '۱۶۰ تن سروو الکتریک',
      'قطر ماردون': '۴۵ میلی‌متر نیتراسیون سخت',
      'حجم تزریق': '۲۵۰ گرم پلی‌پروپیلن',
      'فاصله میله‌های راهنما': '۵۲۰ × ۵۲۰ میلی‌متر',
      'مصرف انرژی': 'کاهش ۶۰ درصدی مصرف نسبت به هیدرولیک'
    },
    description: 'تکنولوژی شماره یک اتریش در تزریق پلاستیک دقیق با دقت میکرونی، صفر کیلومتر با بسته‌بندی و پالت چوبی استاندارد صادراتی.',
    deliveryTerms: 'تحویل CFR بنادر ایران با گواهی تست کارخانه و وارانتی',
    featured: false
  },
  {
    id: 'em-107',
    title: 'خط کامل تولید و بسته‌بندی شیر خشک و فرآوری لبنیات',
    model: 'GEA Niro Spray Dryer & Evaporator Line',
    category: 'خطوط تولید و کارخانجات',
    condition: 'دست‌دوم تمیز (Used/Inspected)',
    country: 'سوئیس 🇨🇭',
    city: 'زوریخ',
    year: 2019,
    price: 'استعلام قیمت مهندسی',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    specs: {
      'ظرفیت تبخیر آب': '۲,۰۰۰ کیلوگرم در ساعت',
      'جنس مخازن و مسیرها': 'استنلس استیل استریل 316L دارویی و غذایی',
      'سیستم شستشو': 'CIP تمام اتوماتیک با کنترل PLC زیمنس',
      'بسته‌بندی': 'سیستم پرکن کیسه ۲۵ کیلویی تحت گاز بی‌اثر'
    },
    description: 'یک خط فوق‌العاده استاندارد از کارخانه معتبر لبنیاتی سوئیس با تمامی پایپینگ‌ها، بویلر و چیلرهای کمکی استاندارد بهداشتی اتحادیه اروپا.',
    deliveryTerms: 'CFR همراه با نقشه کامل P&ID و داکیومنت فنی راه‌اندازی',
    featured: true
  },
  {
    id: 'em-108',
    title: 'کمپرسور اسکرو صنعتی فشار قوی اویل فری (Oil-Free)',
    model: 'ATLAS COPCO ZR 250 VSD+ (آلمان/بلژیک)',
    category: 'کمپرسورهای هوا و گاز',
    condition: 'استوک کارخانه‌ای (Factory Stock)',
    country: 'آلمان 🇩🇪',
    city: 'اسن',
    year: 2021,
    price: 'استعلام قیمت (تحویل CFR)',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    specs: {
      'دبی هوادهی': '۴۲ متر مکعب بر دقیقه (Free Air Delivery)',
      'فشار کاری': '۸.۶ بار پیوسته',
      'توان الکتروموتور': '۲۵۰ کیلووات دور متغیر (اینورتر)',
      'درایر مجتمع': 'MD ادسورپشن بدون افت نقطه شبنم (-40°C)'
    },
    description: 'هوای صددرصد عاری از روغن مطابق استاندارد ISO 8573-1 Class 0، کاملاً مناسب صنایع دارویی، پتروشیمی و غذایی.',
    deliveryTerms: 'CFR بنادر ایران همراه با پکینگ چوبی ضد رطوبت',
    featured: false
  },
  {
    id: 'em-109',
    title: 'دستگاه تراش سنگین CNC کلاچ‌دار ۴ متری',
    model: 'WEILER E90 Cycle Lathe (آلمان)',
    category: 'تراش و فرز (CNC)',
    condition: 'دست‌دوم تمیز (Used/Inspected)',
    country: 'آلمان 🇩🇪',
    city: 'نورنبرگ',
    year: 2019,
    price: 'استعلام قیمت (تحویل CFR)',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
    specs: {
      'طول ماشینکاری بین مرغک‌ها': '۴,۰۰۰ میلی‌متر',
      'قطر چرخش روی بستر': '۹۰۰ میلی‌متر',
      'قطر گلویی اسپیندل': '۱۶۵ میلی‌متر سنگین',
      'کنترلر': 'Siemens Sinumerik 840D sl'
    },
    description: 'دستگاه تراش غول‌پیکر مخصوص لوله‌ها، شفت‌های نیروگاهی و صنایع نفت و گاز. بازرسی هندسی مرجع در آلمان انجام شده است.',
    deliveryTerms: 'CFR با مهاربندی تخصصی کانتینری و بیمه دریایی',
    featured: false
  },
  {
    id: 'em-110',
    title: 'خط کامل تولید تایر خودرو و قطعات لاستیکی',
    model: 'KRUPP / HF Tire Curing Press & Extrusion Line',
    category: 'خطوط تولید و کارخانجات',
    condition: 'دست‌دوم تمیز (Used/Inspected)',
    country: 'ایتالیا 🇮🇹',
    city: 'میلان',
    year: 2018,
    price: 'استعلام قیمت مهندسی',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    specs: {
      'ظرفیت تولید': '۱,۲۰۰ حلقه تایر سواری در روز',
      'تعداد پرس‌های پخت': '۱۲ ایستگاه هیدرولیک بخار داغ',
      'اکسترودر': 'اکسترودر پین‌دار سرد ۹۰ میلی‌متری',
      'سیستم تست نهایی': 'دستگاه تست بالانس و یکنواختی X-Ray'
    },
    description: 'خط صنعتی مکانیزه تولید تایر سواری با استانداردهای رادیال اروپایی، آماده دمونتاژ تحت نظارت مستقیم کارشناسان اروپایی.',
    deliveryTerms: 'CFR به همراه خدمات نقشه‌برداری، علامت‌گذاری کابل‌ها و اسناد EPL',
    featured: true
  }
];

// Initial Inquiries Database
let inquiriesDb: InquiryItem[] = [
  {
    id: 'inq-901',
    name: 'مهندس رضایی (صنایع قطعه‌سازی خودرو مشهد)',
    phone: '09121112233',
    email: 'rezaei@autoparts-iran.com',
    company: 'صنایع قطعه‌سازی مشهد',
    serviceType: 'خرید ماشین‌آلات نو و دست‌دوم',
    category: 'تراش و فرز (CNC)',
    machineId: 'em-101',
    machineTitle: 'دستگاه فرز ۵ محور سی‌ان‌سی پرسرعت DMG MORI',
    message: 'سلام، نیاز به استعلام قیمت قطعی CFR بندرعباس برای دستگاه فرز ۵ محور به همراه کاتالوگ ابزارگیرها داریم. زمان تحویل چقدر است؟',
    budget: '۲ تا ۳ میلیارد تومان',
    status: 'در حال بررسی در اتریش',
    createdAt: '2026-11-01 14:20'
  },
  {
    id: 'inq-902',
    name: 'دکتر افشار (کارخانه بسته‌بندی و مقواساز پارس)',
    phone: '09133334455',
    email: 'afshar@pack-pars.ir',
    company: 'کارتن پارس اصفهان',
    serviceType: 'خرید خط تولید کامل کارخانجات',
    category: 'صنایع کارتن‌سازی و بسته‌بندی',
    machineId: 'em-105',
    machineTitle: 'خط کامل تولید کارتن و ورق فلوتینگ BHS',
    message: 'لطفاً ویدیو کارکرد خط در کارخانه آلمان و پیش‌فاکتور (Proforma) جهت ثبت سفارش در سامانه جامع تجارت را ارسال فرمایید.',
    budget: 'بیش از ۱۰ میلیارد تومان',
    status: 'استعلام قیمت ارسال شد',
    createdAt: '2026-10-30 10:15'
  },
  {
    id: 'inq-903',
    name: 'حاج محمدی (کارگاه قالب‌سازی شمس تهران)',
    phone: '09355556677',
    company: 'قالب‌سازی شمس',
    serviceType: 'خرید ماشین‌آلات نو و دست‌دوم',
    category: 'پرس‌های هیدرولیک و مکانیکی',
    machineId: 'em-102',
    machineTitle: 'پرس هیدرولیک کشش عمیق و قالب‌سازی ۶۳۰ تن',
    message: 'برای ساخت مخازن تحت فشار به پرس سنگین نیاز داریم. آیا امکان پرداخت ارزی در اتریش وجود دارد؟',
    status: 'جدید',
    createdAt: '2026-11-02 08:45'
  }
];

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Log all API requests
  app.use('/api', (req, res, next) => {
    console.log(`[API ${req.method}] ${req.url}`);
    next();
  });

  // ============ MACHINES API ============
  // GET /api/machines - Advanced search & filter
  app.get('/api/machines', (req: Request, res: Response) => {
    let results = [...machinesDb];
    const { category, condition, country, search, featured } = req.query;

    if (category && category !== 'همه') {
      results = results.filter(m => m.category.includes(String(category)));
    }

    if (condition && condition !== 'همه') {
      results = results.filter(m => m.condition.includes(String(condition)));
    }

    if (country && country !== 'همه') {
      results = results.filter(m => m.country.includes(String(country)));
    }

    if (featured === 'true') {
      results = results.filter(m => m.featured);
    }

    if (search) {
      const q = String(search).toLowerCase();
      results = results.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.model.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    }

    res.json({
      ok: true,
      count: results.length,
      machines: results
    });
  });

  // GET /api/machines/:id
  app.get('/api/machines/:id', (req: Request, res: Response) => {
    const item = machinesDb.find(m => m.id === req.params.id);
    if (!item) {
      return res.status(404).json({ ok: false, error: 'دستگاه مورد نظر یافت نشد.' });
    }
    res.json({ ok: true, machine: item });
  });

  // POST /api/machines - Add new machine (Admin)
  app.post('/api/machines', (req: Request, res: Response) => {
    const { title, model, category, condition, country, city, year, price, image, specs, description, deliveryTerms } = req.body;

    if (!title || !model || !category) {
      return res.status(400).json({ ok: false, error: 'عنوان، مدل و دسته‌بندی دستگاه الزامی است.' });
    }

    const newMachine: MachineItem = {
      id: `em-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      model: model.trim(),
      category: category.trim(),
      condition: condition || 'دست‌دوم تمیز (Used/Inspected)',
      country: country || 'آلمان 🇩🇪',
      city: city || 'وین',
      year: Number(year) || new Date().getFullYear(),
      price: price || 'استعلام قیمت (تحویل CFR)',
      image: image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      specs: specs || {},
      description: description || 'دستگاه صنعتی آماده بارگیری و ارسال با شرایط تحویل CFR.',
      deliveryTerms: deliveryTerms || 'CFR بنادر ایران با اسناد کامل گمرکی و بازرسی',
      featured: Boolean(req.body.featured)
    };

    machinesDb.unshift(newMachine);
    console.log(`[Machinery Added] ${newMachine.title} (${newMachine.id})`);

    res.json({
      ok: true,
      message: 'دستگاه صنعتی با موفقیت به کاتالوگ اضافه گردید.',
      machine: newMachine
    });
  });

  // PUT /api/machines/:id - Edit machine (Admin)
  app.put('/api/machines/:id', (req: Request, res: Response) => {
    const idx = machinesDb.findIndex(m => m.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ ok: false, error: 'دستگاه یافت نشد.' });
    }

    machinesDb[idx] = {
      ...machinesDb[idx],
      ...req.body,
      id: machinesDb[idx].id // Preserve ID
    };

    res.json({
      ok: true,
      message: 'مشخصات دستگاه با موفقیت به‌روزرسانی شد.',
      machine: machinesDb[idx]
    });
  });

  // DELETE /api/machines/:id - Delete machine (Admin)
  app.delete('/api/machines/:id', (req: Request, res: Response) => {
    const beforeCount = machinesDb.length;
    machinesDb = machinesDb.filter(m => m.id !== req.params.id);

    if (machinesDb.length === beforeCount) {
      return res.status(404).json({ ok: false, error: 'دستگاه جهت حذف یافت نشد.' });
    }

    res.json({
      ok: true,
      message: 'دستگاه با موفقیت از سیستم حذف شد.'
    });
  });

  // ============ INQUIRIES API ============
  // POST /api/inquiry - Customer inquiry submission
  app.post('/api/inquiry', (req: Request, res: Response) => {
    const { name, phone, email, company, type, serviceType, category, message, machineId, machineTitle, budget } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        ok: false,
        error: 'لطفاً نام و نام خانوادگی و شماره تماس مستقیم خود را وارد فرمایید.'
      });
    }

    const newInquiry: InquiryItem = {
      id: `inq-${Date.now().toString().slice(-4)}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      company: company ? String(company).trim() : undefined,
      serviceType: String(serviceType || type || 'خرید ماشین‌آلات نو و دست‌دوم').trim(),
      category: category ? String(category).trim() : undefined,
      machineId: machineId ? String(machineId).trim() : undefined,
      machineTitle: machineTitle ? String(machineTitle).trim() : undefined,
      message: String(message || 'درخواست استعلام قیمت و مشاوره فنی').trim(),
      budget: budget ? String(budget).trim() : undefined,
      status: 'جدید',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    inquiriesDb.unshift(newInquiry);

    console.log(`[NEW INQUIRY] ID: ${newInquiry.id} | From: ${newInquiry.name} | Phone: ${newInquiry.phone} | Type: ${newInquiry.serviceType}`);

    res.json({
      ok: true,
      message: 'درخواست استعلام شما با موفقیت ثبت گردید. کارشناسان دفاتر تهران و اتریش در اسرع وقت با شما تماس خواهند گرفت.',
      inquiryId: newInquiry.id
    });
  });

  // GET /api/inquiries - List all inquiries (Admin)
  app.get('/api/inquiries', (req: Request, res: Response) => {
    res.json({
      ok: true,
      count: inquiriesDb.length,
      inquiries: inquiriesDb
    });
  });

  // PUT /api/inquiries/:id/status - Update status (Admin)
  app.put('/api/inquiries/:id/status', (req: Request, res: Response) => {
    const item = inquiriesDb.find(i => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({ ok: false, error: 'استعلام یافت نشد.' });
    }

    if (req.body.status) {
      item.status = req.body.status;
    }

    res.json({
      ok: true,
      message: 'وضعیت استعلام به‌روزرسانی شد.',
      inquiry: item
    });
  });

  // DELETE /api/inquiries/:id - Remove inquiry (Admin)
  app.delete('/api/inquiries/:id', (req: Request, res: Response) => {
    inquiriesDb = inquiriesDb.filter(i => i.id !== req.params.id);
    res.json({ ok: true, message: 'استعلام حذف گردید.' });
  });

  // ============ STATS API ============
  app.get('/api/stats', (req: Request, res: Response) => {
    res.json({
      ok: true,
      stats: {
        totalMachines: machinesDb.length,
        totalInquiries: inquiriesDb.length,
        pendingInquiries: inquiriesDb.filter(i => i.status === 'جدید').length,
        countriesAvailable: 5,
        cfrShipmentsYear: 48,
        activeOffices: 2,
        experienceYears: 15
      }
    });
  });

  // ============ STATIC ASSETS & PUBLIC FILES (llms.txt, robots.txt, sitemap.xml) ============
  app.use(express.static(path.resolve(__dirname, 'public')));

  // ============ VITE / STATIC SERVING ============
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`European Machinery server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
