export const TYPES = {
  INITIALIZE: "THEME_INITIALIZE",
  CHANGE: "THEME_CHANGE",
  SET: "THEME_SET"
};

const initializeTheme = () => ({
  type: TYPES.INITIALIZE
});

const setTheme = theme => ({
  type: TYPES.SET,
  theme
});

export { setTheme, initializeTheme };
