import { instance, APIResponseType } from "./api";

type MeResponseDataType = {
    id: number;
    email: string;
    login: string;
};

export const headerAPI = {
  headerGetAuth() {
    return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then((response) => {
      return response.data;
    });
  },
};

type LoginResponseType = {
    userId: number;
};

export const loginAPI = {
  logIn(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post<APIResponseType<LoginResponseType>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => {
        return response.data;
      });
  },
  logOut() {
    return instance
      .delete<APIResponseType>(`auth/login`)
      .then((response) => {
        return response.data;
      });
  },
};
