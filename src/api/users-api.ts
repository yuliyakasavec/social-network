import { UsersType } from '../types/types'
import {instance, APIResponseType} from './api'


type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string
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
       .delete<APIResponseType>(`follow/${userId}`)
       .then((response) => {
        return response.data;
      });
    },
    follow(userId: number) {
      return instance
       .post<APIResponseType>(
        `follow/${userId}`,
        {},
      )
       .then((response) => {
          return response.data;
        });
    },
  };