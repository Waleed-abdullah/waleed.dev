/**
 * Formats a post date (`YYYY-MM-DD`) as e.g. "Aug 10, 2025" or, with
 * `month: 'long'`, "August 10, 2025". The explicit locale and UTC time zone
 * keep server and client output identical.
 */
export const formatPostDate = (
  date: string,
  month: 'short' | 'long' = 'short'
) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
    timeZone: 'UTC',
  });
};
