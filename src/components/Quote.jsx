import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  CircleDot,
  MessageCircle,
  Plus,
} from "lucide-react";
import { quoteServices, diameters, buildQuote } from "../data/quote.js";
import { workshop, historicalPrices } from "../data/business.js";
import Reveal from "./Reveal.jsx";
export default function Quote() {
  const [service, setService] = useState("tyre");
  const [diameter, setDiameter] = useState("R16");
  const [count, setCount] = useState(4);
  const message = buildQuote({ service, diameter, count });
  return (
    <section id="prices" className="quote-section section-pad container">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">
            <span className="section-index">02 /</span> УСЛУГИ И СТОИМОСТЬ
          </span>
          <h2>
            Всё по делу.
            <br />
            <span>Каждая цена на виду.</span>
          </h2>
        </div>
        <p>
          Все цены, опубликованные мастерской в 2ГИС.
          <br />
          Шиномонтаж — по твоему запросу.
        </p>
      </Reveal>
      <Reveal className="price-catalog">
        <div className="price-catalog-intro">
          <span className="eyebrow">ПРАЙС BLACK HOUSE / 2ГИС</span>
          <h3>
            Кузов. <br />
            Свет. <br />
            <span>Детали.</span>
          </h3>
          <p>
            Покраска и уход
            <br />
            за автомобилем.
          </p>
          <span className="price-source-date">
            Обновлён в 2ГИС: <strong>04.06.2022</strong>
          </span>
        </div>
        <div className="price-sheet">
          <div className="price-sheet-label">
            <span>УСЛУГА</span>
            <span>СТОИМОСТЬ, ₽</span>
          </div>
          <ul>
            {historicalPrices.map((item, index) => (
              <li className="price-row" key={item.title}>
                <span className="price-row-index">0{index + 1}</span>
                <span className="price-row-name">
                  {item.title}
                  {item.description && <small>{item.description}</small>}
                </span>
                <strong>
                  <small>от</small>{" "}
                  {new Intl.NumberFormat("ru-RU").format(item.price)}{" "}
                  <small>₽</small>
                </strong>
              </li>
            ))}
          </ul>
          <div className="price-catalog-note">
            <p>
              В источнике указан прайс 2022 года. Актуальную стоимость и
              возможность выполнения работ уточни перед визитом.
            </p>
            <a
              href={workshop.pricesPage}
              target="_blank"
              rel="noreferrer"
              aria-label="Открыть полный прайс в 2ГИС"
            >
              <ArrowUpRight size={23} />
            </a>
          </div>
        </div>
      </Reveal>
      <Reveal className="quote-builder-heading">
        <span className="eyebrow">ШИНОМОНТАЖ / ЛИЧНЫЙ ЗАПРОС</span>
        <h3>Под твои колёса.</h3>
        <p>Выбери работу и размер. Мастерская подскажет стоимость.</p>
      </Reveal>
      <Reveal className="quote-layout">
        <div className="quote-options">
          <fieldset>
            <legend>Что делаем?</legend>
            <div className="service-options">
              {quoteServices.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setService(item.id)}
                  aria-pressed={service === item.id}
                  className={service === item.id ? "selected" : ""}
                >
                  {item.label}
                  {service === item.id ? (
                    <Check size={17} />
                  ) : (
                    <Plus size={17} />
                  )}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Диаметр диска</legend>
            <div className="diameter-options">
              {diameters.map((size) => (
                <button
                  type="button"
                  key={size}
                  aria-pressed={diameter === size}
                  className={diameter === size ? "selected" : ""}
                  onClick={() => setDiameter(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="unknown-size"
              aria-pressed={diameter === "unknown"}
              onClick={() => setDiameter("unknown")}
            >
              {diameter === "unknown" && <Check size={14} />}Не знаю размер
            </button>
          </fieldset>
          <fieldset className="wheel-count">
            <legend>Количество колёс</legend>
            <div>
              {[1, 2, 4].map((amount) => (
                <button
                  type="button"
                  key={amount}
                  aria-pressed={count === amount}
                  className={count === amount ? "selected" : ""}
                  onClick={() => setCount(amount)}
                >
                  {amount} {amount === 1 ? "колесо" : "колеса"}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <aside className="quote-summary" aria-label="Запрос в мастерскую">
          <span className="eyebrow">ГОТОВО К СЛЕДУЮЩЕЙ ПОЕЗДКЕ</span>
          <div className="quote-wheel" aria-hidden="true">
            <CircleDot size={92} strokeWidth={0.7} />
            <span>{diameter === "unknown" ? "R?" : diameter}</span>
          </div>
          <h3>{quoteServices.find((item) => item.id === service).label}</h3>
          <p className="quote-selection" aria-live="polite">
            {diameter === "unknown" ? "Размер уточним" : diameter}{" "}
            <span>·</span> {count} {count === 1 ? "колесо" : "колеса"}
          </p>
          <div className="quote-cost">
            <strong>Уточним стоимость</strong>
            <span>По твоему запросу, перед записью</span>
          </div>
          <a
            className="button button-primary"
            href={`${workshop.whatsapp}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noreferrer"
          >
            Отправить запрос <MessageCircle size={19} />
          </a>
          <a href="#contacts" className="quote-call">
            Или связаться по телефону <ArrowUpRight size={14} />
          </a>
          <p className="quote-disclaimer">
            Сообщение можно проверить перед отправкой. Время и работу
            подтверждает мастерская.
          </p>
        </aside>
      </Reveal>
    </section>
  );
}
