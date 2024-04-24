import React from "react";
import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {
  return (
    <StoreContext.Consumer> 
      {(store) => {
        let state = store.getState().dialogsPage;

        let sendMessage = () => {
          store.dispatch(sendMessageActionCreator());
        };

        let onMessageChange = (text) => {
          let action = updateNewMessageTextActionCreator(text);
          store.dispatch(action);
        };
        return <Dialogs
            updateNewMessageText={onMessageChange}
            sendMessage={sendMessage}
            dialogsPage={state}
          />}
          }
    </StoreContext.Consumer>
  );
};

export default DialogsContainer;
