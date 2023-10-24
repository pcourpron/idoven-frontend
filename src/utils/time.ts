export function secondsToHMS(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const pad = (num: number) => {
    const formattedNumber = Number(num.toFixed(4));
    return formattedNumber < 10 ? `0${formattedNumber}` : formattedNumber;
  };

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}
