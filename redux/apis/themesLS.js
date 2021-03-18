import { THEMES } from "../../constants";

const getTheme = () => {
  const themeFromLS = window.localStorage.getItem("theme-name");
  switch (themeFromLS) {
    case THEMES.LIGHT:
      return THEMES.LIGHT;
    case THEMES.DARK:
      return THEMES.DARK;

    default:
      return THEMES.LIGHT;
  }
};

const saveTheme = themeID => {
  //window.localStorage.setItem("theme-name", themeID);
};

export { getTheme, saveTheme };
