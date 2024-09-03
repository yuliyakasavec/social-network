import { ThunkAction } from "redux-thunk";
import { ResultCodesEnum } from "../api/api";
import { PhotosType, PostsType, ProfileType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./redux_store";
import { profileAPI } from "../api/profile-api";


export type InitialProfileStateType = {
  posts: Array<PostsType>,
  profile: ProfileType | null,
  status: string
}

let initialState: InitialProfileStateType = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 30 },
    { id: 2, message: "It is my first post", likesCount: 35 },
    { id: 3, message: "Bye", likesCount: 40 },
    { id: 4, message: "Fine", likesCount: 10 },
    { id: 5, message: "Nice to meet you", likesCount: 15 },
    { id: 6, message: "Ok", likesCount: 50 },
  ],
  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialProfileStateType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD_POST':
      let newPost = {
        id: 7,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case 'SN/PROFILE/SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case 'SN/PROFILE/SET_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }
    case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof profileActions>;

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
type ThunkTypeForSaveProfile = ThunkAction<Promise<string[] | undefined>, AppStateType, unknown, ActionsTypes>

export const profileActions = {
  addPostActionCreator: (newPostText: string) => ({ type: 'SN/PROFILE/ADD_POST', newPostText } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)
}



export const getUsersProfile = (userId: number): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.profileGetUsers(userId);
    dispatch(profileActions.setUserProfile(data));
  };
};

export const getStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(profileActions.setStatus(data));
  };
};

export const updateStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    try {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.setStatus(status));
    }
  } catch(error) {
  }
  };
};

export const savePhoto = (file: File): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    console.log(data)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.savePhotoSuccess(data.data.photos));
    }
  };
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const saveProfile = (profile: ProfileType): ThunkTypeForSaveProfile => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.data.resultCode !== ResultCodesEnum.Success) {
      return data.data.messages;
    }
    delay(4000).then(() => {
      if (data.data.resultCode === ResultCodesEnum.Success && userId) {
        dispatch(getUsersProfile(userId));
      }
    });
  };
};

export default profileReducer;
