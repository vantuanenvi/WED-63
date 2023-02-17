import { LOGIN_SUCCESS, LOGIN_FAIL, SET_MESSAGE } from "./types";
import AuthenticateService from "../services/authenticate.service";
export const login = (user) => (dispatch) => {
  return AuthenticateService.login(user).then((data) => {
    if (data.existed) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.user, myOrders: data.myOrders },
      });
      return Promise.resolve();
    } else {
      const message = data.message;
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  });
};
