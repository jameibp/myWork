const infoMapper = (obj: any) => {
  const newObj: any = {};
  for (const key in obj) {
    if (!["__v", "_id", "userId"].includes(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export default {
  infoMapper,
};
