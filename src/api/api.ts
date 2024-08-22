import axios from "axios";
import { saveProfile } from "../redux/profile_reducer";
import { PhotosType, ProfileType } from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "6e23899c-6120-4846-80ff-13d777b3afbf",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

type GetUsersResponseType = {
  items: [
    {
      id: number
      name: string
      status: string
      photos: PhotosType
      followed: boolean
    }
  ]
  totalCount: number
  error: string
}

type FollowUnfollowResponseType = {
  data: {}
  resultCode: ResultCodesEnum
  messages: string[]
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  unfollow(userId: number) {
    return instance
     .delete<FollowUnfollowResponseType>(`follow/${userId}`)
     .then((response) => {
      return response.data;
    });
  },
  follow(userId: number) {
    return instance
     .post<FollowUnfollowResponseType>(
      `follow/${userId}`,
      {},
    )
     .then((response) => {
        return response.data;
      });
  },
};

type ProfileGetUsersResponseType = ProfileType;

type UpdateStatusResponseType = {
  data: {}
  resultCode: ResultCodesEnum
  messages: string[]
};

type SavePhotoResponseType = {
  data: {
    photos: PhotosType
  }
  resultCode: ResultCodesEnum
  messages: string[]
}

type SaveProfileResponseType = {
  data: {}
  resultCode: ResultCodesEnum
  messages: string[]
}


export const profileAPI = {
    profileGetUsers(userId: number) {
        return instance
          .get<ProfileGetUsersResponseType>(`profile/` + userId)
          .then((response) => {
            return response.data;
          });
      },
    getStatus(userId: number) {
      return instance
          .get(`profile/status/` + userId)
          .then((response) => {
            return response.data;
          });
    },
    updateStatus(status: string) {
      return instance
          .put<UpdateStatusResponseType>(`profile/status/`, {status: status})
          .then((response) => {
            return response.data;
          });
    },
    savePhoto(photoFile: any) {
      const formData = new FormData();
      formData.append("image", photoFile);
      return instance
      .put<SavePhotoResponseType>(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        return response.data;
      })
    },
    saveProfile(profile: ProfileType) {
      return instance
      .put<SaveProfileResponseType>(`profile`, profile)
    }
}

type MeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodesEnum
  messages: string[]
}


export const headerAPI = {
    headerGetAuth() {
        return instance
        .get<MeResponseType>(`auth/me`)
        .then((response) => {
            return response.data;
          });
    }
}

type LoginResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
  messages: string[]
}

type LogOutResponseType = {
  data: {}
  resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
  messages: string[]
}

export const loginAPI = {
  logIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance
        .post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
        .then((response) => {
            return response.data;
          });
  },
  logOut() {
    return instance
        .delete<LogOutResponseType>(`auth/login`)
        .then((response) => {
            return response.data;
          });
  }
}

type GetCaptchaUrlResponseType = {
  url: string
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance
        .get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
        .then((response) => {
            return response.data;
          });
  }
}