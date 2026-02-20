export interface BrandStat {
  value: number;
  suffix: string;
  label: string;
  durationMs: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceFrom?: string;
  icon: string;
  route: string;
}

export interface IndustryItem {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  copy: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
}

export interface InsightItem {
  id: string;
  headline: string;
  body: string;
}

export interface PricingHighlight {
  startingPrice: string;
  features: string[];
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ContactInfo {
  phone: string;
  whatsappPhone: string;
  email: string;
  addressLines: string[];
  hours: string;
}

export interface SocialLink {
  platform: 'LinkedIn' | 'Instagram' | 'Facebook' | 'X';
  url: string;
  isPlaceholder: boolean;
}

export interface SeoRouteMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export const HOME_FEATURED_SERVICES_LIMIT = 8;
export const HOME_FEATURED_INDUSTRIES_LIMIT = 10;

export const CONTACT_INFO: ContactInfo = {
  phone: '+916370931250',
  whatsappPhone: '916370931250',
  email: 'hello@softwarestudios.in',
  addressLines: [
    'KKREATIVE CONCEPTS PRIVATE LIMITED',
    'White House, 1st & 2nd Floors,',
    'Khairatabad, Hyderabad'
  ],
  hours: 'Mon-Sat, 10:00 AM to 6:00 PM'
};

export const BRAND_STATS: BrandStat[] = [
  { value: 12, suffix: '+', label: 'Years of Trusted Delivery', durationMs: 1400 },
  { value: 500, suffix: '+', label: 'Projects Delivered', durationMs: 1800 },
  { value: 15, suffix: '+', label: 'Industry Segments Supported', durationMs: 1500 },
  { value: 98, suffix: '%', label: 'Client Satisfaction', durationMs: 1600 }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    description:
      'A fast and trust-building website that helps people find you, trust you, and contact you.',
    priceFrom: 'Starting ₹24,999',
    icon: '🌐',
    route: '/services#website-development'
  },
  {
    id: 'web-application-development',
    title: 'Web Application Development',
    description: 'Custom web software that reduces manual work and keeps your operations smooth.',
    icon: '🧩',
    route: '/services#web-application-development'
  },
  {
    id: 'android-app-development',
    title: 'Android App Development',
    description: 'Android apps made for real Indian users, simple journeys, and better engagement.',
    icon: '🤖',
    route: '/services#android-app-development'
  },
  {
    id: 'ios-app-development',
    title: 'iOS App Development',
    description: 'iOS apps with premium experience and performance for high-value users.',
    icon: '🍎',
    route: '/services#ios-app-development'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'SEO, social media, and ads that bring quality leads month after month.',
    icon: '📣',
    route: '/services#digital-marketing'
  },
  {
    id: 'graphics-designing',
    title: 'Graphics Designing',
    description: 'Clean and premium graphics for posts, ads, branding, and campaign creatives.',
    icon: '🎨',
    route: '/services#graphics-designing'
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Simple, clear, and customer-focused content for website, social, and campaigns.',
    icon: '✍️',
    route: '/services#content-creation'
  },
  {
    id: 'ai-avatar',
    title: 'AI Avatar',
    description: 'AI avatar videos for explainers, promotions, demos, and customer communication.',
    icon: '🧑‍💻',
    route: '/services#ai-avatar'
  },
  {
    id: 'content-automation',
    title: 'Content Automation',
    description: 'Automate repetitive content tasks so your team saves time and scales output.',
    icon: '🔁',
    route: '/services#content-automation'
  },
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    description: '24x7 chatbots for support, lead capture, FAQs, and faster customer response.',
    icon: '💬',
    route: '/services#ai-chatbots'
  },
  {
    id: 'desktop-application-development',
    title: 'Desktop Application Development',
    description: 'Desktop software for billing, operations, reporting, and office productivity.',
    icon: '🖥️',
    route: '/services#desktop-application-development'
  },
  {
    id: 'ai-ml-integration',
    title: 'AI & ML Integration',
    description: 'Use AI and ML for prediction, insight, and better day-to-day decision support.',
    icon: '🧠',
    route: '/services#ai-ml-integration'
  },
  {
    id: 'ai-agents-automation',
    title: 'AI Agents & Automation',
    description: 'AI agents automate repetitive tasks while your team focuses on growth and sales.',
    icon: '⚙️',
    route: '/services#ai-agents-automation'
  }
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: 'doctors-clinics',
    label: 'Doctors & Clinics',
    icon: '🏥',
    description: 'Help patients find you online and book appointments quickly.'
  },
  {
    id: 'lawyers-legal',
    label: 'Lawyers & Legal',
    icon: '⚖️',
    description: 'Build trust online and receive serious legal inquiries.'
  },
  {
    id: 'architects',
    label: 'Architects',
    icon: '🏗️',
    description: 'Show your portfolio and convert high-value project leads.'
  },
  {
    id: 'interior-designers',
    label: 'Interior Designers',
    icon: '🏠',
    description: 'Visual-first websites that showcase design and attract clients.'
  },
  {
    id: 'hotels-restaurants',
    label: 'Hotels & Restaurants',
    icon: '🏨',
    description: 'Improve bookings with menus, maps, offers, and quick contact.'
  },
  {
    id: 'marriage-palaces',
    label: 'Marriage Palaces',
    icon: '💒',
    description: 'Showcase venue packages and capture event inquiries directly.'
  },
  {
    id: 'clothing-fashion',
    label: 'Clothing & Fashion',
    icon: '👗',
    description: 'Sell better with catalog pages, social traffic, and campaigns.'
  },
  {
    id: 'accessories-jewellery',
    label: 'Accessories & Jewellery',
    icon: '💎',
    description: 'Premium product display with trust and brand storytelling.'
  },
  {
    id: 'electronics-shops',
    label: 'Electronics Shops',
    icon: '📱',
    description: 'Get discovered nearby with local SEO and offer-led pages.'
  },
  {
    id: 'beauty-salons',
    label: 'Beauty & Salons',
    icon: '💄',
    description: 'Increase bookings with offer pages, reviews, and social proof.'
  },
  {
    id: 'shopping-marts',
    label: 'Shopping & Marts',
    icon: '🛒',
    description: 'Promotions and digital listings that drive nearby footfall.'
  },
  {
    id: 'hospitals-medical',
    label: 'Hospitals & Medical',
    icon: '🩺',
    description: 'Clear patient journeys, departments, and easy contact paths.'
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    icon: '🏭',
    description: 'Build B2B trust with catalog systems and strong inquiry funnels.'
  },
  {
    id: 'schools-colleges',
    label: 'Schools & Colleges',
    icon: '🎓',
    description: 'Support admissions, parent updates, and institutional branding.'
  },
  {
    id: 'real-estate-builders',
    label: 'Real Estate & Builders',
    icon: '🏢',
    description: 'Show projects, generate buyer leads, and improve visibility.'
  },
  {
    id: 'many-more',
    label: 'And many more...',
    icon: '➕',
    description: 'If your business serves customers, we can digitalize and scale it.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Free Consultation',
    copy: 'Share your business goal. We listen first and explain in simple language.'
  },
  {
    step: 2,
    title: 'Custom Strategy',
    copy: 'We prepare the right tech, timeline, and budget for your business stage.'
  },
  {
    step: 3,
    title: 'Design & Development',
    copy: 'We build your website, app, or automation system with practical quality.'
  },
  {
    step: 4,
    title: 'Testing & Launch',
    copy: 'We test carefully and launch smoothly across devices and browsers.'
  },
  {
    step: 5,
    title: 'Grow Together',
    copy: 'After launch, we continue with support, updates, and growth improvement.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Dental Clinic',
    location: 'Bhubaneswar',
    quote:
      'After our website went live, new appointment calls started every week. Patients can now find us easily on Google.',
    rating: 5
  },
  {
    name: 'Adv. Ramesh Nayak',
    role: 'Legal Firm',
    location: 'Cuttack',
    quote:
      'My law firm now appears online when people search in my city. The process was simple and affordable.',
    rating: 5
  },
  {
    name: 'Sunita Fashions',
    role: 'Boutique Business',
    location: 'Raipur',
    quote:
      'Their website and social setup helped us get orders from outside our city for the first time.',
    rating: 5
  },
  {
    name: 'Green Valley School',
    role: 'Educational Institution',
    location: 'Sambalpur',
    quote:
      'The school website and parent portal are easy to use. Admission inquiries increased after going digital.',
    rating: 5
  },
  {
    name: 'Sunrise Hotel & Resorts',
    role: 'Hospitality',
    location: 'Puri',
    quote:
      'Before this, we had almost no online visibility. Now online bookings are a major part of our revenue.',
    rating: 5
  },
  {
    name: 'Arora Construction',
    role: 'Real Estate',
    location: 'Delhi NCR',
    quote:
      'One team handled website, ads, and listing flow. We now get genuine buyer leads every week.',
    rating: 5
  }
];

