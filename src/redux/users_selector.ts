import { createSelector } from "reselect";
import { AppStateType } from "./redux_store";
import { UsersType } from "../types/types";

const getUsersDataSelector = (state: AppStateType): UsersType[] => {
    return state.usersPage.users;
}

export const getUsersData = createSelector(getUsersDataSelector,
    (users) => {
    return users.filter(u => true);
});

export const getPageSize = (state: AppStateType): number => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType): number => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType): number => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType): boolean => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType): number[] => {
    return state.usersPage.followingInProgress;
}

export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}