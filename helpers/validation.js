const rules = {
  //TODO: add custom validation check if any of name/city/state is present when provider type value is all
  search: {
    name: "required_without_all:state,city|required_if:name,",
    state:
      "required_without_all:name,city|required_if:state,|in:Florida,florida",
    city: "required_without_all:name,state|required_if:city,",
    providerType: "required_if:providerType,",
  },
};

const messages = {
  search: {
    "in.state": "State field value must be either Florida or florida",
  },
};

module.exports = {
  rules,
  messages,
};
