export default function getTimeDifference(timestamp) {
  const then = new Date(timestamp);
  const now = new Date();

  // Calculate the difference in milliseconds
  const difference = now.getTime() - then.getTime();

  const seconds = Math.floor((difference / 1000) % 60);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const hours = Math.floor((difference / 1000 / 60 / 60) % 24);
  const days = Math.floor(difference / 1000 / 60 / 60 / 24);

  let unit;
  let value;
  if (days > 0) {
    unit = "day" + (days > 1 ? "s" : "");
    value = days;
  } else if (hours > 0) {
    unit = "hour" + (hours > 1 ? "s" : "");
    value = hours;
  } else if (minutes > 0) {
    unit = "minute" + (minutes > 1 ? "s" : "");
    value = minutes;
  } else {
    unit = "second" + (seconds > 1 ? "s" : "");
    value = seconds;
  }

  // Return the formatted string
  return `${value} ${unit} ago`;
}