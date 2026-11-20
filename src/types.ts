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

export interface StatsData {
  totalMachines: number;
  totalInquiries: number;
  pendingInquiries: number;
  countriesAvailable: number;
  cfrShipmentsYear: number;
  activeOffices: number;
  experienceYears: number;
}
