export function sortDataByDateDescending(data) {
  // Create a copy of the array to avoid modifying the original data
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    // Convert the date strings to Date objects for accurate comparison
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // Subtracting dates in JavaScript returns the time difference in milliseconds.
    // A negative result means 'a' comes before 'b'.
    // A positive result means 'b' comes before 'a'.
    // Zero means they are the same.
    return dateB - dateA;
  });

  return sortedData;
}

export function formatRelativeToNow(isoDateString) {
  const now = new Date();
  const pastDate = new Date(isoDateString);
  const secondsElapsed = Math.floor((now - pastDate) / 1000);

  const minutes = Math.floor(secondsElapsed / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (secondsElapsed < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
}
