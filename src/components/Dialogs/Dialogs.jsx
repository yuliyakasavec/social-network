import { NavLink } from "react-router-dom";
import classes from "./Dialogs.module.css";

const DialogItem = (props) => {
  return (
    <div className={`${classes.dialog} ${classes.active}`}>
      <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props) => {
  return (
  <div className={classes.message}>{props.message}</div>
  )
}

const Dialogs = () => {
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        <DialogItem name="Yuliya" id="1" />
        <DialogItem name="Denis" id="2" />
        <DialogItem name="Vika" id="3" />
        <DialogItem name="Pavel" id="4" />
        <DialogItem name="Katya" id="5" />
        <DialogItem name="Vita" id="6" />
      </div>
      <div className={classes.messages}>
        <Message message="Hi" />
        <Message message="How are you?" />
        <Message message="Bye" />
      </div>
    </div>
  );
};

export default Dialogs;
