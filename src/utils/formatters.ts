export const formatDate = (dateString: string): string => {
  if (!dateString || dateString === "N/A") return "N/A";

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    return dateString;
  }
};

export const formatRuntime = (runtime: string): string => {
  if (!runtime || runtime === "N/A") return "N/A";

  // If it's already in the format "XX min", just return it
  if (runtime.includes("min")) return runtime;

  // If it's just a number, add "min" to it
  const minutes = parseInt(runtime, 10);
  if (!isNaN(minutes)) {
    return `${minutes} min`;
  }

  return runtime;
};
