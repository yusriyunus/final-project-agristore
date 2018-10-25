const INITIAL_STATE = {
  cct: [],
  fruits: [],
  vegetables: [],
  spices: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_SEARCH_PRODUCTS":
      return { ...action.payload, searchClick: true };
    case "GET_ALL_PRODUCTS":
      return { ...action.payload, searchClick: false };
    default:
      return state;
  }
};


