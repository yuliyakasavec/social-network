import React, { useEffect, useState } from "react";
import classes from "./ChatPage.module.css";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    const closeHandler = () => {
      console.log("CLOSE WS");
      setTimeout(createChannel, 3000);
    };
    function createChannel() {
      ws?.removeEventListener("close", closeHandler);
      ws?.close();

      ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
      );
      ws.addEventListener("close", closeHandler);
      setWsChannel(ws);
    }

    createChannel();

    return () => {
      ws.removeEventListener("close", closeHandler);
      ws.close();
    };
  }, []);

  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  );
};

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };
    wsChannel?.addEventListener("message", messageHandler);

    return () => {
      wsChannel?.removeEventListener("message", messageHandler);
    };
  }, [wsChannel]);
  return (
    <div style={{ height: "400px", overflowY: "auto" }}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} className={classes.userPhoto} />{" "}
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({
  wsChannel,
}) => {
  const [message, setMessage] = useState("");
  const [readyStatus, setReadyStatus] = useState<"pending" | "ready">(
    "pending"
  );

  useEffect(() => {
    let openHandler = () => {
      setReadyStatus("ready");
    };
    wsChannel?.addEventListener("open", openHandler);
    return () => {
      wsChannel?.removeEventListener("open", openHandler);
    };
  }, [wsChannel]);

  const onChangeHandler = (e: any) => {
    setMessage(e.currentTarget.value);
  };

  const enterKey = (e: any) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  const sendMessage = (e: any) => {
    e?.preventDefault();
    if (!message) {
      return;
    }
    wsChannel?.send(message);
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <div>
          <textarea
            onKeyDown={enterKey}
            onChange={onChangeHandler}
            value={message}
          ></textarea>
        </div>
        <div>
          <input
            disabled={wsChannel == null || readyStatus !== "ready"}
            type="submit"
            onClick={sendMessage}
            value="Send"
          />
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
