import { Service } from './types';

export const WHATSAPP_NUMBER = '967781633796';
export const ADMIN_PASSCODE = '701953109';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 1,
    name: 'تصميم موقع إلكتروني متكامل',
    shortDescription: 'تصميم موقع إلكتروني احترافي متجاوب مع جميع الشاشات بمواصفات عالية الجودة.',
    features: [
      'تصميم متجاوب يعمل على جميع الأجهزة',
      'واجهة مستخدم سهلة ومبتكرة',
      'تحسين محركات البحث (SEO)',
      'دعم فني لمدة 3 أشهر',
    ],
    price: '500,000 ﷼',
    imageUrls: [
        'https://picsum.photos/seed/website1/600/400',
        'https://picsum.photos/seed/website2/600/400',
        'https://picsum.photos/seed/website3/600/400',
    ],
    scent: {
      icon: 'fa-solid fa-lightbulb',
      text: 'رائحة الابتكار الرقمي',
    },
  },
  {
    id: 2,
    name: 'حملة تسويق إلكتروني شاملة',
    shortDescription: 'حملة تسويقية متكاملة على وسائل التواصل الاجتماعي لتعزيز وجودك الرقمي.',
    features: [
      'إدارة حسابات على 3 منصات اجتماعية',
      'إنشاء محتوى احترافي وجذاب',
      'إعلانات مستهدفة على فيسبوك وانستجرام',
      'تقارير أداء أسبوعية',
    ],
    price: '300,000 ﷼',
    imageUrls: [
        'https://picsum.photos/seed/marketing1/600/400',
        'https://picsum.photos/seed/marketing2/600/400',
    ],
    scent: {
      icon: 'fa-solid fa-rocket',
      text: 'رائحة النجاح التسويقي',
    },
  },
  {
    id: 3,
    name: 'حزمة استشارات أعمال رقمية',
    shortDescription: 'جلسات استشارية مع خبراء في التحول الرقمي وتطوير استراتيجيات الأعمال.',
    features: [
      '4 جلسات استشارية (ساعة لكل جلسة)',
      'تحليل شامل للأعمال والمنافسين',
      'خطة تحول رقمي مخصصة',
      'دليل تنفيذي مفصل',
    ],
    price: '250,000 ﷼',
    imageUrls: ['https://picsum.photos/seed/consulting/600/400'],
    scent: {
      icon: 'fa-solid fa-brain',
      text: 'رائحة الحكمة الاستشارية',
    },
  },
];