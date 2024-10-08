import classes from "./Post.module.css";

type PropsType = {
  message: string
  likesCount: number
  id: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.item}>
      <img src="https://img.gazeta.ru/files3/217/10588217/Zootopia-pic905-895x505-73183.jpg" />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
