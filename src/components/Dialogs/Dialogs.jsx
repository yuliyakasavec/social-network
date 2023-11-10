import { NavLink } from "react-router-dom";
import classes from "./Dialogs.module.css";

const Dialogs = () => {
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        <div className={`${classes.dialog} ${classes.active}`}>
        <NavLink to="/dialogs/1">Yuliya</NavLink>
        </div>
        <div className={classes.dialog}>
        <NavLink to="/dialogs/2">Denis</NavLink>
        </div>
        <div className={classes.dialog}>
        <NavLink to="/dialogs/3">Vika</NavLink>
        </div>
        <div className={classes.dialog}>
        <NavLink to="/dialogs/4">Pavel</NavLink>
        </div>
        <div className={classes.dialog}>
        <NavLink to="/dialogs/5">Katya</NavLink>
        </div>
        <div className={classes.dialog}>
        <NavLink to="/dialogs/6">Vita</NavLink>
        </div>
        </div>
        <div className={classes.messages}>
          <div className={classes.message}>Hi</div>
          <div className={classes.message}>How are you?</div>
          <div className={classes.message}>Bye</div>
        </div>
    </div>
  );
};

export default Dialogs;
