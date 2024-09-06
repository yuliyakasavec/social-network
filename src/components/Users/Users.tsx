import React, { useEffect } from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import { FilterType, getUsers, follow, unfollow } from "../../redux/users_reducer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersData, getUsersFilter } from "../../redux/users_selector";
import { AppDispatch } from "../../redux/redux_store";
import { useNavigate, useSearchParams } from "react-router-dom";

type QueryParamsType = {term?: string; page?: string; friend?: string}

export const Users: React.FC = () => {

  const users = useSelector(getUsersData);
  const totalItemsCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const parsed = Object.fromEntries(searchParams);

  useEffect(() => {
    const query: QueryParamsType = {};

    if(!!filter.term) query.term = filter.term;
    if(filter.friend !== null) query.friend = String(filter.friend);
    if(currentPage !== 1) query.page = String(currentPage);
    
    const parsedString = Object.entries(query);
    // navigate({
    //   pathname: '/users',
    //   search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    // });
    setSearchParams(parsedString)
  }, [filter, currentPage]

)

  useEffect(() => {

    let actualPage = currentPage;
    let actualFilter = filter;

    if(!!parsed.page) actualPage = Number(parsed.page);

    if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

    if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null: parsed.friend === 'true' ? true : false }

    dispatch(getUsers(actualPage, pageSize, actualFilter))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter));
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter));
  }

  const unfollowUsers = (userId: number) => {
    dispatch(unfollow(userId));
  }

  const followUsers = (userId: number) => {
    dispatch(follow(userId));
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
            unfollow={unfollowUsers}
            follow={followUsers}
          />
        ))}
      </div>
    </div>
  );
};
