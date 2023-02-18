import { LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/types";

export default function (state = { isLoggedIn: false, user: null, myOrders: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        myOrders: payload.myOrders
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        myOrders: []
      };
    default:
      return state;
  }
}
