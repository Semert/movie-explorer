export const getResultsSummary = (
  totalResults: number,
  searchQuery?: string,
  searchType?: string,
  searchYear?: string
): string => {
  if (totalResults <= 0) return "No results found";

  let summary = `Found ${totalResults} result${totalResults !== 1 ? "s" : ""}`;

  if (searchQuery?.trim()) {
    summary += ` for "${searchQuery.trim()}"`;
  }

  const filters: string[] = [];

  if (searchType) {
    filters.push(
      `Type: ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`
    );
  }

  if (searchYear) {
    filters.push(`Year: ${searchYear}`);
  }

  if (filters.length > 0) {
    summary += ` with filters: ${filters.join(", ")}`;
  }

  return summary;
};
