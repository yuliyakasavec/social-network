import { ThunkAction } from "redux-thunk";
import {
  headerAPI,
  loginAPI,
  ResultCodeForCaptchaEnum,
  ResultCodesEnum,
  securityAPI,
} from "../api/api";
import { AppStateType, InferActionsTypes } from "./redux_store";


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

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'samurai-network/auth/SET_USER_DATA':
    case 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    case 'TOGGLE_IS_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setAuthUserData: ({
    userId,
    email,
    login,
    isAuth,
    captchaUrl,
  }: SetAuthUserDataActionPayloadType) => ({ type: 'samurai-network/auth/SET_USER_DATA', payload: { userId, email, login, isAuth, captchaUrl } } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
};

type SetAuthUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string;
};

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  let data = await headerAPI.headerGetAuth();
  dispatch(actions.toggleIsFetching(false));
  if (data.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = data.data;
    dispatch(
      actions.setAuthUserData({
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
    dispatch(actions.toggleIsFetching(true));
    let data = await loginAPI.logIn(email, password, rememberMe, captcha);
    dispatch(actions.toggleIsFetching(false));
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
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
  };
};

export const logout = (): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    let data = await loginAPI.logOut();
    dispatch(actions.toggleIsFetching(false));
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(
        actions.setAuthUserData({
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
