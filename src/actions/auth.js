import Checker from "../helper/Checker/Checker";
import api from "../api/api";
import Auth from "../helper/Auth/Auth";

export const userLoggedIn = user => ({
  type: "USER_LOGGED_IN",
  user,
  text: "Successfully logged in. Thank you!"
});

export const userLoggedOut = user => ({
  type: "USER_LOGGED_OUT"
});

export const userRegistered = user => ({
  type: "USER_REGISTERED",
  text: "Thank you for registering! You are now logged in."
});

export const login = credentials => dispatch => {
  return api.user.login(credentials).then(user => {
    //save token to local storage and set timestamp
    Auth.authenticateUser(user);
    dispatch(userLoggedIn(user));
  });
};

export const logout = () => dispatch => {
  //remove token and dispatch action
  Auth.deauthenticateUser();
  dispatch(userLoggedOut());
};

export const register = credentials => dispatch => {
  return api.user.register(credentials).then(iser => {
    Auth.authenticateUser(user);
    dispatch(userLoggedIn(user));
  });
};
