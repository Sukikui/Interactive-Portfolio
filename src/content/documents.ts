function getDocumentUrl(environmentVariable: string, fallback: string) {
  if (environmentVariable) return environmentVariable;

  if (import.meta.env.DEV) {
    console.warn("[documents] Missing document URL environment variable.");
  }

  return fallback;
}

export const documents = {
  bovoPredictReport: getDocumentUrl(import.meta.env.VITE_BOVO_REPORT_URL, "#"),
  creatisPoster: getDocumentUrl(import.meta.env.VITE_CREATIS_POSTER_URL, "#"),
  cv: getDocumentUrl(import.meta.env.VITE_CV_URL, "#"),
} as const;
