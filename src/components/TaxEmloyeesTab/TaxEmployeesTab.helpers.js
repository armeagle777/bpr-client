export const getBestPhoto = (documents) => {
  if (!Array.isArray(documents)) return null;

  const priority = ["VALID", "PRIMARY_VALID", "INVALID"];

  for (const status of priority) {
    const doc = documents?.find(
      (d) => d.Document_Status === status && d.Photo_ID
    );
    if (doc) {
      return `data:image/jpeg;base64,${doc.Photo_ID}`;
    }
  }

  return null;
};
