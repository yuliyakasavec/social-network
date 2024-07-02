import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";

const MyPostsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <div>
          <Field placeholder={"Add your post"} name={"newPostText"} component={"textarea"}/>
        </div>
        <div>
          <button>Add post</button>
        </div>
        </form>
  )
}

const MyPostsReduxForm = reduxForm({
  form: 'ProfileAddNewPostForm',
})(MyPostsForm)


const MyPosts = (props) => {
  
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} key={p.id} id={p.id} likesCount={p.likesCount} />
  ));

  const onSubmit = (formData) => {
    props.addPost(formData.newPostText)
}

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
        <MyPostsReduxForm onSubmit={onSubmit}/>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
