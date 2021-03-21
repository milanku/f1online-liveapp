import ReactGA from "react-ga";

export const repCli = (title, targetLink) => {
  /*console.log("CLICKED", {
    category: "online-click",
    action: title.replace(" ", "-"),
    label: targetLink,
    nonInteraction: false,
  });*/
  ReactGA.event({
    category: "online-click",
    action: title.replace(" ", "-"),
    label: targetLink,
    nonInteraction: false,
  });
};

export const repImp = (title, targetIndex, targetLink, reportedImps) => {
  if (!reportedImps.has(targetIndex)) {
    reportedImps.add(targetIndex);
    // console.log("IMPRESSION", {
    //   category: "online-impression",
    //   action: `${targetIndex}`,
    //   label: targetLink,
    //   nonInteraction: true,
    // });
    ReactGA.event({
      category: "online-impression",
      action: `${targetIndex}`,
      label: targetLink,
      nonInteraction: true,
    });
  }
  return reportedImps;
};
