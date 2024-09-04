import { Dispatch } from "redux";
import { ResultCodesEnum } from "../api/api";
import { UsersType } from "../types/types";
import { updateObjectInArray } from "../utils/object_helpers";
import { BaseThunkType, InferActionsTypes } from "./redux_store";
import { usersAPI } from "../api/users-api";


export type InitialStateType = {
  users: Array<UsersType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[]; //array of users id's
  filter: {
    term: string
    friend: null | boolean
  }
};

export type FilterType = typeof initialState.filter;

let initialState: InitialStateType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
  filter: {
    term: '',
    friend: null as null | boolean
  }
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/USERS/FOLLOW':
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
    case 'SN/USERS/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case 'SN/USERS/SET_USERS': {
      return {
        ...state,
        users: action.users,
      };
    }
    case 'SN/USERS/SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case 'SN/USERS/SET_FILTER': {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }
    case 'SN/USERS/TOGGLE_IS_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;

// type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>
// dispatch: DispatchType, getState: GetStateType

export const actions = {
  followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
  unfollowSuccess: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
  setUsers: (users: UsersType[]) => ({ type: 'SN/USERS/SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
  setFilter: (filter: FilterType) => ({ type: 'SN/USERS/SET_FILTER', payload: filter } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

export const getUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter));
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);

    _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);

    _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess);
  };
};

export default usersReducer;
