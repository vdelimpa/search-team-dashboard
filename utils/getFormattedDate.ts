const formatMonth = (month: number) => {
  return month < 10 ? "0" + month : month;
};

const formatDay = (day: number) => {
  return day < 10 ? "0" + day : day;
};

export const formattedDate = (timestamp: any) => {
  const formatDate = timestamp.toDate();
  const year = formatDate.getFullYear();
  const month = formatDate.getMonth() + 1;
  const day = formatDate.getDate();

  return `${year}-${formatMonth(month)}-${formatDay(day)}`;
};

export const getTodayDate = () => {
  const todayTimestamp = new Date();
  const year = todayTimestamp.getUTCFullYear();
  const month = todayTimestamp.getMonth() + 1;
  const day = todayTimestamp.getDate();

  return `${year}-${formatMonth(month)}-${formatDay(day)}`;
};
