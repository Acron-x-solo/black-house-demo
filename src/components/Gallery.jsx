import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Expand,
  X,
  Star,
} from "lucide-react";
import { photos } from "../data/photos.js";
import { workshop } from "../data/business.js";
import Photo from "./Photo.jsx";
import Reveal from "./Reveal.jsx";

const captions = [
  "Автомобили клиентов",
  "В мастерской",
  "Колёса в работе",
  "Повреждение диска",
  "Внимание к кузову",
  "Каждая деталь имеет значение",
  "Black House на Чулымской",
  "Работа с салоном",
  "Подготовка бампера",
  "Подготовка к покраске",
  "Кузовные работы",
  "BMW в мастерской",
];

export default function Gallery() {
  const dialog = useRef(null);
  const opener = useRef(null);
  const [active, setActive] = useState(0);
  const photo = photos[active];
  const move = (direction) =>
    setActive(
      (current) => (current + direction + photos.length) % photos.length,
    );
  const open = (index, event) => {
    setActive(index);
    opener.current = event.currentTarget;
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
  };
  const close = () => dialog.current.close();
  const onClose = () => {
    document.body.style.overflow = "";
    opener.current?.focus({ preventScroll: true });
  };
  return (
    <section id="gallery" className="workshop-section photo-workshop">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="section-index">03 /</span> МАСТЕРСКАЯ В КАДРЕ
            </span>
            <h2>
              Без лишних слов.
              <br />
              <span>Смотри на работу.</span>
            </h2>
          </div>
          <div className="gallery-heading-note">
            <span className="gallery-count">
              12 <small>/ 56</small>
            </span>
            <p>
              Реальные фотографии Black House
              <br />
              из карточки мастерской в 2ГИС.
            </p>
          </div>
        </Reveal>
        <div className="photo-mosaic">
          {photos.map((item, index) => (
            <Reveal
              className={`gallery-item gallery-item-${index}`}
              key={item.src}
            >
              <button
                className="gallery-photo-button"
                type="button"
                onClick={(event) => open(index, event)}
                aria-label={`Открыть фото: ${captions[index]}`}
              >
                <Photo src={item.src} alt={captions[index]} />
                <span className="photo-shade" />
                <span className="photo-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="photo-expand">
                  <Expand size={18} />
                </span>
                <span className="photo-caption">
                  {captions[index]}
                  <small>2ГИС · {item.attribution}</small>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="gallery-after">
          <p>
            Мастерская, автомобили и детали — глазами клиентов и команды.
            <br />
            Нажми на фотографию, чтобы рассмотреть её целиком.
          </p>
          <a
            className="button button-outline"
            href={workshop.photoPage}
            target="_blank"
            rel="noreferrer"
          >
            Все 56 фото в 2ГИС <ArrowUpRight size={18} />
          </a>
        </div>
        <Reveal className="workshop-rating">
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
        </Reveal>
      </div>
      <dialog
        ref={dialog}
        className="photo-lightbox"
        aria-labelledby="gallery-dialog-title"
        onClose={onClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <div className="lightbox-content">
          <div className="lightbox-top">
            <h2 id="gallery-dialog-title">Фотографии Black House</h2>
            <span className="lightbox-counter">
              {String(active + 1).padStart(2, "0")} / {photos.length}
            </span>
            <button
              className="icon-button"
              autoFocus
              type="button"
              aria-label="Закрыть фотографии"
              onClick={close}
            >
              <X size={22} />
            </button>
          </div>
          <div className="lightbox-image">
            <Photo
              key={photo.src}
              src={photo.src}
              alt={captions[active]}
              loading="eager"
            />
          </div>
          <div className="lightbox-bottom">
            <div>
              <strong>{captions[active]}</strong>
              <a href={photo.source} target="_blank" rel="noreferrer">
                Фото: {photo.author} · 2ГИС <ArrowUpRight size={13} />
              </a>
            </div>
            <div className="lightbox-nav">
              <button
                className="icon-button"
                type="button"
                aria-label="Предыдущее фото"
                onClick={() => move(-1)}
              >
                <ArrowLeft size={20} />
              </button>
              <button
                className="icon-button"
                type="button"
                aria-label="Следующее фото"
                onClick={() => move(1)}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
}
