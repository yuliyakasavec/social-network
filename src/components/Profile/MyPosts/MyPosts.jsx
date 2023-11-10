import classes from './MyPosts.module.css';
import Post from './Post/Post';

// let props = {
//   message: 'Hi, how are you?',
//   likeCount: '30'
// }
const MyPosts = (props) => {

  let postData = [
    {id: 1, message: 'Hi, how are you?', likeCount: '30'}, 
    {id: 2, message: 'It is my first post', likeCount: '35'},
    {id: 3, message: 'Bye', likeCount: '40'},
    {id: 4, message: 'Fine'},
    {id: 5, message: 'Nice to meet you'},
    {id: 6, message: 'Ok'}
  ]

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
          <Post message={postData[0].message} id={postData[0].id} likeCount={postData[0].likeCount} />
          <Post message={postData[1].message} id={postData[1].id} likeCount={postData[1].likeCount} />
          <Post message={postData[2].message} id={postData[2].id} likeCount={postData[2].likeCount} />
        </div>
      </div>
    )
}

export default MyPosts;