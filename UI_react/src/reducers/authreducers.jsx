const INITIAL_STATE = {
  id: 0,
  username: "",
  email: "",
  password: "",
  cart: [],
  cartOnCheckOut: [],
  transaksiBerhasil: [],
  cookie: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      return { ...action.payload, cookie: true };
    case "USER_IS_MODIFIYING_CART":
      return { ...action.payload, cookie: true };
    case "USER_LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};
