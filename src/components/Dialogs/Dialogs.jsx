import classes from "./Dialogs.module.css";

const Dialogs = () => {
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        <div className={`${classes.dialog} ${classes.active}`}>
        Yuliya
        </div>
        <div className={classes.dialog}>
        Denis
        </div>
        <div className={classes.dialog}>
        Vika
        </div>
        <div className={classes.dialog}>
        Pavel
        </div>
        <div className={classes.dialog}>
        Katya
        </div>
        <div className={classes.dialog}>
        Vita
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
