import classes from './MyPosts.module.css';
import Post from './Post/Post';

// let props = {
//   message: 'Hi, how are you?',
//   likeCount: '30'
// }
const MyPosts = (props) => {

  let posts = [
    {id: 1, message: 'Hi, how are you?', likesCount: '30'}, 
    {id: 2, message: 'It is my first post', likesCount: '35'},
    {id: 3, message: 'Bye', likesCount: '40'},
    {id: 4, message: 'Fine'},
    {id: 5, message: 'Nice to meet you'},
    {id: 6, message: 'Ok'}
  ]

let postsElements = posts.map ( p => <Post message={p.message} id={p.id} likesCount={p.likesCount} />);

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