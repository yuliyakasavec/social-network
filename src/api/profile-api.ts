import { PhotosType, ProfileType } from "../types/types";
import { instance, APIResponseType } from "./api";

type SavePhotoResponseType = {
    photos: PhotosType
}


export const profileAPI = {
    profileGetUsers(userId: number) {
        return instance
          .get<ProfileType>(`profile/` + userId)
          .then((response) => {
            return response.data;
          });
      },
    getStatus(userId: number) {
      return instance
          .get<string>(`profile/status/` + userId)
          .then((response) => {
            return response.data;
          });
    },
    updateStatus(status: string) {
      return instance
          .put<APIResponseType>(`profile/status/`, {status: status})
          .then((response) => {
            return response.data;
          });
    },
    savePhoto(photoFile: any) {
      const formData = new FormData();
      formData.append("image", photoFile);
      return instance
      .put<APIResponseType<SavePhotoResponseType>>(`profile/photo`, formData, {
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
      .put<APIResponseType>(`profile`, profile)
    }
}