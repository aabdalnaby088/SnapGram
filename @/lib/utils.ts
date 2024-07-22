import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTimeAgo(dateString: string): string {
  // Parse the input date string into a Date object
  const inputDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = currentDate.getTime() - inputDate.getTime();

  // Calculate the time difference in seconds, minutes, hours, and days
  const secondsAgo = Math.floor(timeDiff / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(daysAgo / 365);

  // Format the output string
  if (yearsAgo > 0) {
    return `${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
  } else if (monthsAgo > 0) {
    return `${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`;
  } else if (daysAgo > 0) {
    return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}


export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};