import { Field, reduxForm } from "redux-form";
import DialogItem from "./DialogItem/DialogItem";
import classes from "./Dialogs.module.css";
import Message from "./Message/Message";
import React from "react";
import { Textarea } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const DialogsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <div>
          <Field placeholder={"Enter your message"} name={"newMessageText"} component={Textarea} validate={[required, maxLength50 ]}/>
        </div>
        <div>
          <button>Send message</button>
        </div>
        </form>
  )
}

const DialogsReduxForm = reduxForm({
  form: 'newMessageText',
})(DialogsForm)


const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem avatar={d.avatar} name={d.name} key={d.id} id={d.id} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} id={m.id} />
  ));


  const onSubmit = (formData) => {
    props.sendMessage(formData.newMessageText);
}


  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>
        {messagesElements}
        <DialogsReduxForm onSubmit={onSubmit}/>
      </div>
    </div>
  );
};

export default Dialogs;
