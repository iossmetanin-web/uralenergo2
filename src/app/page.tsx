"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Menu,
  X,
  Zap,
  Shield,
  Clock,
  Award,
  Users,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ChevronRight,
  Star,
  Activity,
  Settings,
  Wrench,
  FileText,
  Cog,
  UserCheck,
  Calendar,
  Play,
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ========================================
// BRAND CONFIG — URALENERGO
// ========================================
const BRAND = {
  name: "УРАЛЭНЕРГО",
  tagline: "Энергия надёжности",
  hero: {
    line1: "Запуск объекта",
    line2: "в срок.",
    line3: "Без риска аварий.",
  },
  subheading:
    "Завод полного цикла. Отгружаем типовое оборудование за 1 день. Проектируем аналоги ABB и Siemens с надежностью на 15% выше конкурентов.",
  cta: "Получить расчёт стоимости",
};

const STATS = [
  { value: "5000+", label: "реализованных проектов для ПАО «Россети» и «Росатома»" },
  { value: "0%", label: "рекламаций: 12 этапов испытаний в собственной лаборатории" },
  { value: "30 лет", label: "реальный ресурс за счёт вакуумной заливки масла" },
];

const FEATURES = [
  {
    title: "Проектирование",
    description: "Бесплатные чертежи DWG в день обращения",
    icon: FileText,
    items: ["Гарантия технадзора", "Согласование в Ростехнадзоре", "BIM-моделирование"],
  },
  {
    title: "Производство",
    description: "Сборка по ГОСТ на европейских станках",
    icon: Cog,
    items: ["Усиленная конструкция бака", "Контроль качества ISO 9001", "Вакуумная заливка масла"],
  },
  {
    title: "Сервис",
    description: "Выезд инженера за 24 часа",
    icon: Wrench,
    items: ["Собственный склад запчастей", "Гарантия 5 лет", "Монтаж и пусконаладка"],
  },
];

const MASTERS = [
  {
    name: "Алексей Смирнов",
    role: "Главный конструктор",
    achievement: "Разработал КТП для эксплуатации при -60°C",
    avatar: "АС",
  },
  {
    name: "Игорь Волков",
    role: "Глава ОТК",
    achievement: "5 лет без единого дефекта обмотки",
    avatar: "ИВ",
  },
  {
    name: "Дмитрий Назаров",
    role: "Инженер сервиса",
    achievement: "Ввёл 300+ подстанций, ускоряет запуск на 30%",
    avatar: "ДН",
  },
];

const REVIEWS = [
  {
    name: "Михаил К.",
    company: "ПАО «Россети»",
    text: "Поставили КТП за 3 дня вместо плановых 10. Оборудование работает тихо, без сбоев уже 2 года. Рекомендую как надёжного партнёра.",
    rating: 5,
  },
  {
    name: "Анна С.",
    company: "ООО «Сибнефтегаз»",
    text: "Срочный заказ трансформатора — отгрузили через сутки. Качество сборки на высоте, все испытания пройдены с первого раза.",
    rating: 5,
  },
  {
    name: "Сергей В.",
    company: "АО «НЛМК»",
    text: "Третий год работаем с УРАЛЭНЕРГО. Ни одной рекламации, всегда в срок. Главный энергетик доволен.",
    rating: 5,
  },
];

const PROTOCOL_STEPS = [
  {
    number: "01",
    title: "Заявка",
    description: "Вы оставляете заявку — инженер связывается за 15 минут для уточнения параметров.",
  },
  {
    number: "02",
    title: "Проектирование",
    description: "Готовим DWG-чертежи и BIM-модель. Согласовываем с технадзором за 2 дня.",
  },
  {
    number: "03",
    title: "Производство",
    description: "Сборка на европейском оборудовании. 12 этапов контроля качества. Отгрузка.",
  },
];

