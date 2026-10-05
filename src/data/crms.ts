export type Deployment = 'cloud' | 'box' | 'both';

export interface IntegrationGroup {
  group: string;
  items: string[];
}

export interface Crm {
  id: string;
  name: string;
  tagline: string;
  bestFor: string;
  segments: string[];
  deployment: Deployment;
  keyFeature: string;
  priceLevel: 1 | 2 | 3;
  pricingNote: string;
  tags: string[];
  pros: string[];
  cons: string[];
  integrations: IntegrationGroup[];
  website: string;
  websiteLabel: string;
}

export const SEGMENTS = [
  'E-commerce',
  'Малий бізнес',
  'Середній бізнес',
  'Enterprise',
  'B2B-продажі',
  'Сервісні центри',
  'Команди та проєкти',
] as const;

export const FEATURE_TAGS = [
  'Безкоштовний тариф',
  'Мобільний застосунок',
  'Маркетплейси',
  'Нова Пошта',
  'Месенджери в одному вікні',
  'Управління проєктами',
  'Фінанси та склад',
  'Відкритий код',
  'Low-code',
  'Gmail / Google',
  'IP-телефонія',
] as const;

export const DEPLOYMENT_LABEL: Record<Deployment, string> = {
  cloud: 'Хмара',
  box: 'Коробка',
  both: 'Хмара / Коробка',
};

