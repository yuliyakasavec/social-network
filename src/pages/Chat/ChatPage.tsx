import React, { useEffect, useRef, useState, UIEvent } from "react";
import classes from "./ChatPage.module.css";
import { ChatMessageAPIType } from "../../api/chat-api";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from "../../redux/chat_reducer";
import { AppDispatch, AppStateType } from "../../redux/redux_store";
import { outputDateSeconds } from "../../utils/object_helpers";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    console.log("старт", outputDateSeconds());
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, [dispatch]);

  return (
    <div>
      {status === "error" && <div>Error. Please refresh the page</div>}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  );
};

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (event: any) => {
    const element = event.currentTarget;

    let differenceWhatWeSee = element.scrollHeight - element.scrollTop;
    let value = Math.abs(differenceWhatWeSee - element.clientHeight);

    if (value < 300) {
      if (!isAutoScroll) {
        setIsAutoScroll(true);
        //console.log('Включили автоскролл')
      }
    } else {
      if (isAutoScroll) {
        setIsAutoScroll(false);
        //console.log('ВЫКЛЮЧИЛИ автоскролл')
      }
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      setTimeout(() => {
        messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [messages]);

  return (
    <div
      style={{ height: "400px", overflowY: "auto" }}
      onScroll={scrollHandler}
    >
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(
  ({ message }) => {
    return (
      <div>
        <img src={message.photo} className={classes.userPhoto} />{" "}
        <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
      </div>
    );
  }
);

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  const onChangeHandler = (e: any) => {
    setMessage(e.currentTarget.value);
  };

  const isDisabledButton = status !== "ready";

  const enterKey = (e: any) => {
    if (e.key === "Enter") {
      if (isDisabledButton) {
        console.log(
          "хотел отправить сообщение через Enter в момент подключения"
        );
        return;
      } else {
        sendMessageHandler(e);
      }
    }
  };

  const sendMessageHandler = (e: any) => {
    e?.preventDefault();
    if (!message) {
      alert('Пустое сообщение невозможно отпарвить')
      return;
    }

    const date = new Date()
      const time = String(
         date.getHours()
         + ':' + date.getMinutes()
      )

      const messageWithTime = `${message} (${time})`

      if (messageWithTime.length > 100) {
         alert(
            `Можно отправлять не более 100 знаков,
            а сейчас уже ${messageWithTime.length}`)
         return
      }

      console.log('отправили сообщение', outputDateSeconds())

    dispatch(sendMessage(messageWithTime));
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={sendMessageHandler}>
        <div>
          <textarea
            onKeyDown={enterKey}
            onChange={onChangeHandler}
            value={message}
          ></textarea>
        </div>
        <div>
          <input
            disabled={status !== "ready"}
            type="submit"
            onClick={sendMessageHandler}
            value="Send"
          />
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
