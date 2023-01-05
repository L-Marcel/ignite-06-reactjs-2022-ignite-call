export function convertTimeFromStringToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);
  const totalMinutes = minutes + (hours * 60);

  return totalMinutes;
}