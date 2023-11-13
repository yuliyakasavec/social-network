import classes from './MyPosts.module.css';
import Post from './Post/Post';

// let props = {
//   message: 'Hi, how are you?',
//   likesCount: '30'
// }
const MyPosts = (props) => {


let postsElements = props.posts.map ( p => <Post message={p.message} id={p.id} likesCount={p.likesCount} />);

    return (
      <div className={classes.postsBlock}>
        <h3>My posts</h3>
        <div>
          <div>
          <textarea></textarea>
          </div>
          <div>
          <button>Add post</button>
          </div>
        </div>
        <div className={classes.posts}>
          {postsElements}
        </div>
      </div>
    )
}

export default MyPosts;