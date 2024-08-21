import classes from "./../Dialogs.module.css";

type PropsType = {
  message: string
  id: number
};

const Message: React.FC<PropsType> = (props) => {
  return (
  <div className={classes.message}><p>{props.message}</p></div>
  )
}

export default Message;
