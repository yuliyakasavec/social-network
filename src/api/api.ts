import axios from "axios";
import { saveProfile } from "../redux/profile_reducer";
import { PhotosType, ProfileType } from "../types/types";

export const instance = axios.create({
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

export type APIResponseType<D = {}, RC = ResultCodesEnum | ResultCodeForCaptchaEnum> = {
  data: D;
  messages: string[];
  resultCode: RC;
}