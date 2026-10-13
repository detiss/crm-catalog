import type { Crm } from './crms';

// Англійські переклади даних. Ключі (сегменти, теги) в основних даних лишаються українськими —
// вони використовуються як ідентифікатори фільтрів, тому перекладається лише те, що бачить користувач.

export const SEGMENT_EN: Record<string, string> = {
  'E-commerce': 'E-commerce',
  'Малий бізнес': 'Small business',
  'Середній бізнес': 'Medium business',
  Enterprise: 'Enterprise',
  'B2B-продажі': 'B2B sales',
  'Сервісні центри': 'Service centers',
  'Команди та проєкти': 'Teams & projects',
};

export const TAG_EN: Record<string, string> = {
  'Безкоштовний тариф': 'Free plan',
  'Мобільний застосунок': 'Mobile app',
  Маркетплейси: 'Marketplaces',
  'Нова Пошта': 'Nova Poshta',
  'Месенджери в одному вікні': 'Messengers in one window',
  'Управління проєктами': 'Project management',
  'Фінанси та склад': 'Finance & warehouse',
  'Відкритий код': 'Open source',
  'Low-code': 'Low-code',
  'Gmail / Google': 'Gmail / Google',
  'IP-телефонія': 'IP telephony',
};

export const GROUP_EN: Record<string, string> = {
  Маркетплейси: 'Marketplaces',
  Доставка: 'Delivery',
  Оплати: 'Payments',
  Інше: 'Other',
  Телефонія: 'Telephony',
  CMS: 'CMS',
  'E-commerce': 'E-commerce',
  Месенджери: 'Messengers',
  Google: 'Google',
  Лідогенерація: 'Lead generation',
  Сайти: 'Websites',
  Розсилки: 'Mailings',
  Фіскалізація: 'Fiscalization',
  SMS: 'SMS',
  'Оплати та РРО': 'Payments & fiscal registers',
  ERP: 'ERP',
  Офіс: 'Office suites',
  Аналітика: 'Analytics',
  Основні: 'Main',
};

export const ITEM_EN: Record<string, string> = {
  'Відкрите API': 'Open API',
  'Нова Пошта': 'Nova Poshta',
  Укрпошта: 'Ukrposhta',
  Епіцентр: 'Epicentr',
  ПриватБанк: 'PrivatBank',
  Монобанк: 'Monobank',
  Хорошоп: 'Horoshop',
  'Вчасно.Каса': 'Vchasno.Kasa',
  'АльфаSMS': 'AlphaSMS',
  'Zapier (5000+ сервісів)': 'Zapier (5000+ services)',
};

type Overlay = Partial<Pick<Crm, 'tagline' | 'bestFor' | 'keyFeature' | 'pricingNote' | 'pros' | 'cons'>>;

