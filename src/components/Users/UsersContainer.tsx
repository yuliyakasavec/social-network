import React from "react";
import { useSelector } from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import { getIsFetching} from "../../redux/users_selector";
import { Users } from "./Users";


type UsersPagePropsType = {
  pageTitle: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  
  const isFetching = useSelector(getIsFetching);
  
  return (
    <>
    <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users
        // totalItemsCount={this.props.totalUsersCount}
        // pageSize={this.props.pageSize}
        // currentPage={this.props.currentPage}
        // onPageChanged={onPageChanged}
        // onFilterChanged={onFilterChanged}
        // users={props.users}
        // follow={props.follow}
        // unfollow={props.unfollow}
        // followingInProgress={props.followingInProgress}
      />
    </>
  );
}



// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageAC(pageNumber));
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setTotalUsersCountAC(totalCount));
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingAC(isFetching));
//     },
//   };
// };