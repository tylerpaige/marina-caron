export function formatDate(date) {
  if (!date) {
    return null;
  }

  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export function formatDateRange(startDate, endDate) {
  if (!endDate) {
    return formatDate(startDate);
  }

  // If start month/year/day is the same as end date's, only show the start date
  // If start month/year is the same as end date's, only show the start month/day - end day
  // If start year is the same as end date's, only show the start month/day - end month/day
  // Otherwise, show the full date range
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startMonth = start.toLocaleDateString("en-US", { month: "long" });
  const startYear = start.getFullYear();
  const startDay = start.getDate();
  const endMonth = end.toLocaleDateString("en-US", { month: "long" });
  const endYear = end.getFullYear();
  const endDay = end.getDate();

  if (startMonth === endMonth && startYear === endYear && startDay === endDay) {
    return formatDate(startDate);
  } else if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startDay}–${endDay}, ${endYear}`;
  } else if (startYear === endYear) {
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${endYear}`;
  } else {
    return `${formatDate(startDate)} – ${formatDate(endDate)}`;
  }
};

export function renderDateDisplay({ displayDate, startDate, endDate, date }) {
  if (displayDate) {
    return displayDate;
  } else if (date) {
    return formatDate(date);
  } else {
    return formatDateRange(startDate, endDate);
  }
}
