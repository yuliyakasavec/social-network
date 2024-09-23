import { BaseThunkType, InferActionsTypes } from "./redux_store";
import { chatAPI, ChatMessageAPIType } from "../api/chat-api";
import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";
import { uniqueIdGetTimeInStringPlusIndex } from "../utils/object_helpers";

export type StatusType = "pending" | "ready" | "error";
type ChatMessageType = ChatMessageAPIType & { id: string };

let initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
};

export type InitialStateType = typeof initialState;

const chatReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/chat/MESSAGES_RECEIVED":
      const messagesPayloadWithId = action.payload.messages.map((m, index) => {
        const uniqueId = uniqueIdGetTimeInStringPlusIndex(index);
        return { ...m, id: uniqueId };
      });

      const messagesCompose = [...state.messages, ...messagesPayloadWithId];

      const messagesLast100pieces = messagesCompose.filter(
        (m, index, array) => index >= array.length - 100
      );
      return {
        ...state,
        messages: messagesLast100pieces,
      };
    case "SN/chat/STATUS_CHANGED":
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;

export const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) =>
    ({
      type: "SN/chat/MESSAGES_RECEIVED",
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: "SN/chat/STATUS_CHANGED",
      payload: { status },
    } as const),
};

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null =
  null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

let _statusChangeHandler: ((status: StatusType) => void) | null = null;

const statusChangeHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangeHandler === null) {
    _statusChangeHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangeHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch));
  chatAPI.subscribe("status-changed", statusChangeHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
//   chatAPI.unsubscribe("messages-received", newMessageHandlerCreator(dispatch));
//   chatAPI.unsubscribe("status-changed", statusChangeHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async () => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;
