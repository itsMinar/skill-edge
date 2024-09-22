export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
}
