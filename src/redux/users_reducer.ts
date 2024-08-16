import { usersAPI } from "../api/api";
import { PhotosType, UsersType } from "../types/types";
import { updateObjectInArray } from "../utils/object_helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";


export type InitialStateType = {
  users: Array<UsersType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[]; //array of users id's
};

let initialState: InitialStateType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
        // users: [...state.users],
        // users: state.users.map((u) => {
        //   if (u.id === action.userId) {
        //     return { ...u, followed: true };
        //   }
        //   return u;
        // }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

type FollowSuccessActionCreatorType = {
  type: typeof FOLLOW;
  userId: number;
};

export const followSuccess = ( userId: number ): FollowSuccessActionCreatorType => ({
   type: FOLLOW,
   userId 
  });

type UnFollowSuccessActionCreatorType = {
  type: typeof UNFOLLOW;
  userId: number;
};

export const unfollowSuccess = (userId: number): UnFollowSuccessActionCreatorType => ({
   type: UNFOLLOW,
   userId 
  });

type SetUsersActionCreatorType = {
  type: typeof SET_USERS;
  users: UsersType[];
};

export const setUsers = (users: UsersType[]): SetUsersActionCreatorType => ({ 
  type: SET_USERS, 
  users 
});

type SetCurrentPagesActionCreatorType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPage = (currentPage: number): SetCurrentPagesActionCreatorType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});


type SetTotalUsersCountActionCreatorType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionCreatorType => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

type ToggleIsFetchingActionCreatorType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionCreatorType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFollowingProgressActionCreatorType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionCreatorType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const getUsers = (page: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setCurrentPage(page));
  };
};

const followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleFollowingProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);

    followUnfollowFlow(dispatch, userId, apiMethod, followSuccess);
  };
};

export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);

    followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
  };
};

export default usersReducer;
