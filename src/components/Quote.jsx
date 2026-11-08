import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  CircleDot,
  MessageCircle,
  Minus,
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
          <span className="eyebrow">ТОЧНО ПОД ТВОИ КОЛЁСА</span>
          <h2>
            Твоя задача.
            <br />
            <span>Понятный запрос.</span>
          </h2>
        </div>
        <p>
          Выбери, что нужно сделать.
          <br />
          Стоимость и время подскажет мастерская.
        </p>
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
      <details className="other-prices">
        <summary>
          <span>
            Другие услуги мастерской<small>Прайс в 2ГИС от 04.06.2022</small>
          </span>
          <Plus className="details-plus" size={21} />
          <Minus className="details-minus" size={21} />
        </summary>
        <div className="other-prices-content">
          <p>
            В опубликованном прайсе также есть работы по уходу за автомобилем.
            Эти цены датированы 2022 годом — актуальную стоимость и доступность
            услуг уточни перед визитом.
          </p>
          <ul>
            {historicalPrices.map((item) => (
              <li key={item.title}>
                <span>{item.title}</span>
                <strong>
                  от {new Intl.NumberFormat("ru-RU").format(item.price)} ₽
                </strong>
              </li>
            ))}
          </ul>
          <a
            className="text-link"
            href={workshop.pricesPage}
            target="_blank"
            rel="noreferrer"
          >
            Прайс мастерской в 2ГИС <ArrowUpRight size={17} />
          </a>
        </div>
      </details>
    </section>
  );
}
