export const getRating = (value) => {
  switch (value) {
    case "hard":
      return 3;

    case "medium":
      return 2;

    default:
    case "easy":
      return 1;
  }
};
