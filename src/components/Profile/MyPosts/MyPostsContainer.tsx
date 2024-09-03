import {
  profileActions
} from "../../../redux/profile_reducer";
import { AppStateType } from "../../../redux/redux_store";
import { PostsType } from "../../../types/types";
import MyPosts, { DispatchMyPostsPropsType, MapMyPostsPropsType } from "./MyPosts";
import { connect } from "react-redux";

type MapStatePropsType = {
  posts: Array<PostsType>,
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
  } as MapMyPostsPropsType
}

const MyPostsContainer = connect<MapMyPostsPropsType, DispatchMyPostsPropsType, {}, AppStateType >(mapStateToProps, {
  addPost: profileActions.addPostActionCreator
}) (MyPosts);

export default MyPostsContainer;
