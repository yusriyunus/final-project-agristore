import axios from "axios";
import { API_URL_AGRISTORE } from "../supports/apiurl/apiurl";

export const onLogin = user => {
  console.log(user);
  return dispatch => {
    axios.post(API_URL_AGRISTORE + "/login", user).then(res => {
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: {
          id: res.data[0]._id,
          username: res.data[0].username,
          email: res.data[0].email,
          password: res.data[0].password,
          cart: res.data[0].cart,
          cartOnCheckOut: res.data[0].cartOnCheckOut,
          error: ""
        }
      });
    });
  };
};

export const keepLogin = email => {
  return dispatch => {
    axios
      .post(API_URL_AGRISTORE + "/keeplogin", {
        email
      })
      .then(user => {
        dispatch({
          type: "USER_LOGIN_SUCCESS",
          payload: {
            id: user.data[0]._id,
            username: user.data[0].username,
            email: user.data[0].email,
            cart: user.data[0].cart,
            cartOnCheckOut: user.data[0].cartOnCheckOut,
            transaksiBerhasil: user.data[0].transaksiBerhasil,
            error: ""
          }
        });
        dispatch({
          type: "COOKIE_CHECKED"
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "USER_LOGIN_FAIL"
        });
      });
  };
};

export const onRegister = user => {
  return dispatch => {
    axios.post(API_URL_AGRISTORE + "/register", user).then(res => {
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: {
          id: res.data.user._id,
          username: res.data.user.username,
          email: res.data.user.email,
          password: res.data.user.password,
          cart: [],
          cartOnCheckOut: [],
          transaksiBerhasil: [],
          error: res.data.err
        }
      });
    });
  };
};

export const cartModified = (user, cartOnCheckOut) => {
  console.log(user);
  return {
    type: "USER_IS_MODIFIYING_CART",
    payload: {
      id: user.data[0]._id,
      username: user.data[0].username,
      email: user.data[0].email,
      password: user.data[0].password,
      cart: user.data[0].cart,
      cartOnCheckOut,
      error: ""
    }
  };
};

export const onLogOut = () => {
  return {
    type: "USER_LOGOUT"
  };
};

export const cookieChecked = () => {
  return {
    type: "COOKIES_CHECKED"
  };
};

const product = {
  cct: [],
  fruits: [],
  vegetables: [],
  spices: []
};
const keys = Object.keys(product);
export const categoryOnClick = (category, searchBy) => {
  console.log(category, searchBy);
  return dispatch => {
    axios
      .post(API_URL_AGRISTORE + `/${category}`, { nama: searchBy })
      .then(res => {
        for (var i = 0; i < keys.length; i++) {
          if (keys[i] == category) {
            product[keys[i]] = res.data;
          }
        }
        console.log(product);
        // this.state[category] = res.data;
        // this.setState();
        if (searchBy !== undefined) {
          dispatch({
            type: "GET_SEARCH_PRODUCTS",
            payload: product
          });
        } else {
          dispatch({
            type: "GET_ALL_PRODUCTS",
            payload: product
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};
