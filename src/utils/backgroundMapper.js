export const getBackgroundClass = (condition) => {
  const normalized = condition?.toLowerCase() || "";
  if (normalized.includes("clear")) return "bg-clear";
  if (normalized.includes("few clouds")) return "bg-few-clouds";
  if (normalized.includes("cloud")) return "bg-clouds";
  if (normalized.includes("rain")) return "bg-rain";
  if (normalized.includes("shower")) return "bg-shower-rain";
  if (normalized.includes("snow")) return "bg-snow";
  if (normalized.includes("thunderstorm")) return "bg-thunderstorm";
  if (normalized.includes("mist") || normalized.includes("fog"))
    return "bg-mist";
  if (normalized.includes("sun")) return "bg-sunny";
  return "bg-clear";
};