export const INSIGHTS: InsightItem[] = [
  {
    id: 'usa-barber',
    headline: 'If customers cannot find you online, they choose someone else.',
    body:
      'Many Indian businesses still lose daily leads because they are not visible online. A simple digital presence can start recovering those missed customers.'
  },
  {
    id: 'search-behavior',
    headline: 'People trust businesses they can quickly verify online.',
    body:
      'When someone searches for your service, they check website quality, reviews, and easy contact options before calling.'
  },
  {
    id: 'reachability',
    headline: 'Digitalization is not fashion. It is your lead engine.',
    body:
      'Software Studios helps you launch practical systems so customers can find you, trust you, and reach you without friction.'
  }
];

export const PRICING_HIGHLIGHT: PricingHighlight = {
  startingPrice: '₹24,999/-',
  features: ['No hidden charges', 'Flexible payment options', 'Ongoing support included'],
  ctaPrimary: 'Get Custom Quote',
  ctaSecondary: 'Talk to Us'
};

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/software-studios-india', isPlaceholder: true },
  { platform: 'Instagram', url: 'https://www.instagram.com/softwarestudios.in', isPlaceholder: true },
  { platform: 'Facebook', url: 'https://www.facebook.com/softwarestudios.in', isPlaceholder: true },
  { platform: 'X', url: 'https://x.com/softwarestudiosin', isPlaceholder: true }
];

