const { Op } = require("@sequelize/core");
const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const getFaciltySearchConditions = (name, state, city) => {
  let condtitions = [];
  if (name) {
    condtitions = [
      ...condtitions,
      {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    ];
  }
  if (state) {
    condtitions = [
      ...condtitions,
      {
        state: {
          [Op.like]: `%${state}%`,
        },
      },
    ];
  }
  if (city) {
    condtitions = [
      ...condtitions,
      {
        city: {
          [Op.like]: `%${city}%`,
        },
      },
    ];
  }
  return condtitions;
};

const camelize = str => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return "";
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

const keyMapper = name => {
  switch (name) {
    case "Street Address":
      return "address";
    case "Phone Number":
      return "phone";
    case "Licensed Beds":
      return "capacity";
    default:
      return camelize(name);
  }
};

const prepareScrappedDataResponse = items => {
  if (items.length) {
    const [keysList, ...valuesList] = items;

    return valuesList.map(values => {
      const obj = {};
      values.forEach((val, i) => {
        obj[keyMapper(keysList[i])] = val;
      });
      return {
        ...obj,
        slug: obj.name
          .toLowerCase()
          .replace("-", " ")
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
      };
    });
  }
  return [];
};

module.exports = {
  chunkArray,
  getFaciltySearchConditions,
  camelize,
  keyMapper,
  prepareScrappedDataResponse,
};
