const onClient = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return true;
};

export default onClient;
