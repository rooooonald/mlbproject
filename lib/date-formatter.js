export function getMonth(month) {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return months[month];
}

export function formatDate(date) {
  const dateObj = new Date(date);
  return `${dateObj.getUTCFullYear()} ${getMonth(
    dateObj.getUTCMonth()
  )} ${dateObj.getUTCDate()}`;
}