export const ROUTE_SEO: Record<string, SeoRouteMeta> = {
  '/': {
    title: 'Software Studios | Websites, Apps & Digital Growth for Indian Businesses',
    description:
      'Software Studios helps Indian businesses go online with websites, apps, AI automation, and marketing from ₹24,999.',
    ogTitle: 'Software Studios — Your Business Deserves To Be Found Online',
    ogDescription:
      'Trusted since 2014. 12 years of delivery helping Indian businesses grow online with practical budgets.',
    ogImage: '/og/software-studios-home.jpg'
  },
  '/services': {
    title: 'Services | Software Studios',
    description:
      'Explore websites, apps, design, content, AI, chatbot, and digital marketing services for Indian business growth.',
    ogTitle: 'Software Studios Services',
    ogDescription: 'Everything your business needs to thrive online under one roof.',
    ogImage: '/og/software-studios-services.jpg'
  },
  '/industries': {
    title: 'Industries | Software Studios',
    description: 'Trusted across healthcare, legal, education, hospitality, real estate, retail, and more.',
    ogTitle: 'Industries We Serve',
    ogDescription: 'We build digital systems for businesses across 15+ sectors in India.',
    ogImage: '/og/software-studios-industries.jpg'
  },
  '/about': {
    title: 'About | Software Studios',
    description: 'A Kkreative technology wing serving Indian businesses with affordable digital transformation since 2014.',
    ogTitle: 'About Software Studios',
    ogDescription: 'Built for Bharat. Built for Business. Trusted 12 years.',
    ogImage: '/og/software-studios-about.jpg'
  },
  '/contact': {
    title: 'Contact | Software Studios',
    description: 'Call, WhatsApp, or email Software Studios for a free consultation and practical digital roadmap.',
    ogTitle: 'Talk to Software Studios',
    ogDescription: 'Free consultation with practical guidance for your business growth online.',
    ogImage: '/og/software-studios-contact.jpg'
  },
  '/blogs': {
    title: 'Blogs | Software Studios',
    description:
      'Read practical business-tech insights from Software Studios on websites, AI, automation, DevOps, and digital growth.',
    ogTitle: 'Software Studios Blogs',
    ogDescription: 'Simple, practical insights for business owners and growth teams.',
    ogImage: '/og/software-studios-blogs.jpg'
  }
};
