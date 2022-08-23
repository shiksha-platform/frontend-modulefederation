export const convertToTranslationKey = (data) => {
  return data
    ?.split(/\.?(?=[A-Z])/)
    .join("_")
    .toUpperCase();
};
