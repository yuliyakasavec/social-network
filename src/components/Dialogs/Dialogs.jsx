import { useForm } from "react-hook-form";
import DialogItem from "./DialogItem/DialogItem";
import classes from "./Dialogs.module.css";
import Message from "./Message/Message";
import React from "react";


const MAX_MESSAGE_LENGTH = 50;

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem avatar={d.avatar} name={d.name} key={d.id} id={d.id} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} id={m.id} />
  ));

  const { register, handleSubmit, reset, formState: {
    errors
  }, } = useForm({
    mode: 'onChange'
  });

  const onSubmit = (formData) => {
    props.sendMessage(formData.newMessageText);
    reset();
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>
        {messagesElements}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("newMessageText", {
                required: "This field is required.",
                maxLength: {
                  value: MAX_MESSAGE_LENGTH,
                  message: `Max length is ${MAX_MESSAGE_LENGTH} symbols`,
                },
              })}
            />
            {errors.newMessageText && (<div style={{ color: 'red'}}>{errors.newMessageText.message}</div>)}
          </div>
          <div>
          <input type="submit" value="Send Message" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialogs;
