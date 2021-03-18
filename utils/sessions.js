const SESSION_NAMES = {
  FP1: "1. tréning",
  FP2: "2. tréning",
  FP3: "3. tréning",
  Q: "Kvalifikácia",
  R: "Preteky",
};

const SESSION_DURATIONS = {
  FP1: 60,
  FP2: 60,
  FP3: 60,
  Q: 60,
};

const getTimeString = (num) => {
  if (num === 0) return "00";
  if (num < 10) return `0${num}`;
  return num;
};

const getSesDurationText = (startTime, session) => {
  const minsStart =
    60 * parseInt(startTime.split(":")[0]) + parseInt(startTime.split(":")[1]);
  const h = Math.floor((minsStart + session) / 60);
  const m = (minsStart + session) % 60;

  return `${startTime} - ${getTimeString(h)}:${getTimeString(m)}`;
};

export { SESSION_NAMES, SESSION_DURATIONS, getSesDurationText };
