export const changeDateFormat = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes} ${date.getHours() >= 12 ? "pm" : "am"}`;
  return `${day}/${month}/${year} ${time}`;
};
