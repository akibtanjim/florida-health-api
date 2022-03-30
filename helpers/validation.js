const rules = {
  search: {
    name: "required_without_all:state,city|required_if:name,",
    state:
      "required_without_all:name,city|required_if:state,|in:Florida,florida",
    city: "required_without_all:name,state|required_if:city,",
    providerType: "required_if:providerType,",
    storeData: "required_if:storeData,|boolean",
    images: "required_if:images,|array|isArray",
    "images.*": "required_if:images.*,|isBase64",
  },
};

const messages = {
  search: {
    "in.state": "State field value must be either Florida or florida",
    "boolean.storeData": "Store data value must be true/false",
  },
};

module.exports = {
  rules,
  messages,
};
