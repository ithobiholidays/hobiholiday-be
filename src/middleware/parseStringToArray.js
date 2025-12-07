exports.parseStringToArray = (input) => {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");
};
