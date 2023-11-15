import classes from "./Friends.module.css";

const Friends = (props) => {
  return (
    <div className={classes.element}>
      <img src={props.avatar} />
      {props.name}
    </div>
  );
};

export default Friends;
