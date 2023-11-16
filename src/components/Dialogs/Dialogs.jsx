import DialogItem from "./DialogItem/DialogItem";
import classes from "./Dialogs.module.css";
import Message from "./Message/Message";
import React from "react";


const Dialogs = (props) => {


  let dialogsElements = props.state.dialogs.map( d => <DialogItem avatar={d.avatar} name={d.name} id={d.id} /> );

  let messagesElements = props.state.messages.map( m => <Message message={m.message} id={m.id} />);

  let newElement = React.createRef();

  let sendMessage = () => {
    let text = newElement.current.value;
    alert(text);
  }

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={classes.messages}>
        {messagesElements}
        <div>
        <textarea ref={newElement}></textarea>
        </div>
        <div>
        <button onClick={ sendMessage }>Send message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
