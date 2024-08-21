import {
  addPostActionCreator
} from "../../../redux/profile_reducer";
import { AppStateType } from "../../../redux/redux_store";
import { PostsType } from "../../../types/types";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

type MapStatePropsType = {
  posts: Array<PostsType>,
  newPostText: string
}

type MapDispatchPropsType = {
  addPost: (newPostText: string) => void
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText : state.profilePage.newPostText
  }
}

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    addPost: (newPostText) => {
      dispatch(addPostActionCreator(newPostText));
    },
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;
