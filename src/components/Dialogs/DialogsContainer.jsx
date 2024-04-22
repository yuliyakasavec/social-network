import React from "react";
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

  let state = props.store.getState().dialogsPage;

  let sendMessage = () => {
    props.store.dispatch(sendMessageActionCreator());
  };

  let onMessageChange = (text) => {
    let action = updateNewMessageTextActionCreator(text);
    props.store.dispatch(action);
  }
  return (<Dialogs updateNewMessageText={onMessageChange} sendMessage={sendMessage} dialogsPage={state} />)
};

export default DialogsContainer;
