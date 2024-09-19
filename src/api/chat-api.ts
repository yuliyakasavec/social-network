import { StatusType } from "../redux/chat_reducer";
import { outputDateSeconds } from "../utils/object_helpers";

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

let subscribers = {
  "messages-received": [] as MessagesReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;
type EventsNamesType = "messages-received" | "status-changed";
let count = 1;

const closeHandler = () => {
  console.log("закрылось соединение!", outputDateSeconds());
  notifySubscribersAboutStatus("pending");
  setTimeout(createChannel, 2000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["messages-received"].forEach((s) => s(newMessages));
  notifySubscribersAboutStatus("ready");
  console.log("получили массив данных с сервера!", outputDateSeconds());
};

const openHandler = () => {
  console.log(
    "открылось соединение!",
    outputDateSeconds(),
    ", счетчик открытий - " + count,
    ", статус - " + ws?.readyState
  );
  count = count + 1;
};

const errorHandler = () => {
  notifySubscribersAboutStatus("error");
  console.log("Ошибка установить соединение!", outputDateSeconds());
};

const cleanUp = () => {
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error", errorHandler);
  console.log("удалили все подписки!", outputDateSeconds());
};

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers["status-changed"].forEach((s) => s(status));
};

function createChannel() {
  notifySubscribersAboutStatus("pending");

  if (ws != null) {
    setTimeout(() => {
      cleanUp();
      console.log("статус - " + ws?.readyState, outputDateSeconds());
      ws?.close();
      console.log("статус - " + ws?.readyState, outputDateSeconds());
    }, 500);
  }

  setTimeout(() => {
    console.log("статус - " + ws?.readyState, outputDateSeconds());
    ws = new WebSocket(
      "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
    );
    ws.addEventListener("close", closeHandler);
    ws.addEventListener("message", messageHandler);
    ws.addEventListener("open", openHandler);
    ws.addEventListener("error", errorHandler);
  }, 1000);
};

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers["messages-received"] = [];
    subscribers["status-changed"] = [];
    cleanUp();
    ws?.close();
  },
  subscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    //@ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(
        (s) => s !== callback
      );
    };
  },
  unsubscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      (s) => s !== callback
    );
  },
  sendMessage(message: string) {
    ws?.send(message);
    createChannel();
  },
};

export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
