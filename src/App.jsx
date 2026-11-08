import { lazy, Suspense, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  CircleDot,
  Clock3,
  MapPin,
  Phone,
  MessageCircle,
  Menu,
  X,
  Wrench,
  Truck,
  CircleDashed,
  Plus,
  Star,
  Navigation,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { workshop, faqs } from "./data/business.js";
import Reveal from "./components/Reveal.jsx";
import Quote from "./components/Quote.jsx";
import Photo from "./components/Photo.jsx";
const WheelScene = lazy(() => import("./components/WheelScene.jsx"));
const nav = [
  { id: "services", name: "Услуги" },
  { id: "prices", name: "Стоимость" },
  { id: "gallery", name: "Мастерская" },
  { id: "contacts", name: "Контакты" },
];
const services = [
  {
    title: "Шиномонтаж",
    tag: "К следующему сезону",
    text: "Меняешь сезон — меняй шины. Согласуй удобное время и приезжай со своим комплектом.",
    Icon: CircleDot,
    id: "tyre",
  },
  {
    title: "Ремонт порезов",
    tag: "Снова в движении",
    text: "Повреждение шины требует внимания. Мастер оценит состояние и возможность ремонта.",
    Icon: Wrench,
    id: "repair",
  },
  {
    title: "Ошиповка шин",
    tag: "Когда зима рядом",
    text: "Подготовка зимних шин к холодному сезону. Обсуди состояние своего комплекта с мастерской.",
    Icon: CircleDashed,
    id: "studs",
  },
  {
    title: "Выездной шиномонтаж",
    tag: "Помощь на твоём маршруте",
    text: "Не получается доехать? Позвони, чтобы уточнить возможность выезда и условия помощи.",
    Icon: Truck,
    id: "mobile",
  },
];
function Brand() {
  return (
    <a className="brand" href="#home" aria-label="Black House — главная">
      <span className="brand-icon">
        <CircleDot size={31} strokeWidth={2.3} />
      </span>
      <span>
        BLACK HOUSE<small>МАСТЕРСКАЯ ШИНОМОНТАЖА</small>
      </span>
    </a>
  );
}
function BookLink({
  children = "Записаться",
  className = "button button-primary",
}) {
  return (
    <a className={className} href="#contacts">
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Brand />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.name}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={workshop.phoneLink}>
            {workshop.phone}
          </a>
          <BookLink />
          <button
            className="icon-button menu-toggle"
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-menu container"
          aria-label="Мобильная навигация"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              document.querySelector(".menu-toggle").focus();
            }
          }}
        >
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
            >
              {item.name}
              <ArrowUpRight size={17} />
            </a>
          ))}
          <a href={workshop.phoneLink}>
            Позвонить в мастерскую <Phone size={17} />
          </a>
        </nav>
      )}
    </header>
  );
}
function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner container">
        <div className="hero-copy">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="signal-dot" />
            ШИНОМОНТАЖ · НОВОСИБИРСК
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            ДЕРЖИМ
            <br />
            ТВОЙ <em>КУРС.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Смена шин, ремонт и подготовка к сезону.
            <br />
            Больше уверенности в каждой поездке.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <BookLink>Записаться в мастерскую</BookLink>
            <a className="hero-explore" href="#services">
              Наши услуги <ArrowDown size={16} />
            </a>
          </motion.div>
          <a
            className="hero-rating"
            href={workshop.reviews}
            target="_blank"
            rel="noreferrer"
          >
            <span className="rating-value">
              {workshop.rating}
              <Star size={16} fill="currentColor" />
            </span>
            <span>
              <strong>Рейтинг в 2ГИС</strong>
              <small>{workshop.ratingCount} оценок от водителей</small>
            </span>
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="hero-visual">
          <Suspense
            fallback={
              <div className="scene-loading">
                <CircleDot size={160} strokeWidth={0.8} />
                <span>Колесо готовится к движению</span>
              </div>
            }
          >
            <WheelScene />
          </Suspense>
        </div>
      </div>
      <div className="hero-bottom container">
        <a href={workshop.map} target="_blank" rel="noreferrer">
          <MapPin size={16} />
          {workshop.address}
        </a>
        <span>
          <Clock3 size={15} />
          Каждый день · {workshop.hours}
        </span>
        <a className="hero-scroll" href="#services">
          ДАЛЬШЕ — ТВОЯ ДОРОГА <ArrowDown size={16} />
        </a>
      </div>
      <div className="hero-wordmark" aria-hidden="true">
        BLACK HOUSE
      </div>
    </section>
  );
}
function Services() {
  return (
    <section id="services" className="services-section section-pad container">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">ДЛЯ ТВОЕЙ МАШИНЫ И ТВОИХ ПЛАНОВ</span>
          <h2>
            Колёса — наша забота.
            <br />
            <span>Дорога — твоя.</span>
          </h2>
        </div>
        <p>
          От смены сезона до неожиданного прокола.
          <br />
          Выбери задачу — мы на связи.
        </p>
      </Reveal>
      <div className="services-grid">
        {services.map(({ title, tag, text, Icon, id }, index) => (
          <Reveal
            className={`service-card service-${id}`}
            key={id}
            delay={index * 0.05}
          >
            <div className="service-top">
              <span className="service-icon">
                <Icon size={34} strokeWidth={1.4} />
              </span>
              <span className="service-tag">{tag}</span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#prices">
              Уточнить стоимость <ArrowUpRight size={19} />
            </a>
            <div className="service-decoration" aria-hidden="true">
              <Icon size={160} strokeWidth={0.45} />
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="service-note">
        <ShieldCheck size={22} />
        <p>
          Каждое колесо — своя история.
          <br />
          <span>Состояние шин и объём работ обсудим перед записью.</span>
        </p>
        <BookLink className="button button-dark">Обсудить задачу</BookLink>
      </Reveal>
    </section>
  );
}
function Process() {
  return (
    <section className="process-section">
      <div className="container">
        <Reveal className="process-intro">
          <span className="eyebrow">
            ОТ ПЕРВОГО ЗВОНКА ДО СЛЕДУЮЩЕЙ ПОЕЗДКИ
          </span>
          <h2>Заехать просто.</h2>
        </Reveal>
        <div className="process-grid">
          {[
            {
              title: "Выбираешь услугу",
              text: "Размер колёс, нужная работа — собери запрос ниже.",
            },
            {
              title: "Согласуем запись",
              text: "По телефону или в WhatsApp уточним стоимость и время.",
            },
            {
              title: "Приезжаешь в Black House",
              text: "1-я Чулымская, 112/1 к2. Маршрут — в контактах.",
            },
          ].map((step, i) => (
            <Reveal className="process-step" key={step.title} delay={i * 0.08}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              {i < 2 && <ArrowRight size={20} className="step-arrow" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function Workshop() {
  return (
    <section id="gallery" className="workshop-section">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">BLACK HOUSE · 1-Я ЧУЛЫМСКАЯ</span>
            <h2>
              Место, где
              <br />
              <span>знают твои колёса.</span>
            </h2>
          </div>
          <p>
            Мастерская на Лесоперевалке.
            <br />
            Посмотри карточку перед первым визитом.
          </p>
        </Reveal>
        <Reveal className="gallery-source">
          <div className="gallery-graphic" aria-hidden="true">
            <div className="technical-ring ring-one" />
            <div className="technical-ring ring-two" />
            <div className="technical-ring ring-three" />
            <div className="technical-hub">
              <CircleDot size={150} strokeWidth={0.7} />
            </div>
            <span className="graphic-wordmark">
              BLACK
              <br />
              HOUSE
            </span>
            <span className="graphic-caption">ВНИМАНИЕ К КАЖДОЙ ДЕТАЛИ</span>
            <span className="graphic-cross cross-one">+</span>
            <span className="graphic-cross cross-two">+</span>
          </div>
          <div className="gallery-source-copy">
            <span className="eyebrow">ЗАГЛЯНИ ПЕРЕД ВИЗИТОМ</span>
            <h3>
              Мастерская
              <br />в кадре.
            </h3>
            <p>
              Фотографии, отзывы и информация о Black House — в нашей карточке
              2ГИС.
            </p>
            <a
              className="button button-light"
              href={workshop.photoPage}
              target="_blank"
              rel="noreferrer"
            >
              Посмотреть фотографии <ArrowUpRight size={18} />
            </a>
            <span className="gallery-source-count">
              56 фотографий в карточке мастерской
            </span>
          </div>
        </Reveal>
        <div className="workshop-rating">
          <a href={workshop.reviews} target="_blank" rel="noreferrer">
            <span>
              {workshop.rating}
              <Star size={20} fill="currentColor" />
            </span>
            <strong>
              О нас говорят водители
              <small>{workshop.ratingCount} оценок в 2ГИС</small>
            </strong>
            <ArrowUpRight size={22} />
          </a>
          <p>
            Личные впечатления — лучший ориентир.
            <br />
            Почитай отзывы перед поездкой.
          </p>
        </div>
      </div>
    </section>
  );
}
function Faq() {
  return (
    <section id="faq" className="faq-section section-pad container">
      <Reveal className="faq-intro">
        <span className="eyebrow">ПЕРЕД ТЕМ КАК ЗАЕХАТЬ</span>
        <h2>
          По делу.
          <br />
          <span>Без вопросов.</span>
        </h2>
        <p>
          Что нужно знать о записи,
          <br />
          стоимости и работе мастерской.
        </p>
        <a className="text-link" href={workshop.phoneLink}>
          Спросить у мастера <Phone size={16} />
        </a>
      </Reveal>
      <Reveal className="faq-list">
        {faqs.map((item) => (
          <details key={item.title}>
            <summary>
              {item.title}
              <Plus size={19} />
            </summary>
            <p>{item.content}</p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}
function Contacts() {
  return (
    <section id="contacts" className="contacts-section">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">НА СВЯЗИ. РЯДОМ. ПО ДЕЛУ.</span>
            <h2>
              Следующая остановка —<br />
              <span>Black House.</span>
            </h2>
          </div>
          <p>
            Согласуй время перед поездкой.
            <br />
            Остальное обсудим в мастерской.
          </p>
        </Reveal>
        <Reveal className="contacts-layout">
          <div className="contact-card">
            <div className="contact-title">
              <span className="signal-dot" />
              ЗАПИСЬ И ВОПРОСЫ
            </div>
            <a className="contact-phone" href={workshop.phoneLink}>
              {workshop.phone}
              <ArrowUpRight size={22} />
            </a>
            <p>
              Позвони или напиши. Поможем с записью
              <br />и уточним стоимость твоей задачи.
            </p>
            <a
              className="button button-whatsapp"
              href={workshop.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Написать в WhatsApp <MessageCircle size={21} />
            </a>
            <div className="contact-divider" />
            <div className="contact-info">
              <Clock3 size={22} />
              <div>
                <strong>Каждый день · {workshop.hours}</strong>
                <span>Время визита согласуй при записи</span>
              </div>
            </div>
            <div className="contact-info">
              <MapPin size={22} />
              <div>
                <strong>{workshop.address}</strong>
                <span>
                  {workshop.city} · {workshop.district}
                </span>
              </div>
            </div>
            <div className="payment-note">
              <CreditCard size={17} />
              Наличные · Перевод с карты
            </div>
          </div>
          <div className="location-card">
            <Photo
              src="/images/location-map.webp"
              alt="Карта района Лесоперевалка в Новосибирске"
            />
            <div className="map-overlay" />
            <span className="map-area">
              <Navigation size={15} />
              ЛЕСОПЕРЕВАЛКА · НОВОСИБИРСК
            </span>
            <div className="map-address">
              <span className="map-brand">BH</span>
              <span>
                На твоём маршруте.<small>{workshop.address}</small>
              </span>
            </div>
            <div className="map-bottom">
              <span className="map-attribution">
                ©{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noreferrer"
                >
                  OpenStreetMap contributors
                </a>
              </span>
              <a
                className="button button-light"
                href={workshop.map}
                target="_blank"
                rel="noreferrer"
              >
                Построить маршрут <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Brand />
          <span>Уверенность в каждом колесе.</span>
          <a href="#home" className="icon-button" aria-label="Вернуться наверх">
            <ArrowUpRight size={22} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Black House · Новосибирск</span>
          <a href={workshop.map} target="_blank" rel="noreferrer">
            Информация о мастерской: 2ГИС <ArrowUpRight size={13} />
          </a>
          <span>Демонстрационная концепция сайта</span>
        </div>
      </div>
    </footer>
  );
}
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <div id="home" />
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Process />
        <Quote />
        <Workshop />
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
