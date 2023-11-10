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
  
  let messagesData = [
    {id: 1, message: 'Hi'}, 
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Bye'},
    {id: 4, message: 'Fine'},
    {id: 5, message: 'Nice to meet you'},
    {id: 6, message: 'Ok'}
  ]

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        <DialogItem name={dialogsData[0].name} id={dialogsData[0].id} />
        <DialogItem name={dialogsData[1].name} id={dialogsData[1].id} />
        <DialogItem name={dialogsData[2].name} id={dialogsData[2].id} />
        <DialogItem name={dialogsData[3].name} id={dialogsData[3].id} />
        <DialogItem name={dialogsData[4].name} id={dialogsData[4].id} />
        <DialogItem name={dialogsData[5].name} id={dialogsData[5].id} />
      </div>
      <div className={classes.messages}>
        <Message message={messagesData[0].message} id={messagesData[0].id} />
        <Message message={messagesData[1].message} id={messagesData[1].id} />
        <Message message={messagesData[2].message} id={messagesData[2].id} />
        <Message message={messagesData[3].message} id={messagesData[3].id} />
        <Message message={messagesData[4].message} id={messagesData[4].id} />
        <Message message={messagesData[5].message} id={messagesData[5].id} />
      </div>
    </div>
  );
};

export default Dialogs;
