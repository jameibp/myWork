const yesNoToBool = (obj: any) => {
  const keysToConvert = [
    "areYouAUsCitizen",
    "willingToComeToTheGuestHouse",
    "readyToRelocate",
  ];
  const result = { ...obj }; // Create a shallow copy of the original object

  for (const key of keysToConvert) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === "yes") {
        result[key] = true;
      } else if (value === "no") {
        result[key] = false;
      }
    }
  }

  return result;
};

export default yesNoToBool;
