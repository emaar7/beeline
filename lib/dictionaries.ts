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
    unlimitedCalls: "Cheksiz qoʻngʻiroqlar",
    numbersUpTo: "{n} tagacha raqam",
    tasix: "+{n} GB TAS-IX",
    regular: "3 oydan keyin {price} soʻm",
    details: "Batafsil",
    unlimited: "Cheksiz",
    connect: "Ulanish",
    popular: "Mashhur",
    all: "Barcha tariflar",
    tabs: { mobile: "Mobil", home: "Uy interneti" },
    tags: {
      suhbat: "Faqat qoʻngʻiroqlar uchun",
      optimal: "Internet va qoʻngʻiroqlar balansi",
      vibe: "Koʻp internet, bir narxda",
      oila3: "3 tagacha raqam — oila uchun",
      oila5: "5 tagacha raqam — oila uchun",
      oila7: "7 tagacha raqam — katta oila uchun",
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
      "Dizayn konsepsiyasi (demo). Rasmiy sayt — beeline.uz. Mobil tariflar beeline.uz dan olingan (2026-11); uy interneti narxlari namuna.",
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

  chat: {
    name: "AI yordamchi",
    status: "Onlayn",
    teaser: "Salom! Sizga mos tarifni tanlashda yordam beraman 👋",
    open: "Chatni ochish",
    close: "Yopish",
    placeholder: "Savolingizni yozing…",
    send: "Yuborish",
    hello: "Salom! Men Beeline AI yordamchisiman. Bir necha savolda sizga mos tarifni topaman.",
    askType: "Qanday tarif qidiryapsiz?",
    types: { personal: "Shaxsiy tarif", family: "Oilaviy tarif", home: "Uy interneti" },
    askData: "Oyiga qancha internet kerak?",
    data: [
      { l: "Deyarli kerak emas", gb: 0 },
      { l: "Kam — ~10 GB", gb: 10 },
      { l: "Oʻrtacha — ~30 GB", gb: 30 },
      { l: "Koʻp — 60 GB dan ortiq", gb: 60 },
    ],
    askCalls: "Qoʻngʻiroqlar-chi?",
    calls: [
      { l: "Kam — ~300 daqiqa", min: 300 },
      { l: "Oʻrtacha — ~700 daqiqa", min: 700 },
      { l: "Koʻp — 3000+ daqiqa", min: 3000 },
    ],
    askFamily: "Nechta raqam kerak?",
    family: [
      { l: "2–3 raqam", n: 3 },
      { l: "4–5 raqam", n: 5 },
      { l: "6–7 raqam", n: 7 },
    ],
    result: "Sizga eng mos tarif:",
    alt: "Koʻproq imkoniyat kerak boʻlsa:",
    hambi: "Tarifni ulash va boshqarishni hambi ilovasida qiling — aloqa, TV va boshqa xizmatlar bitta ilovada.",
    ctaHambi: "hambi ilovasini yuklab olish",
    ctaPlan: "Tarif haqida batafsil",
    home: "Uy interneti tezliklari va narxlari alohida sahifada. Ulanishni hambi ilovasida ham boshlash mumkin.",
    ctaHome: "Uy internetiga oʻtish",
    hambiInfo: "hambi — Beeline superilovasi: tariflar va paketlar, TV, oʻyinlar, avtosugʻurta va bonus ballar — hammasi bitta joyda.",
    restart: "Qaytadan boshlash",
    fallback: "Hozircha men tugmalar orqali yordam bera olaman. Quyidagilardan birini tanlang 👇",
    note: "AI yordamchi tavsiya beradi. Aniq shartlar — beeline.uz saytida.",
    kw: {
      family: ["oila", "oilaviy", "oilam", "farzand"],
      home: ["uy internet", "wifi", "wi-fi", "optik", "router"],
      hambi: ["hambi", "ilova", "app"],
      personal: ["tarif", "narx", "internet", "gb", "daqiqa"],
    },
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
    unlimitedCalls: "Безлимитные звонки",
    numbersUpTo: "До {n} номеров",
    tasix: "+{n} ГБ на TAS-IX",
    regular: "Через 3 мес. — {price} сум",
    details: "Подробнее",
    unlimited: "Безлимит",
    connect: "Подключить",
    popular: "Популярный",
    all: "Все тарифы",
    tabs: { mobile: "Мобильные", home: "Домашний интернет" },
    tags: {
      suhbat: "Только для звонков",
      optimal: "Баланс интернета и звонков",
      vibe: "Много интернета за разумные деньги",
      oila3: "До 3 номеров — для семьи",
      oila5: "До 5 номеров — для семьи",
      oila7: "До 7 номеров — для большой семьи",
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
      "Дизайн-концепция (демо). Официальный сайт — beeline.uz. Мобильные тарифы взяты с beeline.uz (11.2026); цены на домашний интернет условные.",
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

  chat: {
    name: "AI-ассистент",
    status: "Онлайн",
    teaser: "Привет! Помогу выбрать подходящий тариф 👋",
    open: "Открыть чат",
    close: "Закрыть",
    placeholder: "Напишите вопрос…",
    send: "Отправить",
    hello: "Привет! Я AI-ассистент Beeline. За пару вопросов подберу вам тариф.",
    askType: "Какой тариф ищете?",
    types: { personal: "Личный тариф", family: "Семейный тариф", home: "Домашний интернет" },
    askData: "Сколько интернета нужно в месяц?",
    data: [
      { l: "Почти не нужен", gb: 0 },
      { l: "Немного — ~10 ГБ", gb: 10 },
      { l: "Средне — ~30 ГБ", gb: 30 },
      { l: "Много — 60 ГБ и больше", gb: 60 },
    ],
    askCalls: "А звонки?",
    calls: [
      { l: "Немного — ~300 минут", min: 300 },
      { l: "Средне — ~700 минут", min: 700 },
      { l: "Много — 3000+ минут", min: 3000 },
    ],
    askFamily: "Сколько номеров нужно?",
    family: [
      { l: "2–3 номера", n: 3 },
      { l: "4–5 номеров", n: 5 },
      { l: "6–7 номеров", n: 7 },
    ],
    result: "Вам лучше всего подойдёт:",
    alt: "Если нужно больше возможностей:",
    hambi: "Подключайте и управляйте тарифом в приложении hambi — связь, ТВ и другие сервисы в одном месте.",
    ctaHambi: "Скачать hambi",
    ctaPlan: "Подробнее о тарифе",
    home: "Скорости и цены домашнего интернета — на отдельной странице. Подключение можно начать и в приложении hambi.",
    ctaHome: "К домашнему интернету",
    hambiInfo: "hambi — суперприложение Beeline: тарифы и пакеты, ТВ, игры, автострахование и бонусные баллы в одном месте.",
    restart: "Начать заново",
    fallback: "Пока я помогаю с помощью кнопок. Выберите один из вариантов 👇",
    note: "AI-ассистент даёт рекомендации. Точные условия — на beeline.uz.",
    kw: {
      family: ["семь", "семейн", "дет", "жена", "муж"],
      home: ["домашн", "wifi", "wi-fi", "оптик", "роутер"],
      hambi: ["hambi", "хамби", "приложен", "app"],
      personal: ["тариф", "цен", "интернет", "гб", "минут"],
    },
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
    unlimitedCalls: "Unlimited calls",
    numbersUpTo: "Up to {n} numbers",
    tasix: "+{n} GB on TAS-IX",
    regular: "After 3 months: {price} UZS",
    details: "Details",
    unlimited: "Unlimited",
    connect: "Connect",
    popular: "Popular",
    all: "All plans",
    tabs: { mobile: "Mobile", home: "Home internet" },
    tags: {
      suhbat: "For calls only",
      optimal: "Balanced data and calls",
      vibe: "Lots of data, one price",
      oila3: "Up to 3 numbers — for families",
      oila5: "Up to 5 numbers — for families",
      oila7: "Up to 7 numbers — for big families",
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
      "Design concept (demo). Official site — beeline.uz. Mobile plans taken from beeline.uz (Nov 2026); home internet prices are placeholders.",
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

  chat: {
    name: "AI assistant",
    status: "Online",
    teaser: "Hi! I can help you pick the right plan 👋",
    open: "Open chat",
    close: "Close",
    placeholder: "Type your question…",
    send: "Send",
    hello: "Hi! I'm the Beeline AI assistant. A few quick questions and I'll find your plan.",
    askType: "What kind of plan are you after?",
    types: { personal: "Personal plan", family: "Family plan", home: "Home internet" },
    askData: "How much data do you need per month?",
    data: [
      { l: "Hardly any", gb: 0 },
      { l: "A little — ~10 GB", gb: 10 },
      { l: "Moderate — ~30 GB", gb: 30 },
      { l: "A lot — 60 GB or more", gb: 60 },
    ],
    askCalls: "And calls?",
    calls: [
      { l: "A few — ~300 min", min: 300 },
      { l: "Some — ~700 min", min: 700 },
      { l: "Lots — 3000+ min", min: 3000 },
    ],
    askFamily: "How many numbers do you need?",
    family: [
      { l: "2–3 numbers", n: 3 },
      { l: "4–5 numbers", n: 5 },
      { l: "6–7 numbers", n: 7 },
    ],
    result: "Your best match:",
    alt: "If you want more headroom:",
    hambi: "Connect and manage your plan in the hambi app — mobile, TV and more services in one place.",
    ctaHambi: "Get the hambi app",
    ctaPlan: "Plan details",
    home: "Home internet speeds and prices have their own page. You can also start connecting in the hambi app.",
    ctaHome: "Go to home internet",
    hambiInfo: "hambi is Beeline's super-app: plans and packages, TV, games, car insurance and reward points in one place.",
    restart: "Start over",
    fallback: "For now I help through the buttons. Pick one of the options below 👇",
    note: "The AI assistant gives recommendations. Exact terms are on beeline.uz.",
    kw: {
      family: ["family", "families", "kids", "wife", "husband"],
      home: ["home internet", "wifi", "wi-fi", "fibre", "fiber", "router"],
      hambi: ["hambi", "app"],
      personal: ["plan", "price", "data", "gb", "minutes"],
    },
  },
};

const dictionaries: Record<Locale, Dict> = { uz, ru, en };
export const getDictionary = (l: Locale): Dict => dictionaries[l];
