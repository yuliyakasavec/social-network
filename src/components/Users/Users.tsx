import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UsersType } from "../../types/types";


type PropsType = {
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  totalItemsCount: number
  pageSize: number
  users: Array<UsersType>
  followingInProgress: Array<number>
  unfollow: (useId: number) => void
  follow: (useId: number) => void
}

let Users: React.FC<PropsType> = ({currentPage, onPageChanged, totalItemsCount, pageSize, users, ...props}) => {
  
  return <div>
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalItemsCount} pageSize={pageSize}/>
      <div>
      {users.map((u) => (
        <User user={u} key={u.id} 
        followingInProgress={props.followingInProgress}
        unfollow={props.unfollow}
        follow={props.follow}
        />
      )
      )}
      </div>
    </div>
}

export default Users;