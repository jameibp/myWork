function logISTDateTime() {
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const istDateTime = new Date().toLocaleString(
    "en-US",
    options as Intl.DateTimeFormatOptions
  );
  console.log(`${istDateTime}`);
}

export default logISTDateTime;
