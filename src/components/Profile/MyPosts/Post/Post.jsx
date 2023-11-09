import classes from "./Post.module.css";

const Post = () => {
  return (
    <div className={classes.item}>
      <img src="https://img.gazeta.ru/files3/217/10588217/Zootopia-pic905-895x505-73183.jpg" />
      post 1
      <div>
        <span>like</span>
      </div>
    </div>
  );
};

export default Post;
