import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import React, { useRef, useState } from "react";

// let props = {
//   message: 'Hi, how are you?',
//   likesCount: '30'
// }
const MyPosts = (props) => {

console.log(props.newPostValue)

  const [posts, setPosts] = useState(props.posts); 


  let postsElements = posts.map((p) => (
    <Post message={p.message} id={p.id} likesCount={p.likesCount} />
  ));

  let newPostElement = React.createRef();

  let addPost = () => {
    props.addPost();
    newPostElement.current.value = '';
  };

  let changeTextarea = (e) => {
    let newElement = e.target.value;
    props.changeTextarea(newElement)
  }
  

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea onChange={changeTextarea} ref={newPostElement}></textarea>
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
