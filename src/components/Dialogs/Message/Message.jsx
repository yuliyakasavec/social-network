import classes from "./../Dialogs.module.css";

const Message = (props) => {
  return (
  <div className={classes.message}><p>{props.message}</p></div>
  )
}

export default Message;
