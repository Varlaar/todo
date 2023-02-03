// Добавление 0 перед месяцем, днем, часами и минутами (если меньше 10)
const addLeadingZero = (d) => {
  return d < 10 ? "0" + d : d;
};

// Получение даты и времени задачи из timestamp (date.seconds)
export const getTodoTime = (time = new Date()) => {
  const YEAR = time.getFullYear();
  const MONTH = addLeadingZero(time.getMonth() + 1);
  const DAY = addLeadingZero(time.getDate());
  const HOURS = addLeadingZero(time.getHours());
  const MINUTES = addLeadingZero(time.getMinutes());
  return `${YEAR}.${MONTH}.${DAY} ${HOURS}:${MINUTES}`;
};