export const CRMS: Crm[] = [
  {
    id: 'keycrm',
    name: 'KeyCRM',
    tagline: 'CRM для онлайн-торгівлі: усі месенджери та маркетплейси в одному вікні',
    bestFor: 'Інтернет-магазини, продавці в Instagram/Facebook, торгівля на маркетплейсах',
    segments: ['E-commerce', 'Малий бізнес'],
    deployment: 'cloud',
    keyFeature: 'Єдине вікно для Viber, Telegram, Instagram + автоматичне створення ТТН',
    priceLevel: 1,
    pricingNote: 'Базовий тариф з необмеженою кількістю користувачів; доплата за перевищення лімітів замовлень',
    tags: ['Маркетплейси', 'Нова Пошта', 'Месенджери в одному вікні', 'Мобільний застосунок'],
    pros: [
      'Автоматизація замовлень, повідомлень і завдань під потреби бізнесу',
      'Необмежена кількість користувачів уже у базовому тарифі',
      'Інтуїтивний інтерфейс — впровадження без тривалого навчання',
      'Мобільний доступ для керування бізнесом з будь-якого місця',
    ],
    cons: [
      'Ліміти на кількість замовлень, заявок і повідомлень у базовому пакеті',
      'Додаткова плата за перевищення лімітів',
    ],
    integrations: [
      { group: 'Маркетплейси', items: ['Rozetka', 'Prom', 'OLX', 'Shopify', 'Etsy', 'Amazon'] },
      { group: 'Доставка', items: ['Нова Пошта', 'Укрпошта', 'Justin', 'Meest Express'] },
      { group: 'Оплати', items: ['LiqPay', 'Fondy', 'Portmone', 'Stripe', 'WayForPay'] },
      { group: 'Інше', items: ['Відкрите API'] },
    ],
    website: 'https://ua.keycrm.app/',
    websiteLabel: 'ua.keycrm.app',
  },
  {
    id: 'salesdrive',
    name: 'SalesDrive',
    tagline: 'Вузькоспеціалізована CRM для українських інтернет-магазинів',
    bestFor: 'Ті, хто продає товари на Prom, Rozetka, Allo і відправляє Новою Поштою / Укрпоштою',
    segments: ['E-commerce', 'Малий бізнес'],
    deployment: 'cloud',
    keyFeature: 'Максимально глибока автоматизація товарного бізнесу: документообіг, склад, SMS-розсилки',
    priceLevel: 1,
    pricingNote: 'Вигідні тарифи для невеликих компаній',
    tags: ['Маркетплейси', 'Нова Пошта', 'Фінанси та склад'],
    pros: [
      'Автоматизація продажів: рахунки, сповіщення клієнтів, обробка замовлень',
      'Простий інтерфейс і легке впровадження для малого бізнесу',
      'Доступна ціна',
    ],
    cons: [
      'Немає вбудованого модуля проєктного менеджменту',
      'Обмежений функціонал для управління завданнями',
    ],
    integrations: [
      { group: 'Маркетплейси', items: ['Rozetka', 'Prom', 'OLX'] },
      { group: 'Доставка', items: ['Нова Пошта', 'Укрпошта'] },
      { group: 'Оплати', items: ['LiqPay', 'Fondy'] },
      { group: 'Інше', items: ['Відкрите API'] },
    ],
    website: 'https://salesdrive.ua/',
    websiteLabel: 'salesdrive.ua',
  },
  {
    id: 'keepincrm',
    name: 'KeepinCRM',
    tagline: 'Проста CRM для малого бізнесу з лояльною ціновою політикою',
    bestFor: 'Невеликі команди, стартапи, сфера послуг',
    segments: ['Малий бізнес'],
    deployment: 'cloud',
    keyFeature: 'Повністю безкоштовний тариф для 1 користувача без обмежень у часі',
    priceLevel: 1,
    pricingNote: 'Є безкоштовний тариф; гнучкі платні плани для старту',
    tags: ['Безкоштовний тариф', 'Маркетплейси', 'Нова Пошта'],
    pros: [
      'Інтуїтивний інтерфейс — впровадження без спеціальної підготовки',
      'Кастомні поля, налаштування воронок продажів',
      'Сценарії автоматизації для лідів, завдань та угод',
      'Охоплює онлайн- і офлайн-продажі в одній системі',
    ],
    cons: [
      'Обмежений функціонал проєктного менеджменту',
      'Немає інструментів для складних проєктів',
    ],
    integrations: [
      { group: 'Телефонія', items: ['Binotel', 'Phonet'] },
      { group: 'Доставка', items: ['Нова Пошта', 'Укрпошта'] },
      { group: 'Маркетплейси', items: ['Rozetka', 'Kasta', 'Епіцентр'] },
      { group: 'Оплати', items: ['LiqPay', 'ПриватБанк', 'Монобанк', 'Checkbox'] },
      { group: 'CMS', items: ['OpenCart', 'WordPress', 'Wix', 'Weblium', 'Хорошоп', 'Shop-Express'] },
      { group: 'Інше', items: ['Відкрите API'] },
    ],
    website: 'https://keepincrm.com/',
    websiteLabel: 'keepincrm.com',
  },
  {
    id: 'hugeprofit',
    name: 'HugeProfit',
    tagline: 'Універсальна CRM для МСБ: продажі, клієнти, замовлення та фінанси',
    bestFor: 'Малий і середній бізнес, якому потрібен облік продажів і фінансів в одному місці',
    segments: ['E-commerce', 'Малий бізнес', 'Середній бізнес'],
    deployment: 'cloud',
    keyFeature: 'Облік фінансів із мультивалютністю, авто-зміна статусів за ТТН, друк документів',
    priceLevel: 1,
    pricingNote: 'Гнучкі тарифи для малого бізнесу з різними потребами',
    tags: ['Фінанси та склад', 'Маркетплейси', 'Нова Пошта', 'Мобільний застосунок'],
    pros: [
      'Зручне додавання продажів, автоматична зміна статусів за ТТН',
      'Друк документів: фіскальні чеки, накладні, акти',
      'Контроль фінансів: багато рахунків, валюти, облік витрат і доходів',
      'Простота впровадження та використання',
    ],
    cons: [
      'Немає модулів для управління завданнями та проєктами',
      'Обмежена гнучкість налаштування під специфічні процеси',
    ],
    integrations: [
      { group: 'Маркетплейси', items: ['Rozetka', 'Prom', 'Shopify', 'OLX'] },
      { group: 'Доставка', items: ['Нова Пошта', 'Укрпошта'] },
      { group: 'Оплати', items: ['LiqPay', 'Fondy', 'Stripe', 'WayForPay'] },
      { group: 'E-commerce', items: ['WooCommerce', 'OpenCart', 'Magento'] },
      { group: 'Месенджери', items: ['Telegram', 'WhatsApp'] },
      { group: 'Інше', items: ['Відкрите API'] },
    ],
    website: 'https://h-profit.com/',
    websiteLabel: 'h-profit.com',
  },
  {
    id: 'nethunt',
    name: 'NetHunt CRM',
    tagline: 'CRM, що живе прямо у вашій поштовій скриньці Gmail',
    bestFor: 'B2B-компанії, маркетингові агентства, IT-компанії на Google Workspace',
    segments: ['B2B-продажі', 'Малий бізнес', 'Середній бізнес'],
    deployment: 'cloud',
    keyFeature: 'Створення угод і клієнтів прямо з вхідного листа — без перемикання вкладок',
    priceLevel: 1,
    pricingNote: 'Доступні тарифні плани + 14 днів безкоштовного тестування',
    tags: ['Gmail / Google'],
    pros: [
      'Легкість налаштування — підходить для першої автоматизації',
      'Email-кампанії, конвеєри продажів, автоматизація рутини',
      'Доступна ціна для малого бізнесу',
      '14 днів безкоштовного тестування всіх функцій',
    ],
    cons: [
      'Залежність від Google Workspace — без нього функціонал обмежений',
      'Менше інтеграцій, ніж у конкурентів',
    ],
    integrations: [
      { group: 'Google', items: ['Gmail', 'Google Calendar', 'Google Drive', 'Google Contacts'] },
      { group: 'Лідогенерація', items: ['LinkedIn'] },
      { group: 'Інше', items: ['Zapier (Slack, Trello, Asana, WooCommerce…)', 'Відкрите API'] },
    ],
    website: 'https://nethunt.ua/',
    websiteLabel: 'nethunt.ua',
  },
  {
    id: 'uspacy',
    name: 'Uspacy',
    tagline: 'Єдиний цифровий робочий простір — українська альтернатива Бітрікс24',
    bestFor: 'Компанії, які звикли до соціального інтранету (стрічка новин, групи, чати)',
    segments: ['Команди та проєкти', 'Малий бізнес', 'Середній бізнес'],
    deployment: 'cloud',
    keyFeature: 'CRM + завдання + внутрішні комунікації в одній екосистемі',
    priceLevel: 2,
    pricingNote: 'Комерційні тарифи для малого та середнього бізнесу',
    tags: ['Месенджери в одному вікні', 'Управління проєктами', 'Маркетплейси'],
    pros: [
      'Інтуїтивний інтерфейс і простота впровадження',
      'Розширена автоматизація завдань і бізнес-процесів',
      'Усі звернення з каналів зв’язку в одному місці',
      'Внутрішня стрічка новин на головному екрані',
      'Масштабованість під розвиток бізнесу',
    ],
    cons: [
      'Частина функцій (наприклад, конструктор бізнес-процесів) ще у розробці',
    ],
    integrations: [
      { group: 'Телефонія', items: ['Phonet', 'UniTalk', 'Ringostat'] },
      { group: 'Месенджери', items: ['WhatsApp', 'Instagram', 'Viber', 'Facebook Messenger', 'Telegram'] },
      { group: 'Сайти', items: ['Weblium', 'Хорошоп', 'OpenCart', 'WordPress', 'Webflow', 'WIX', 'Shopify'] },
      { group: 'Маркетплейси', items: ['Prom', 'Kasta', 'Rozetka', 'Allo'] },
      { group: 'Розсилки', items: ['SendPulse', 'АльфаSMS', 'TurboSMS', 'eSputnik'] },
      { group: 'Фіскалізація', items: ['Checkbox', 'Вчасно.Каса'] },
      { group: 'Інше', items: ['Відкрите API'] },
    ],
    website: 'https://uspacy.ua/',
    websiteLabel: 'uspacy.ua',
  },
  {
    id: 'worksection',
    name: 'Worksection',
    tagline: 'CRM-модуль у системі управління проєктами — «все в одному» для команд',
    bestFor: 'Команди, яким потрібні і клієнти, і завдання, і проєкти в одному інструменті',
    segments: ['Команди та проєкти', 'Малий бізнес', 'Середній бізнес'],
    deployment: 'cloud',
    keyFeature: 'Поєднання CRM із повноцінним управлінням проєктами та командною роботою',
    priceLevel: 1,
    pricingNote: 'Вигідний тариф для невеликих команд',
    tags: ['Управління проєктами'],
    pros: [
      'CRM і управління проєктами в одній системі',
      'Простий інтерфейс — легке впровадження для команди',
      'Зручне відстеження прогресу за завданнями',
      'Доступна ціна',
    ],
    cons: [
      'Орієнтація на проєкти: обмежена автоматизація продажів',
    ],
    integrations: [
      { group: 'Месенджери', items: ['Slack', 'Telegram', 'Viber'] },
      { group: 'Google', items: ['Gmail', 'Google Calendar', 'Google Drive'] },
      { group: 'Інше', items: ['Zapier (5000+ сервісів)', 'Відкрите API'] },
    ],
    website: 'https://worksection.com/ua/',
    websiteLabel: 'worksection.com',
  },
  {
    id: 'remonline',
    name: 'RemOnline',
    tagline: 'Облік замовлень і складу для сфери послуг та ремонту',
    bestFor: 'Сервісні центри, СТО, ремонт техніки, ательє, клінінгові компанії',
    segments: ['Сервісні центри', 'Малий бізнес', 'Середній бізнес'],
    deployment: 'cloud',
    keyFeature: 'Спеціалізовані форми приймання техніки, друк квитанцій, облік запчастин і зарплати майстрів',
    priceLevel: 2,
    pricingNote: 'Гнучкі тарифи, масштабування під потреби бізнесу',
    tags: ['Мобільний застосунок', 'Фінанси та склад'],
    pros: [
      'Швидке впровадження без складної інтеграції',
      'Мобільні застосунки для керівників і виконавців',
      'Гнучкі тарифи, що масштабуються',
    ],
    cons: [
      'Базова автоматизація — складні сценарії потребують стороннього втручання',
    ],
    integrations: [
      { group: 'Телефонія', items: ['Binotel', 'Zadarma', 'UniTalk', 'Ringostat'] },
      { group: 'Доставка', items: ['Нова Пошта', 'Укрпошта'] },
      { group: 'SMS', items: ['TurboSMS', 'AlphaSMS', 'SMS-fly'] },
      { group: 'Маркетплейси', items: ['Prom', 'Rozetka'] },
      { group: 'Оплати та РРО', items: ['LiqPay', 'Checkbox', 'Вчасно.Каса', 'Datecs'] },
      { group: 'Інше', items: ['Відкрите API'] },
    ],
    website: 'https://remonline.ua/',
    websiteLabel: 'remonline.ua',
  },
  {
    id: 'perfectum',
    name: 'Perfectum CRM',
    tagline: 'Повнофункціональна CRM+ERP з коробковою версією та відкритим кодом',
    bestFor: 'Компанії, яким потрібні безпека даних і незалежність від хмарних провайдерів',
    segments: ['Середній бізнес', 'Enterprise'],
    deployment: 'both',
    keyFeature: 'Life-time ліцензія: систему можна купити назавжди й допрацьовувати під себе',
    priceLevel: 3,
    pricingNote: 'Платні тарифи або разова купівля коробкової версії; значні витрати для малого бізнесу',
    tags: ['Відкритий код', 'IP-телефонія', 'Маркетплейси', 'Фінанси та склад'],
    pros: [
      'Гнучкість налаштувань і адаптація під бізнес',
      'Потужна аналітика: вбудовані звіти та моніторинг ефективності',
      'Універсальність для різних сфер',
      'Коробкова версія з можливістю доопрацювання',
    ],
    cons: [
      'Висока вартість для малого бізнесу',
      'Перевантажений функціонал для невеликих компаній',
    ],
    integrations: [
      { group: 'Телефонія', items: ['Binotel', 'Zadarma', 'UniTalk', 'Ringostat'] },
      { group: 'Доставка', items: ['Нова Пошта', 'Укрпошта', 'Meest Express'] },
      { group: 'SMS', items: ['TurboSMS', 'OpenVox', 'eSputnik'] },
      { group: 'Маркетплейси', items: ['Prom', 'Rozetka', 'Ria', 'Hotline', 'Amazon'] },
      { group: 'Оплати та РРО', items: ['LiqPay', 'Checkbox', 'Вчасно.Каса'] },
      { group: 'Інше', items: ['Відкрите API'] },
    ],
    website: 'https://perfectum.ua/ua/',
    websiteLabel: 'perfectum.ua',
  },
  {
    id: 'creatio',
    name: 'Creatio',
    tagline: 'Enterprise-платформа класу Gartner/Forrester для CRM та бізнес-процесів',
    bestFor: 'Великі компанії, холдинги, банки',
    segments: ['Enterprise', 'Середній бізнес'],
    deployment: 'both',
    keyFeature: 'Потужний BPM + low-code налаштування без програмістів',
    priceLevel: 3,
    pricingNote: 'Корпоративні ліцензії; модульна система — оплата лише за потрібні функції',
    tags: ['Low-code', 'IP-телефонія'],
    pros: [
      'CRM + BPM: всеохопна автоматизація бізнесу',
      'Масштабується разом із ростом компанії — нові модулі та функції',
      'Вбудований ШІ: прогноз продажів, аналіз поведінки клієнтів',
    ],
    cons: [
      'Висока вартість — недоступна для малих компаній',
      'Складне впровадження: навчання персоналу потребує часу',
    ],
    integrations: [
      { group: 'ERP', items: ['SAP HANA', 'SAP Business One', '1C (8.3+)'] },
      { group: 'Офіс', items: ['Google Workspace', 'Microsoft 365'] },
      { group: 'Месенджери', items: ['Telegram', 'Viber', 'WhatsApp'] },
      { group: 'Оплати', items: ['Stripe', 'PayPal', 'Fondy'] },
      { group: 'E-commerce', items: ['Magento', 'Shopify'] },
      { group: 'Аналітика', items: ['Power BI', 'Tableau'] },
      { group: 'Інше', items: ['Відкрите API'] },
    ],
    website: 'https://www.creatio.com/ua/',
    websiteLabel: 'creatio.com',
  },
];
