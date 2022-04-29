export const momentDateFormats = {
  mm_mm_yyy: "Y-MM-DD",
  y_mm_dd_HH_mm_ss: "Y-MM-DD HH:mm:ss",
  hh_mm_ss: "HH:mm:ss",
};

export const localLanguage = () => {
  return localStorage.getItem("lang") ? localStorage.getItem("lang") : "en";
};
