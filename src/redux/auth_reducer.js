import { headerAPI, loginAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth, captchaUrl) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth, captchaUrl },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaUrl},
});

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const getAuthUserData = () => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  let data = await headerAPI.headerGetAuth();
  dispatch(toggleIsFetching(false));
  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha, onServerError) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await loginAPI.logIn(email, password, rememberMe, captcha, onServerError);
    dispatch(toggleIsFetching(false));
    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      } 
      onServerError(data.messages.join(" !"));
      
    }
  };
};

export const getCaptchaUrl = () => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await loginAPI.logOut();
    dispatch(toggleIsFetching(false));
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false, null));
    }
  };
};

export default authReducer;
