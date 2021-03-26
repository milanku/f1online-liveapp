import ReactGA from "react-ga";

export const reportImp = ({ link, partner, index, reportedImpressions }) => {
  if (!reportedImpressions.has(index)) {
    reportedImpressions.add(index);
    // console.log("IMPRESSION", {
    //   category: "Live-Feed-item-imp",
    //   action: partner,
    //   label: `${index + 1}.odkaz`,
    //   nonInteraction: true,
    //   dimension1: link,
    //   dimension2: window.innerWidth < 1024 ? "m" : "pc",
    // });
    ReactGA.event({
      category: "Live-Feed-item-imp",
      action: partner,
      label: `${index + 1}.odkaz`,
      nonInteraction: true,
      dimension1: link,
      dimension2: window.innerWidth < 1024 ? "m" : "pc",
    });
  }
  return reportedImpressions;
};

export const reportClick = ({ link, partner, index }) => {
  // console.log("IMPRESSION CLICK", {
  //   category: "Live-Feed-item-click",
  //   action: partner,
  //   label: `${index + 1}.odkaz`,
  //   nonInteraction: false,
  //   dimension1: link,
  //   dimension2: window.innerWidth < 1024 ? "m" : "pc",
  // });
  ReactGA.event({
    category: "Live-Feed-item-click",
    action: partner,
    label: `${index + 1}.odkaz`,
    nonInteraction: false,
    dimension1: link,
    dimension2: window.innerWidth < 1024 ? "m" : "pc",
  });
};