const PRICING_TIERS = [
  {
    name: "Типовое КТП",
    price: "от 850 000 ₽",
    features: ["Готовые решения", "Отгрузка за 1 день", "Гарантия 3 года"],
    popular: false,
  },
  {
    name: "Проектное КТП",
    price: "от 1 200 000 ₽",
    features: ["Индивидуальный проект", "DWG + BIM", "Гарантия 5 лет", "Шеф-монтаж"],
    popular: true,
  },
  {
    name: "Подстанция",
    price: "от 5 000 000 ₽",
    features: ["Полный цикл", "Пусконаладка", "Сервисный контракт", "Обучение персонала"],
    popular: false,
  },
];

const NAV_LINKS = [
  { label: "Преимущества", href: "#features" },
  { label: "Процесс", href: "#protocol" },
  { label: "Команда", href: "#masters" },
  { label: "Отзывы", href: "#reviews" },
];

// ========================================
// NAVBAR — "The Floating Island"
// ========================================
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#121212]/80 backdrop-blur-xl border border-[#2A2A2A] shadow-2xl"
          : "bg-transparent"
      } rounded-full px-2 py-2`}
    >
      <div className="flex items-center gap-2 md:gap-6">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 px-4 py-2 text-lg font-bold tracking-tight"
        >
          <Zap className="w-5 h-5 text-[#FF6B00]" />
          <span className={isScrolled ? "text-[#F5F3EE]" : "text-white"}>
            {BRAND.name}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium link-lift rounded-full transition-colors ${
                isScrolled
                  ? "text-[#A0A0A0] hover:text-[#F5F3EE]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#FF6B00] text-[#121212] font-semibold text-sm rounded-full btn-magnetic"
        >
          {BRAND.cta}
          <ArrowRight className="w-4 h-4" />
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-full transition-colors ${
            isScrolled ? "text-[#F5F3EE]" : "text-white"
          }`}
          aria-label="Меню"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-[#121212]/95 backdrop-blur-xl border border-[#2A2A2A] rounded-3xl p-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-[#F5F3EE] hover:bg-[#2A2A2A] rounded-2xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FF6B00] text-[#121212] font-semibold rounded-2xl mt-2"
            >
              {BRAND.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ========================================
// HERO SECTION — "The Opening Shot"
// ========================================
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-element",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-end pb-20 md:pb-32"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
          alt="Электрическая подстанция"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div ref={contentRef} className="max-w-4xl">
          {/* Hero Typography */}
          <div className="mb-8">
            <h1 className="hero-element text-4xl md:text-6xl lg:text-7xl font-heading leading-[0.95] mb-4">
              {BRAND.hero.line1}{" "}
              <span className="font-drama text-[#FF6B00] text-5xl md:text-7xl lg:text-8xl">
                {BRAND.hero.line2}
              </span>
            </h1>
            <p className="hero-element text-2xl md:text-3xl lg:text-4xl font-heading text-[#A0A0A0]">
              {BRAND.hero.line3}
            </p>
          </div>

          {/* Subheading */}
          <p className="hero-element text-lg md:text-xl text-[#A0A0A0] max-w-2xl mb-8 leading-relaxed">
            {BRAND.subheading}
          </p>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hero-element inline-flex items-center gap-3 px-8 py-4 bg-[#FF6B00] text-[#121212] font-bold text-lg rounded-full btn-magnetic btn-slide-bg"
          >
            <span className="relative z-10 flex items-center gap-3">
              {BRAND.cta}
              <ArrowRight className="w-5 h-5" />
            </span>
            <span className="bg-slide bg-[#FF8533]" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs font-mono-data uppercase tracking-widest">Скролл</span>
        <div className="w-6 h-10 border-2 border-[#A0A0A0] rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#FF6B00] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ========================================
// STATS SECTION — Trust Indicators
// ========================================
function Stats() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={statsRef} className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-6">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="stat-card p-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem] hover:border-[#FF6B00]/30 transition-colors"
            >
              <div className="text-5xl md:text-6xl font-heading text-[#FF6B00] mb-4">
                {stat.value}
              </div>
              <p className="text-[#A0A0A0] text-lg leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================================
// FEATURES SECTION — Interactive Artifacts
// ========================================
function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [shufflerIndex, setShufflerIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [schedulerStep, setSchedulerStep] = useState(0);

  // Shuffler animation items
  const shufflerItems = [
    "Гарантия технадзора",
    "Согласование в Ростехнадзоре",
    "BIM-моделирование",
  ];

  // Typewriter messages
  const typewriterMessages = [
    ">>> Инициализация контроля качества...",
    ">>> Проверка изоляции: 15 кВ/мм — НОРМА",
    ">>> Тест обмотки: сопротивление в допуске",
    ">>> Вакуумная заливка: 0.01 мБар — OK",
    ">>> Финальная проверка: ОБОРУДОВАНИЕ ГОТОВО",
  ];

  // Scheduler days
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  // Shuffler interval
  useEffect(() => {
    const interval = setInterval(() => {
      setShufflerIndex((prev) => (prev + 1) % shufflerItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeInterval = setInterval(() => {
      const currentMessage = typewriterMessages[messageIndex];

      if (!isDeleting) {
        setTypewriterText(currentMessage.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentMessage.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      } else {
        setTypewriterText(currentMessage.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          messageIndex = (messageIndex + 1) % typewriterMessages.length;
        }
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  // Scheduler animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSchedulerStep((prev) => (prev + 1) % 10);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!featuresRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
          },
        }
      );
    }, featuresRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={featuresRef}
      id="features"
      className="py-24 md:py-32 bg-[#121212]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading mb-4">
            Три шага к{" "}
            <span className="font-drama text-[#FF6B00]">надёжности</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            От проекта до запуска — полный цикл работ с гарантией результата
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 — Diagnostic Shuffler */}
          <div className="feature-card p-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem] hover:border-[#FF6B00]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#FF6B00]/10 rounded-2xl">
                <FileText className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-heading">{FEATURES[0].title}</h3>
            </div>

            {/* Shuffler UI */}
            <div className="relative h-32 mb-4 overflow-hidden">
              <div className="absolute inset-0 flex flex-col justify-center">
                {shufflerItems.map((item, index) => {
                  const position = (index - shufflerIndex + 3) % 3;
                  const translateY = position * 36;
                  const opacity = position === 1 ? 1 : 0.3;
                  const scale = position === 1 ? 1 : 0.9;

                  return (
                    <div
                      key={item}
                      className="absolute w-full transition-all duration-500"
                      style={{
                        transform: `translateY(${translateY}px) scale(${scale})`,
                        opacity,
                      }}
                    >
                      <div className="px-4 py-2 bg-[#2A2A2A] rounded-xl text-sm font-mono-data text-center">
                        {item}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[#A0A0A0] text-sm">{FEATURES[0].description}</p>
          </div>

          {/* Card 2 — Telemetry Typewriter */}
          <div className="feature-card p-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem] hover:border-[#FF6B00]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#FF6B00]/10 rounded-2xl">
                <Cog className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-heading">{FEATURES[1].title}</h3>
            </div>

            {/* Typewriter UI */}
            <div className="relative p-4 bg-[#0A0A0A] rounded-2xl mb-4 font-mono-data text-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse-dot" />
                <span className="text-[#22C55E] text-xs uppercase tracking-wider">
                  Live Feed
                </span>
              </div>
              <div className="text-[#FF6B00] min-h-[60px]">
                {typewriterText}
                <span className="animate-blink-cursor">|</span>
              </div>
            </div>

            <p className="text-[#A0A0A0] text-sm">{FEATURES[1].description}</p>
          </div>

          {/* Card 3 — Scheduler */}
          <div className="feature-card p-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem] hover:border-[#FF6B00]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#FF6B00]/10 rounded-2xl">
                <Wrench className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-heading">{FEATURES[2].title}</h3>
            </div>

            {/* Scheduler UI */}
            <div className="p-4 bg-[#0A0A0A] rounded-2xl mb-4">
              <div className="grid grid-cols-7 gap-1 mb-3">
                {days.map((day, index) => (
                  <div
                    key={day}
                    className={`text-center text-xs font-mono-data py-2 rounded-lg transition-all duration-300 ${
                      index === schedulerStep % 7
                        ? "bg-[#FF6B00] text-[#121212] scale-95"
                        : index < schedulerStep % 7
                        ? "bg-[#2A2A2A] text-[#A0A0A0]"
                        : "bg-[#1A1A1A] text-[#A0A0A0]"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A0A0A0]">График отгрузки</span>
                <div
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                    schedulerStep >= 7
                      ? "bg-[#FF6B00] text-[#121212]"
                      : "bg-[#2A2A2A] text-[#A0A0A0]"
                  }`}
                >
                  Сохранить
                </div>
              </div>
            </div>

            <p className="text-[#A0A0A0] text-sm">{FEATURES[2].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================
// PHILOSOPHY SECTION — The Manifesto
// ========================================
function Philosophy() {
  const philosophyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!philosophyRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".philosophy-text",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 60%",
          },
        }
      );
    }, philosophyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={philosophyRef}
      className="relative py-32 md:py-48 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <div className="space-y-12">
          <p className="philosophy-text text-xl md:text-2xl text-[#A0A0A0] max-w-3xl">
            Большинство производителей фокусируется на:{" "}
            <span className="text-[#F5F3EE]">массовом производстве и снижении себестоимости.</span>
          </p>
          <p className="philosophy-text text-3xl md:text-5xl lg:text-6xl font-heading leading-tight max-w-4xl">
            Мы фокусируемся на:{" "}
            <span className="font-drama text-[#FF6B00]">надёжности каждого изделия и репутации заказчика.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ========================================
// PROTOCOL SECTION — Sticky Stacking Archive
// ========================================
function Protocol() {
  const protocolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!protocolRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".protocol-card");

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          ScrollTrigger.create({
            trigger: cards[index + 1],
            start: "top 80%",
            onEnter: () => {
              gsap.to(card, {
                scale: 0.9,
                filter: "blur(20px)",
                opacity: 0.5,
                duration: 0.5,
                ease: "power2.inOut",
              });
            },
            onLeaveBack: () => {
              gsap.to(card, {
                scale: 1,
                filter: "blur(0px)",
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut",
              });
            },
          });
        }
      });

      // Animate each card on scroll
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });
    }, protocolRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={protocolRef}
      id="protocol"
      className="py-24 md:py-32 bg-[#121212]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading mb-4">
            Протокол{" "}
            <span className="font-drama text-[#FF6B00]">сотрудничества</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Три шага от заявки до запуска объекта
          </p>
        </div>

        {/* Stacking Cards */}
        <div className="space-y-8">
          {PROTOCOL_STEPS.map((step, index) => (
            <div
              key={step.number}
              className="protocol-card p-8 md:p-12 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem] transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                {/* Step Number & Animation */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 relative flex items-center justify-center">
                    {/* Rotating geometric motif */}
                    <svg
                      className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]"
                      viewBox="0 0 100 100"
                    >
                      {index === 0 && (
                        <>
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#FF6B00"
                            strokeWidth="0.5"
                            strokeDasharray="10 5"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="none"
                            stroke="#FF6B00"
                            strokeWidth="0.5"
                            strokeDasharray="10 5"
                            transform="rotate(180 50 50)"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="25"
                            fill="none"
                            stroke="#FF6B00"
                            strokeWidth="0.5"
                          />
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <rect
                            x="15"
                            y="15"
                            width="70"
                            height="70"
                            fill="none"
                            stroke="#FF6B00"
                            strokeWidth="0.5"
                            transform="rotate(45 50 50)"
                          />
                          <rect
                            x="25"
                            y="25"
                            width="50"
                            height="50"
                            fill="none"
                            stroke="#FF6B00"
                            strokeWidth="0.5"
                            transform="rotate(45 50 50)"
                          />
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <polygon
                            points="50,10 90,90 10,90"
                            fill="none"
                            stroke="#FF6B00"
                            strokeWidth="0.5"
                          />
                          <polygon
                            points="50,25 80,80 20,80"
                            fill="none"
                            stroke="#FF6B00"
                            strokeWidth="0.5"
                          />
                        </>
                      )}
                    </svg>
                    <span className="relative text-2xl md:text-3xl font-mono-data text-[#FF6B00]">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-heading mb-4">
                    {step.title}
                  </h3>
                  <p className="text-[#A0A0A0] text-lg leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>

                {/* Arrow */}
                {index < PROTOCOL_STEPS.length - 1 && (
                  <div className="hidden md:block flex-shrink-0">
                    <ChevronRight className="w-8 h-8 text-[#FF6B00]" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================================
// MASTERS SECTION
// ========================================
function Masters() {
  const mastersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mastersRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".master-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mastersRef.current,
            start: "top 75%",
          },
        }
      );
    }, mastersRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={mastersRef}
      id="masters"
      className="py-24 md:py-32 bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading mb-4">
            Команда{" "}
            <span className="font-drama text-[#FF6B00]">экспертов</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Люди, которые гарантируют результат
          </p>
        </div>

        {/* Master Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {MASTERS.map((master, index) => (
            <div
              key={master.name}
              className="master-card p-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem] hover:border-[#FF6B00]/30 transition-all duration-300 group"
            >
              {/* Avatar */}
              <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-2xl flex items-center justify-center mb-6 text-xl font-heading text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-[#121212] transition-colors">
                {master.avatar}
              </div>

              {/* Info */}
              <h3 className="text-xl font-heading mb-1">{master.name}</h3>
              <p className="text-[#FF6B00] text-sm font-mono-data mb-4">
                {master.role}
              </p>
              <p className="text-[#A0A0A0]">{master.achievement}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================================
// REVIEWS SECTION
// ========================================
function Reviews() {
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reviewsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".review-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: reviewsRef.current,
            start: "top 75%",
          },
        }
      );
    }, reviewsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={reviewsRef}
      id="reviews"
      className="py-24 md:py-32 bg-[#121212]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading mb-4">
            Отзывы{" "}
            <span className="font-drama text-[#FF6B00]">партнёров</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Что говорят о нас клиенты
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => (
            <div
              key={index}
              className="review-card p-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem] hover:border-[#FF6B00]/30 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#FF6B00] fill-[#FF6B00]"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#F5F3EE] mb-6 leading-relaxed">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center text-sm font-heading">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{review.name}</p>
                  <p className="text-[#A0A0A0] text-sm">{review.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================================
// PRICING SECTION
// ========================================
function Pricing() {
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pricingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pricingRef.current,
            start: "top 75%",
          },
        }
      );
    }, pricingRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={pricingRef}
      className="py-24 md:py-32 bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading mb-4">
            Решения{" "}
            <span className="font-drama text-[#FF6B00]">для любого объекта</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Выберите оптимальный вариант под ваши задачи
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PRICING_TIERS.map((tier, index) => (
            <div
              key={tier.name}
              className={`pricing-card p-8 rounded-[2rem] transition-all duration-300 ${
                tier.popular
                  ? "bg-[#FF6B00] text-[#121212] scale-105 shadow-2xl"
                  : "bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#FF6B00]/30"
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="inline-block px-3 py-1 bg-[#121212] text-[#FF6B00] text-xs font-bold rounded-full mb-4">
                  Популярный выбор
                </div>
              )}

              {/* Name */}
              <h3
                className={`text-xl font-heading mb-2 ${
                  tier.popular ? "text-[#121212]" : "text-[#F5F3EE]"
                }`}
              >
                {tier.name}
              </h3>

              {/* Price */}
              <div
                className={`text-4xl font-heading mb-6 ${
                  tier.popular ? "text-[#121212]" : "text-[#FF6B00]"
                }`}
              >
                {tier.price}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2
                      className={`w-5 h-5 flex-shrink-0 ${
                        tier.popular ? "text-[#121212]" : "text-[#FF6B00]"
                      }`}
                    />
                    <span
                      className={
                        tier.popular ? "text-[#121212]/80" : "text-[#A0A0A0]"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`block w-full text-center py-3 rounded-full font-semibold btn-magnetic ${
                  tier.popular
                    ? "bg-[#121212] text-[#FF6B00]"
                    : "bg-[#FF6B00] text-[#121212]"
                }`}
              >
                Получить расчёт
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================================
// CONTACT SECTION
// ========================================
function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (!contactRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-element",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 75%",
          },
        }
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
  };

  return (
    <section
      ref={contactRef}
      id="contact"
      className="py-24 md:py-32 bg-[#121212]"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="contact-element text-3xl md:text-5xl font-heading mb-4">
            Получите точное ТКП и график отгрузки{" "}
            <span className="font-drama text-[#FF6B00]">сегодня</span>
          </h2>
          <p className="contact-element text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Инженер свяжется с вами через 15 минут. Вы получите расчёт цены и чертежи.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="contact-element p-8 md:p-12 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem]"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Имя
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F3EE] placeholder-[#6B6B6B] focus:border-[#FF6B00] focus:outline-none transition-colors"
                placeholder="Ваше имя"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="company"
              >
                Компания
              </label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F3EE] placeholder-[#6B6B6B] focus:border-[#FF6B00] focus:outline-none transition-colors"
                placeholder="Название компании"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="phone">
              Телефон
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F3EE] placeholder-[#6B6B6B] focus:border-[#FF6B00] focus:outline-none transition-colors"
              placeholder="+7 (___) ___-__-__"
              required
            />
          </div>

          <div className="mb-8">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="message"
            >
              Комментарий
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F3EE] placeholder-[#6B6B6B] focus:border-[#FF6B00] focus:outline-none transition-colors resize-none"
              placeholder="Опишите ваш проект или задачу..."
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#FF6B00] text-[#121212] font-bold text-lg rounded-full btn-magnetic btn-slide-bg"
          >
            <span className="relative z-10 flex items-center gap-3">
              Отправить заявку
              <ArrowRight className="w-5 h-5" />
            </span>
            <span className="bg-slide bg-[#FF8533]" />
          </button>
        </form>
      </div>
    </section>
  );
}

// ========================================
// FOOTER
// ========================================
function Footer() {
  return (
    <footer className="bg-[#0A0A0A] rounded-t-[4rem] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 text-xl font-bold mb-4">
              <Zap className="w-6 h-6 text-[#FF6B00]" />
              {BRAND.name}
            </a>
            <p className="text-[#A0A0A0] mb-6">{BRAND.tagline}</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse-dot" />
              <span className="text-xs font-mono-data text-[#A0A0A0]">
                Система активна
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading mb-4">Навигация</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#A0A0A0] hover:text-[#FF6B00] transition-colors link-lift"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading mb-4">Услуги</h4>
            <ul className="space-y-2">
              {FEATURES.map((feature) => (
                <li key={feature.title}>
                  <a
                    href="#features"
                    className="text-[#A0A0A0] hover:text-[#FF6B00] transition-colors link-lift"
                  >
                    {feature.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-[#A0A0A0]">
                <Phone className="w-4 h-4 text-[#FF6B00]" />
                <a href="tel:+78001234567" className="hover:text-[#FF6B00] transition-colors">
                  8 (800) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3 text-[#A0A0A0]">
                <Mail className="w-4 h-4 text-[#FF6B00]" />
                <a href="mailto:info@uralenergo.ru" className="hover:text-[#FF6B00] transition-colors">
                  info@uralenergo.ru
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#A0A0A0]">
                <MapPin className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-1" />
                <span>г. Екатеринбург, ул. Промышленная, 15</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2A2A2A] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#6B6B6B] text-sm">
              © 2024 УРАЛЭНЕРГО. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[#6B6B6B] hover:text-[#FF6B00] text-sm transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-[#6B6B6B] hover:text-[#FF6B00] text-sm transition-colors">
                Реквизиты
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ========================================
// MAIN APP
// ========================================
export default function Home() {
  return (
    <main className="relative bg-[#121212]">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Philosophy />
      <Protocol />
      <Masters />
      <Reviews />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
