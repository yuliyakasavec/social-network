import React, { useEffect } from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import { FilterType, getUsers } from "../../redux/users_reducer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersData, getUsersFilter } from "../../redux/users_selector";
import { AppDispatch } from "../../redux/redux_store";

type PropsType = {
};

export const Users: React.FC<PropsType> = (props) => {

  const users = useSelector(getUsersData);
  const totalItemsCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, filter))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter));
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter));
  }

  const unfollow = (useId: number) => {
    dispatch(unfollow(useId));
  }

  const follow = (useId: number) => {
    dispatch(follow(useId));
  }

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged}/>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
      />
      <div>
        {users.map((u) => (
          <User
            user={u}
            key={u.id}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow}
          />
        ))}
      </div>
    </div>
  );
};
