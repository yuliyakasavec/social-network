import React from "react";
import { connect } from "react-redux";
import {
  FilterType,
  follow,
  getUsers,
  unfollow,
} from "../../redux/users_reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersData, getUsersFilter } from "../../redux/users_selector";
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux_store";


type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  followingInProgress: Array<number>
  users: Array<UsersType>
  filter: FilterType
}

type MapDispatchPropsType = {
  unfollow: (useId: number) => void
  follow: (useId: number) => void
  getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component <PropsType> {
  componentDidMount() {
    const {currentPage, pageSize, filter} = this.props;
    this.props.getUsers(currentPage, pageSize, filter);
    // this.props.toggleIsFetching(true);
    // usersAPI
    //   .getUsers(this.props.currentPage, this.props.pageSize)
    //   .then((data) => {
    //     this.props.toggleIsFetching(false);
    //     this.props.setUsers(data.items);
    //     this.props.setTotalUsersCount(data.totalCount);
    //   });
  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize, filter} = this.props;
    this.props.getUsers(pageNumber, pageSize, filter);


        // this.props.setCurrentPage(pageNumber);
//     this.props.toggleIsFetching(true);
//     usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
//       this.props.toggleIsFetching(false);
//       this.props.setUsers(data.items);
//     });
  };

  onFilterChanged = (filter: FilterType) => {
    const {pageSize} = this.props;
    this.props.getUsers(1, pageSize, filter);
  }

  render() {
    return (
      <>
      <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalItemsCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          onFilterChanged={this.onFilterChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   };
// };


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsersData(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
  };
};



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

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
  mapStateToProps, 
  {follow,
  unfollow,
  getUsers
}))
(UsersContainer);
