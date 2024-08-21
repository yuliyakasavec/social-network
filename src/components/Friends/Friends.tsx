import classes from "./Friends.module.css";

type PropsType = {
  avatar: string
  name: string
}

const Friends = (props: PropsType) => {
  return (
    <div className={classes.element}>
      <img src={props.avatar} />
      {props.name}
    </div>
  );
};

export default Friends;
