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

  let dialogsData = [
    {id: 1, name: 'Yuliya'}, 
    {id: 2, name: 'Denis'},
    {id: 3, name: 'Vika'},
    {id: 4, name: 'Pavel'},
    {id: 5, name: 'Katya'},
    {id: 6, name: 'Vita'}
  ]

  
  let messages = [
    {id: 1, message: 'Hi'}, 
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Bye'},
    {id: 4, message: 'Fine'},
    {id: 5, message: 'Nice to meet you'},
    {id: 6, message: 'Ok'}
  ]
  
  let dialogsElements = dialogsData.map( d => <DialogItem name={d.name} id={d.id} /> );

  let messagesElements = messages.map( m => <Message message={m.message} id={m.id} />);

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={classes.messages}>
        {messagesElements}
      </div>
    </div>
  );
};

export default Dialogs;
