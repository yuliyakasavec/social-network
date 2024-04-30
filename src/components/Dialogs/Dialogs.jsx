import DialogItem from "./DialogItem/DialogItem";
import classes from "./Dialogs.module.css";
import Message from "./Message/Message";
import React from "react";

const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem avatar={d.avatar} name={d.name} key={d.id} id={d.id} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} id={m.id} />
  ));

  let newElement = React.createRef();

  let onSendMessage = () => {
    props.sendMessage();
  };

  let onMessageChange = () => {
    let text = newElement.current.value;
    props.updateNewMessageText(text);
  }
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>
        {messagesElements}
        <div>
          <textarea onChange={onMessageChange} ref={newElement} value={state.newMessageText}></textarea>
        </div>
        <div>
          <button onClick={onSendMessage}>Send message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
