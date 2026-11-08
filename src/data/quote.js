export const quoteServices = [
  { id: "tyre", label: "Шиномонтаж" },
  { id: "repair", label: "Ремонт порезов" },
  { id: "studs", label: "Ошиповка шин" },
  { id: "mobile", label: "Выездной шиномонтаж" },
];
export const diameters = Array.from({ length: 10 }, (_, i) => `R${i + 13}`);
export function buildQuote({ service, diameter, count }) {
  const work = quoteServices.find((item) => item.id === service);
  if (
    !work ||
    ![...diameters, "unknown"].includes(diameter) ||
    ![1, 2, 4].includes(count)
  ) {
    throw new RangeError("Выберите услугу, размер и количество колёс");
  }
  const size = diameter === "unknown" ? "размер уточню" : diameter;
  const wheels = count === 1 ? "колесо" : "колеса";
  return `Здравствуйте! Хочу уточнить стоимость и записаться: ${work.label.toLocaleLowerCase("ru")}, ${size}, ${count} ${wheels}. Подскажите цену и свободное время.`;
}
