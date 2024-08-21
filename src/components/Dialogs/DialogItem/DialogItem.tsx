import { NavLink } from "react-router-dom";
import classes from "./../Dialogs.module.css";

type PropsType = {
  avatar: string
  id: number
  name: string
};

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <div className={`${classes.dialog} ${classes.active}`}>
      <img src={props.avatar} />
      <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
