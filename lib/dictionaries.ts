// All copy lives here. Plan names, prices and facts are DEMO placeholders —
// replace with real Beeline Uzbekistan data before launch.

export const locales = ["uz", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";
export const hasLocale = (l: string): l is Locale =>
  (locales as readonly string[]).includes(l);

const uz = {
  meta: {
    title: "Beeline Oʻzbekiston — Tezlikni his qiling",
    description:
      "Tezkor mobil aloqa, 5G va uy interneti. Tarifni tanlang va bir daqiqada ulaning.",
  },
  nav: {
    tariffs: "Tariflar",
    internet: "Uy interneti",
    world: "Xizmatlar",
    coverage: "Qamrov",
    connect: "Ulanish",
    menu: "Menyu",
  },
  hero: {
    kicker: "Beeline Oʻzbekiston",
    scroll: "Pastga suring",
    unit: "Mbit/s",
    stages: [
      {
        title: "Tezlikni his qiling",
        sub: "Aloqa shunchaki ulanish emas — bu harakat. Tezroq, silliqroq, siz bilan birga.",
      },
      {
        title: "Soniyasiga 1 Gbit",
        sub: "5G va optik tola: video, oʻyin va ish — kechikishsiz.",
      },
      {
        title: "Bir chiziq. Butun Oʻzbekiston.",
        sub: "Eng qisqa yoʻl — Beeline.",
      },
    ],
    primary: "Tarifni tanlash",
    secondary: "Uy internetiga ulanish",
  },
  ticker: [
    "5G tezlik",
    "Cheksiz imkoniyat",
    "Optik tola",
    "Bir chiziq",
    "Roaming",
    "24/7 yordam",
  ],
  statement: {
    kicker: "Biz haqimizda",
    text: "Biz *masofani qisqartiramiz.* Oila bilan suhbat, ish yigʻilishi, kechki serial — hammasi bir chiziqda, *toʻxtovsiz* va *tez.*",
  },
  tariffs: {
    kicker: "Tariflar",
    title: "Oʻzingizga mos tarifni toping",
    sub: "Sodda narx, yashirin toʻlovlarsiz.",
    perMonth: "soʻm / oy",
    gb: "GB",
    min: "daqiqa",
    sms: "SMS",
    unlimited: "Cheksiz",
    connect: "Ulanish",
    popular: "Mashhur",
    all: "Barcha tariflar",
    tabs: { mobile: "Mobil", home: "Uy interneti" },
    tags: {
      start: "Boshlovchilar uchun",
      smart: "Kundalik hayot uchun",
      max: "Faol foydalanuvchilar uchun",
      ultra: "Cheklovsiz erkinlik",
    },
    finder: {
      title: "Tarif tanlagich",
      sub: "Qancha kerak — shuncha. Surgichlarni siljiting.",
      data: "Internet",
      minutes: "Daqiqa",
      best: "Sizga mos tarif",
      total: "Oyiga",
    },
  },
  speed: {
    kicker: "Tezlik",
    title: "Tezlik poygasi",
    sub: "Texnologiyalar yarishmoqda — kim birinchi marraga yetadi?",
    note: "Nazariy maksimal tezliklar. Amaldagi tezlik qamrov va qurilmaga bogʻliq.",
    tech: ["3G", "4G", "5G", "Optik tola"],
  },
  world: {
    kicker: "Beeline olami",
    title: "Aloqadan koʻproq",
    cards: [
      {
        t: "Xalqaro roaming",
        d: "Chet elda ham ulanishda qoling — qulay narxlar va oddiy yoqish.",
      },
      {
        t: "Raqamli xizmatlar",
        d: "Toʻlovlar, kontent va ilovalar — barchasi bitta hisobda.",
      },
      {
        t: "24/7 yordam",
        d: "Savolingiz bormi? Jonli operatorlar kechayu kunduz yoningizda.",
      },
      {
        t: "Bonuslar",
        d: "Har oy uchun sovgʻa: GB, daqiqa va maxsus takliflar.",
      },
    ],
  },
  stats: {
    regions: "hududda xizmat",
    speed: "maksimal tezlik",
    gen: "yangi avlod tarmogʻi",
    support: "yordam xizmati",
  },
  cta: {
    title: "Eng qisqa yoʻl — Beeline",
    sub: "Ulanish bir daqiqa oladi. Qolganini biz hal qilamiz.",
    btn: "Hoziroq ulanish",
    btn2: "Doʻkonlarni topish",
  },
  footer: {
    tag: "Bir chiziq. Butun Oʻzbekiston.",
    cols: [
      { h: "Xizmatlar", l: ["Tariflar", "Uy interneti", "Roaming", "5G"] },
      { h: "Yordam", l: ["Aloqa markazi", "Doʻkonlar", "Savol-javob"] },
      { h: "Kompaniya", l: ["Biz haqimizda", "Karyera", "Yangiliklar"] },
    ],
    rights:
      "Dizayn konsepsiyasi (demo). Rasmiy sayt — beeline.uz. Narxlar va tariflar namuna uchun.",
  },
  tariffsPage: {
    title: "Tariflar",
    sub: "Mobil va uy interneti — hammasi bir joyda.",
  },
  internetPage: {
    title: "Uy interneti",
    sub: "Optik tola bilan kechikishsiz hayot.",
    plansTitle: "Tezlikni tanlang",
    demoTitle: "Yuklab olish poygasi",
    demoSub: "4 GB hajmli film turli tezliklarda qancha vaqtda yuklanadi?",
    start: "Poygani boshlash",
    again: "Qayta boshlash",
    faqTitle: "Savol-javob",
    faq: [
      {
        q: "Ulanish qancha vaqt oladi?",
        a: "Muddat manzilingizga bogʻliq. Ariza qoldiring — operator siz bilan bogʻlanib, aniq vaqtni kelishadi.",
      },
      {
        q: "Tezlikni keyinroq oshirish mumkinmi?",
        a: "Ha, tarifni istalgan vaqtda yuqoriroq tezlikka almashtirishingiz mumkin.",
      },
      {
        q: "Qaysi tezlik menga yetarli?",
        a: "Kundalik koʻrish va ish uchun 100 Mbit/s yetarli. Katta oila va 4K uchun 300 Mbit/s dan boshlang.",
      },
      {
        q: "Wi‑Fi router kerakmi?",
        a: "Ha, ulanish uchun router kerak. Tafsilotlarni ariza qoldirganingizda aniqlashtirasiz.",
      },
    ],
  },
};

export type Dict = typeof uz;

const ru: Dict = {
  meta: {
    title: "Beeline Узбекистан — Почувствуйте скорость",
    description:
      "Быстрая мобильная связь, 5G и домашний интернет. Выберите тариф и подключитесь за минуту.",
  },
  nav: {
    tariffs: "Тарифы",
    internet: "Домашний интернет",
    world: "Сервисы",
    coverage: "Покрытие",
    connect: "Подключиться",
    menu: "Меню",
  },
  hero: {
    kicker: "Beeline Узбекистан",
    scroll: "Листайте вниз",
    unit: "Мбит/с",
    stages: [
      {
        title: "Почувствуйте скорость",
        sub: "Связь — это не просто соединение, а движение. Быстрее, плавнее, вместе с вами.",
      },
      {
        title: "1 Гбит в секунду",
        sub: "5G и оптика: видео, игры и работа — без задержек.",
      },
      {
        title: "Одна линия. Весь Узбекистан.",
        sub: "Кратчайший путь — Beeline.",
      },
    ],
    primary: "Выбрать тариф",
    secondary: "Подключить интернет",
  },
  ticker: [
    "Скорость 5G",
    "Безграничные возможности",
    "Оптоволокно",
    "Одна линия",
    "Роуминг",
    "Поддержка 24/7",
  ],
  statement: {
    kicker: "О нас",
    text: "Мы *сокращаем расстояния.* Разговор с семьёй, рабочая встреча, вечерний сериал — всё на одной линии, *без пауз* и *быстро.*",
  },
  tariffs: {
    kicker: "Тарифы",
    title: "Найдите свой тариф",
    sub: "Простые цены, без скрытых платежей.",
    perMonth: "сум / мес",
    gb: "ГБ",
    min: "мин",
    sms: "SMS",
    unlimited: "Безлимит",
    connect: "Подключить",
    popular: "Популярный",
    all: "Все тарифы",
    tabs: { mobile: "Мобильные", home: "Домашний интернет" },
    tags: {
      start: "Для начала",
      smart: "На каждый день",
      max: "Для активных",
      ultra: "Свобода без границ",
    },
    finder: {
      title: "Подбор тарифа",
      sub: "Сколько нужно — столько и берите. Двигайте ползунки.",
      data: "Интернет",
      minutes: "Минуты",
      best: "Ваш тариф",
      total: "В месяц",
    },
  },
  speed: {
    kicker: "Скорость",
    title: "Гонка скоростей",
    sub: "Технологии соревнуются — кто первым придёт к финишу?",
    note: "Теоретические максимумы. Реальная скорость зависит от покрытия и устройства.",
    tech: ["3G", "4G", "5G", "Оптика"],
  },
  world: {
    kicker: "Мир Beeline",
    title: "Больше, чем связь",
    cards: [
      {
        t: "Международный роуминг",
        d: "На связи и за границей — удобные цены и простое подключение.",
      },
      {
        t: "Цифровые сервисы",
        d: "Платежи, контент и приложения — в одном аккаунте.",
      },
      {
        t: "Поддержка 24/7",
        d: "Есть вопрос? Живые операторы рядом днём и ночью.",
      },
      {
        t: "Бонусы",
        d: "Подарки каждый месяц: ГБ, минуты и особые предложения.",
      },
    ],
  },
  stats: {
    regions: "регионов покрытия",
    speed: "максимальная скорость",
    gen: "сеть нового поколения",
    support: "служба поддержки",
  },
  cta: {
    title: "Кратчайший путь — Beeline",
    sub: "Подключение занимает минуту. Остальное — на нас.",
    btn: "Подключиться сейчас",
    btn2: "Найти магазин",
  },
  footer: {
    tag: "Одна линия. Весь Узбекистан.",
    cols: [
      { h: "Сервисы", l: ["Тарифы", "Домашний интернет", "Роуминг", "5G"] },
      { h: "Помощь", l: ["Контакт-центр", "Магазины", "Вопросы и ответы"] },
      { h: "Компания", l: ["О нас", "Карьера", "Новости"] },
    ],
    rights:
      "Дизайн-концепция (демо). Официальный сайт — beeline.uz. Цены и тарифы условные.",
  },
  tariffsPage: {
    title: "Тарифы",
    sub: "Мобильная связь и домашний интернет — в одном месте.",
  },
  internetPage: {
    title: "Домашний интернет",
    sub: "Жизнь без задержек на оптоволокне.",
    plansTitle: "Выберите скорость",
    demoTitle: "Гонка загрузки",
    demoSub: "Как быстро скачается фильм на 4 ГБ на разных скоростях?",
    start: "Запустить гонку",
    again: "Заново",
    faqTitle: "Вопросы и ответы",
    faq: [
      {
        q: "Сколько занимает подключение?",
        a: "Срок зависит от вашего адреса. Оставьте заявку — оператор свяжется и согласует время.",
      },
      {
        q: "Можно ли потом повысить скорость?",
        a: "Да, тариф можно сменить на более быстрый в любой момент.",
      },
      {
        q: "Какой скорости мне хватит?",
        a: "Для повседневного просмотра и работы достаточно 100 Мбит/с. Для большой семьи и 4K — от 300 Мбит/с.",
      },
      {
        q: "Нужен ли Wi‑Fi роутер?",
        a: "Да, для подключения нужен роутер. Детали уточните при оформлении заявки.",
      },
    ],
  },
};

const en: Dict = {
  meta: {
    title: "Beeline Uzbekistan — Feel the speed",
    description:
      "Fast mobile, 5G and home internet. Pick a plan and get connected in a minute.",
  },
  nav: {
    tariffs: "Plans",
    internet: "Home internet",
    world: "Services",
    coverage: "Coverage",
    connect: "Get connected",
    menu: "Menu",
  },
  hero: {
    kicker: "Beeline Uzbekistan",
    scroll: "Scroll down",
    unit: "Mbit/s",
    stages: [
      {
        title: "Feel the speed",
        sub: "Connectivity isn't just a link — it's motion. Faster, smoother, right with you.",
      },
      {
        title: "1 Gbit per second",
        sub: "5G and fibre: video, games and work — with zero lag.",
      },
      {
        title: "One line. All of Uzbekistan.",
        sub: "The shortest path is Beeline.",
      },
    ],
    primary: "Choose a plan",
    secondary: "Get home internet",
  },
  ticker: [
    "5G speed",
    "Limitless possibilities",
    "Fibre optic",
    "One line",
    "Roaming",
    "24/7 support",
  ],
  statement: {
    kicker: "About us",
    text: "We *shorten distances.* A chat with family, a work meeting, an evening series — all on one line, *non-stop* and *fast.*",
  },
  tariffs: {
    kicker: "Plans",
    title: "Find the plan that fits you",
    sub: "Simple pricing, no hidden fees.",
    perMonth: "UZS / month",
    gb: "GB",
    min: "min",
    sms: "SMS",
    unlimited: "Unlimited",
    connect: "Connect",
    popular: "Popular",
    all: "All plans",
    tabs: { mobile: "Mobile", home: "Home internet" },
    tags: {
      start: "For starters",
      smart: "For everyday life",
      max: "For active users",
      ultra: "Freedom without limits",
    },
    finder: {
      title: "Plan finder",
      sub: "Take only what you need. Move the sliders.",
      data: "Data",
      minutes: "Minutes",
      best: "Your best plan",
      total: "Per month",
    },
  },
  speed: {
    kicker: "Speed",
    title: "The speed race",
    sub: "Technologies compete — who reaches the finish first?",
    note: "Theoretical maximum speeds. Real-world speed depends on coverage and device.",
    tech: ["3G", "4G", "5G", "Fibre"],
  },
  world: {
    kicker: "The Beeline world",
    title: "More than connectivity",
    cards: [
      {
        t: "International roaming",
        d: "Stay connected abroad — fair prices and simple activation.",
      },
      {
        t: "Digital services",
        d: "Payments, content and apps — all in a single account.",
      },
      {
        t: "24/7 support",
        d: "Got a question? Live agents are with you day and night.",
      },
      {
        t: "Rewards",
        d: "A gift every month: GB, minutes and special offers.",
      },
    ],
  },
  stats: {
    regions: "regions covered",
    speed: "max speed",
    gen: "next-gen network",
    support: "support",
  },
  cta: {
    title: "The shortest path is Beeline",
    sub: "Connecting takes a minute. We handle the rest.",
    btn: "Get connected now",
    btn2: "Find a store",
  },
  footer: {
    tag: "One line. All of Uzbekistan.",
    cols: [
      { h: "Services", l: ["Plans", "Home internet", "Roaming", "5G"] },
      { h: "Help", l: ["Contact centre", "Stores", "FAQ"] },
      { h: "Company", l: ["About us", "Careers", "News"] },
    ],
    rights:
      "Design concept (demo). Official site — beeline.uz. Prices and plans are placeholders.",
  },
  tariffsPage: {
    title: "Plans",
    sub: "Mobile and home internet — all in one place.",
  },
  internetPage: {
    title: "Home internet",
    sub: "Lag-free life on fibre.",
    plansTitle: "Pick your speed",
    demoTitle: "Download race",
    demoSub: "How fast does a 4 GB movie download at different speeds?",
    start: "Start the race",
    again: "Restart",
    faqTitle: "FAQ",
    faq: [
      {
        q: "How long does connecting take?",
        a: "It depends on your address. Leave a request and an operator will contact you to agree on a time.",
      },
      {
        q: "Can I upgrade the speed later?",
        a: "Yes, you can switch to a faster plan at any time.",
      },
      {
        q: "What speed is enough for me?",
        a: "100 Mbit/s covers everyday streaming and work. For big families and 4K, start from 300 Mbit/s.",
      },
      {
        q: "Do I need a Wi‑Fi router?",
        a: "Yes, a router is required. You'll confirm the details when you submit a request.",
      },
    ],
  },
};

const dictionaries: Record<Locale, Dict> = { uz, ru, en };
export const getDictionary = (l: Locale): Dict => dictionaries[l];
