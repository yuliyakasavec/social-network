import { ThunkAction } from "redux-thunk";
import { headerAPI, loginAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, securityAPI } from "../api/api";
import { AppStateType } from "./redux_store";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

export type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isFetching: boolean;
  isAuth: boolean;
  captchaUrl: string | null;
};

let initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type SetAuthUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string;
};

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType | ToggleIsFetchingActionType;

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};

export const setAuthUserData = ({
  userId,
  email,
  login,
  isAuth,
  captchaUrl,
}: SetAuthUserDataActionPayloadType): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth, captchaUrl },
});

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS; // "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";
  payload: { captchaUrl: string };
};

export const getCaptchaUrlSuccess = (
  captchaUrl: string
): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

export const toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  let data = await headerAPI.headerGetAuth();
  dispatch(toggleIsFetching(false));
  if (data.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = data.data;
    dispatch(
      setAuthUserData({
        userId: id,
        isAuth: true,
        email,
        login,
        captchaUrl: "",
      })
    );
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: null,
  onServerError: (v: string) => void
): ThunkType => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    let data = await loginAPI.logIn(email, password, rememberMe, captcha);
    dispatch(toggleIsFetching(false));
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      onServerError(data.messages.join(" !"));
    }
  };
};

export const getCaptchaUrl = (): ThunkType => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  };
};

export const logout = (): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await loginAPI.logOut();
    dispatch(toggleIsFetching(false));
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(
        setAuthUserData({
          userId: null,
          isAuth: false,
          email: null,
          login: null,
          captchaUrl: "",
        })
      );
    }
  };
};

export default authReducer;
