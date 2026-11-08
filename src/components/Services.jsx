import {
  ArrowUpRight,
  CircleDot,
  CircleDashed,
  Wrench,
  Truck,
} from "lucide-react";
import Photo from "./Photo.jsx";
import Reveal from "./Reveal.jsx";

const services = [
  {
    title: "Шиномонтаж",
    label: "СЕЗОН МЕНЯЕТСЯ. ТЫ ЕДЕШЬ ДАЛЬШЕ.",
    text: "Подготовь свой комплект к следующему сезону. Выбери размер колёс и согласуй время визита.",
    photo: "/images/black-house-alloy-wheel.webp",
    Icon: CircleDot,
  },
  {
    title: "Ремонт порезов",
    label: "ВНИМАНИЕ К КАЖДОЙ ДЕТАЛИ",
    text: "Мастер оценит повреждение, состояние шины и возможность ремонта.",
    photo: "/images/black-house-tire-service.webp",
    Icon: Wrench,
  },
];
export default function Services() {
  return (
    <section
      id="services"
      className="services-section section-pad container revised-services"
    >
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">
            <span className="section-index">01 /</span> СЕРВИС ДЛЯ ТВОЕГО АВТО
          </span>
          <h2>
            Хорошая дорога
            <br />
            начинается <span>здесь.</span>
          </h2>
        </div>
        <p>
          Колёса, кузов, подготовка к сезону.
          <br />
          Одна мастерская — разные задачи.
          <br />
          Выбери, с чем помочь твоей машине.
        </p>
      </Reveal>
      <div className="service-showcase">
        {services.map(({ title, label, text, photo, Icon }, index) => (
          <Reveal className={`service-feature feature-${index}`} key={title}>
            <div className="feature-image">
              <Photo
                src={photo}
                alt={
                  index === 0
                    ? "Колесо автомобиля — фото из карточки Black House"
                    : "Колесо и оборудование — фото из карточки Black House"
                }
              />
              <span className="feature-photo-source">
                ФОТО BLACK HOUSE · 2ГИС
              </span>
              <span className="feature-number">0{index + 1}</span>
            </div>
            <div className="feature-copy">
              <span className="eyebrow">{label}</span>
              <h3>
                {title}
                <Icon size={30} strokeWidth={1.2} />
              </h3>
              <p>{text}</p>
              <a href="#prices">
                Собрать запрос <ArrowUpRight size={19} />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="service-compact-grid">
        <Reveal className="compact-service">
          <CircleDashed size={38} strokeWidth={1.2} />
          <div>
            <span className="eyebrow">03 / К ХОЛОДНОМУ СЕЗОНУ</span>
            <h3>Ошиповка шин</h3>
            <p>
              Обсуди состояние зимних шин
              <br />и подготовку своего комплекта.
            </p>
          </div>
          <a href="#prices" aria-label="Уточнить стоимость ошиповки шин">
            <ArrowUpRight size={24} />
          </a>
        </Reveal>
        <Reveal className="compact-service">
          <Truck size={38} strokeWidth={1.2} />
          <div>
            <span className="eyebrow">04 / ПОМОЩЬ НА МАРШРУТЕ</span>
            <h3>Выездной шиномонтаж</h3>
            <p>
              Позвони, чтобы согласовать
              <br />
              возможность и условия выезда.
            </p>
          </div>
          <a href="#contacts" aria-label="Связаться для выездного шиномонтажа">
            <ArrowUpRight size={24} />
          </a>
        </Reveal>
      </div>
      <Reveal className="bodywork-feature">
        <Photo
          src="/images/black-house-body-paint.webp"
          alt="Автомобиль при подготовке к кузовным работам в Black House"
        />
        <span className="bodywork-shade" />
        <div>
          <span className="eyebrow">БОЛЬШЕ, ЧЕМ ШИНОМОНТАЖ</span>
          <h3>
            Внешний вид.
            <br />
            <span>Внутренний характер.</span>
          </h3>
          <p>
            Покраска, полировка, уход за кузовом.
            <br />
            Все опубликованные цены — ниже.
          </p>
          <a className="button button-primary" href="#prices">
            Посмотреть прайс <ArrowUpRight size={18} />
          </a>
        </div>
        <span className="bodywork-stamp" aria-hidden="true">
          BLACK
          <br />
          HOUSE <small>AUTO / SERVICE</small>
        </span>
        <span className="bodywork-source">
          Фото из карточки Black House · 2ГИС
        </span>
      </Reveal>
    </section>
  );
}