const CRM_EN: Record<string, Overlay> = {
  keycrm: {
    tagline: 'CRM for online retail: all messengers and marketplaces in one window',
    bestFor: 'Online stores, Instagram/Facebook sellers, marketplace sellers',
    keyFeature: 'One window for Viber, Telegram, Instagram + automatic waybill (TTN) creation',
    pricingNote: 'Base plan with unlimited users; extra fee for exceeding order limits',
    pros: [
      'Automation of orders, messages and tasks tailored to your business',
      'Unlimited users already in the base plan',
      'Intuitive interface — no lengthy training needed',
      'Mobile access to run the business from anywhere',
    ],
    cons: [
      'Limits on orders, leads and messages in the base plan',
      'Extra charge when limits are exceeded',
    ],
  },
  salesdrive: {
    tagline: 'A highly specialized CRM for Ukrainian online stores',
    bestFor: 'Online stores: sellers on Prom, Rozetka and Allo who ship via Nova Poshta / Ukrposhta',
    keyFeature: 'The deepest automation for product businesses: document flow, warehouse, SMS mailings',
    pricingNote: 'Affordable plans for small companies',
    pros: [
      'Sales automation: invoices, customer notifications, order processing',
      'Simple interface and easy rollout for small businesses',
      'Affordable price',
    ],
    cons: [
      'No built-in project management module',
      'Limited task management features',
    ],
  },
  keepincrm: {
    tagline: 'A simple CRM for small business with a friendly pricing policy',
    bestFor: 'Small teams, startups, service businesses',
    keyFeature: 'A fully free plan for 1 user with no time limit',
    pricingNote: 'Free plan available; flexible paid plans to get started',
    pros: [
      'Intuitive interface — rollout without special training',
      'Custom fields and sales funnel configuration',
      'Automation scenarios for leads, tasks and deals',
      'Covers online and offline sales in one system',
    ],
    cons: [
      'Limited project management features',
      'No tools for complex projects',
    ],
  },
  hugeprofit: {
    tagline: 'A universal CRM for SMBs: sales, customers, orders and finance',
    bestFor: 'Small and medium businesses: those who need sales and finance tracked in one place',
    keyFeature: 'Multi-currency financial accounting, automatic status changes by waybill (TTN), document printing',
    pricingNote: 'Flexible plans for small businesses with different needs',
    pros: [
      'Easy sales entry, automatic status updates from the waybill (TTN)',
      'Document printing: fiscal receipts, delivery notes, acts',
      'Financial control: multiple accounts, currencies, income and expense tracking',
      'Easy to roll out and use',
    ],
    cons: [
      'No modules for task and project management',
      'Limited flexibility for specific processes',
    ],
  },
  nethunt: {
    tagline: 'A CRM that lives right inside your Gmail inbox',
    bestFor: 'B2B companies, marketing agencies, IT companies on Google Workspace',
    keyFeature: 'Create deals and customers straight from an incoming email — no tab switching',
    pricingNote: 'Affordable plans + 14-day free trial',
    pros: [
      'Easy to set up — good for a first automation',
      'Email campaigns, sales pipelines, routine automation',
      'Affordable price for small business',
      '14-day free trial of all features',
    ],
    cons: [
      'Depends on Google Workspace — limited without it',
      'Fewer integrations than competitors',
    ],
  },
  uspacy: {
    tagline: 'A single digital workspace — a Ukrainian alternative to Bitrix24',
    bestFor: 'Companies: those used to a social intranet (news feed, groups, chats)',
    keyFeature: 'CRM + tasks + internal communications in one ecosystem',
    pricingNote: 'Commercial plans for small and medium businesses',
    pros: [
      'Intuitive interface and easy rollout',
      'Advanced task and business process automation',
      'All messages from communication channels in one place',
      'Internal news feed on the home screen',
      'Scales as the business grows',
    ],
    cons: [
      'Some features (e.g. the business process builder) are still in development',
    ],
  },
  worksection: {
    tagline: 'A CRM module inside a project management system — "all in one" for teams',
    bestFor: 'Teams: those who need customers, tasks and projects in a single tool',
    keyFeature: 'CRM combined with full project management and teamwork',
    pricingNote: 'A good-value plan for small teams',
    pros: [
      'CRM and project management in one system',
      'Simple interface — easy for the team to adopt',
      'Convenient progress tracking by task',
      'Affordable price',
    ],
    cons: [
      'Project-oriented: limited sales automation',
    ],
  },
  remonline: {
    tagline: 'Order and warehouse tracking for service and repair businesses',
    bestFor: 'Service centers, auto repair shops, electronics repair, tailor shops, cleaning companies',
    keyFeature: 'Specialized intake forms for equipment, receipt printing, spare parts and technician payroll tracking',
    pricingNote: 'Flexible plans that scale with the business',
    pros: [
      'Quick rollout without complex integration',
      'Mobile apps for managers and technicians',
      'Flexible plans that scale',
    ],
    cons: [
      'Basic automation — complex scenarios need outside help',
    ],
  },
  perfectum: {
    tagline: 'A full-featured CRM+ERP with an on-premise version and open source code',
    bestFor: 'Companies: those that need data security and independence from cloud providers',
    keyFeature: 'Lifetime license: buy the system once and customize it yourself',
    pricingNote: 'Paid plans or a one-time purchase of the on-premise version; significant costs for small business',
    pros: [
      'Flexible settings and adaptation to the business',
      'Powerful analytics: built-in reports and performance monitoring',
      'Versatile for different industries',
      'On-premise version that can be customized further',
    ],
    cons: [
      'High cost for small business',
      'Too many features for small companies',
    ],
  },
  creatio: {
    tagline: 'An enterprise platform of Gartner/Forrester class for CRM and business processes',
    bestFor: 'Large companies, holdings, banks',
    keyFeature: 'Powerful BPM + low-code setup without programmers',
    pricingNote: 'Corporate licenses; modular system — pay only for the features you need',
    pros: [
      'CRM + BPM: all-round business automation',
      'Scales with the company — new modules and features',
      'Built-in AI: sales forecasts, customer behavior analysis',
    ],
    cons: [
      'High cost — out of reach for small companies',
      'Complex rollout: staff training takes time',
    ],
  },
};

/** Повертає копію CRM з англійським текстом для показу. Фільтрація працює з оригіналами. */
export function localizeCrm(c: Crm): Crm {
  const o = CRM_EN[c.id];
  return {
    ...c,
    ...o,
    segments: c.segments.map((s) => SEGMENT_EN[s] ?? s),
    tags: c.tags.map((t) => TAG_EN[t] ?? t),
    integrations: c.integrations.map((g) => ({
      group: GROUP_EN[g.group] ?? g.group,
      items: g.items.map((i) => ITEM_EN[i] ?? i),
    })),
  };
}
