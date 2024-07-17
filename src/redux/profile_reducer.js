import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: "30" },
    { id: 2, message: "It is my first post", likesCount: "35" },
    { id: 3, message: "Bye", likesCount: "40" },
    { id: 4, message: "Fine", likesCount: "10" },
    { id: 5, message: "Nice to meet you", likesCount: "15" },
    { id: 6, message: "Ok", likesCount: "50" },
  ],
  profile: null,
  status: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 7,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    };
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

export const getUsersProfile = (userId) => {
  return async (dispatch) => {
    const data = await profileAPI.profileGetUsers(userId);
      dispatch(setUserProfile(data));
  };
};

export const getStatus = (userId) => {
  return async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
      dispatch(setStatus(data));
  };
};

export const updateStatus = (status) => {
  return async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
      if (data.resultCode === 0) {
        dispatch(setStatus(status));
      }
  };
};

export default profileReducer;
