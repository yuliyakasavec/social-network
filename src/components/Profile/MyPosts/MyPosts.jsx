import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { useForm } from "react-hook-form";

const MAX_MESSAGE_LENGTH = 10;

const MyPosts = React.memo((props) => {

  let postsElements = props.posts.map((p) => (
    <Post message={p.message} key={p.id} id={p.id} likesCount={p.likesCount} />
  ));

  const { register, handleSubmit, reset, formState: {
    errors
  }, } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (formData) => {
    props.addPost(formData.newPostText);
    reset();
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Post message"
            {...register("newPostText", {
              required: "This field is required.",
              maxLength: {
                value: MAX_MESSAGE_LENGTH,
                message: `Max length is ${MAX_MESSAGE_LENGTH} symbols`,
              },
            })}
          />
          {errors.newPostText && (<div style={{ color: 'red'}}>{errors.newPostText.message}</div>)}
        </div>
        <div>
          <button type="submit">Add post</button>
        </div>
      </form>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
});

export default MyPosts;
