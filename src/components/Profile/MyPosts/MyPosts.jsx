import classes from './MyPosts.module.css';
import Post from './Post/Post';

// let props = {
//   message: 'Hi, how are you?',
//   likeCount: '30'
// }
const MyPosts = (props) => {
    return (
      <div>
        My posts
        <div>
          <textarea></textarea>
          <button>Add post</button>
        </div>
        <div className={classes.posts}>
          <Post message='Hi, how are you?' likeCount='30' />
          <Post message='It is my first post' likeCount='35' />
        </div>
      </div>
    )
}

export default MyPosts;