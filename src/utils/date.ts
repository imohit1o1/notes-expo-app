/**
 * Formats a date string into "DD MMM, YYYY" format (e.g., "12 May, 2026").
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};
