import s from "./../Dialogs.module.css";

export const Message = (props) => {
  return <div className={s.dialog}>{props.message}</div>;
};
