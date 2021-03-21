const pickPartner = ({ partnersVector, partnersData }) => {
  const randomNumber = 100 * Math.random(); //0 - 99.999

  let i = 0;
  let aggregator = 0;
  while (i < partnersVector.length) {
    aggregator += parseFloat(partnersVector[i].probability);
    if (aggregator > randomNumber) break;
    i++;
  }
  return i === partnersVector.length
    ? null
    : {
        ...partnersData[`${partnersVector[i].name}`],
        name: partnersVector[i].name,
      };
};

const filterImpressedPartners = ({
  impressionsData,
  partnersData,
  cappings,
}) => {
  return partnersData.filter(
    (partner) =>
      !impressionsData[`${partner.name}`] ||
      impressionsData[`${partner.name}`] < cappings[`${partner.name}`].capping
  );
};

const randomArrayElement = (array) => {
  if (!array || array.lenght === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

export { pickPartner, filterImpressedPartners, randomArrayElement };
