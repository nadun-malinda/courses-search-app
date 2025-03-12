import { format, isValid } from "date-fns";

/**
 * Formats a given date string into a readable format (e.g., "Jan 1, 2023").
 *
 * @param {string} startDate - The date string to format.
 * @returns {string} The formatted date string if valid, otherwise "Date not available".
 */
export function getFormattedDate(startDate: string): string {
  try {
    const date = new Date(startDate);
    if (isValid(date)) {
      return format(date, "MMM d, yyyy");
    }
  } catch (error) {
    console.error("Invalid date format", error);
  }
  return "Date not available";
}
