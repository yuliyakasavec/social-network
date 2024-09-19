import { BaseThunkType, InferActionsTypes } from "./redux_store";
import { chatAPI, ChatMessageAPIType } from "../api/chat-api";
import { Dispatch } from "redux";
import { v4 as uuidv4 } from 'uuid';

export type StatusType = 'pending' | 'ready' | 'error';
type ChatMessageType = ChatMessageAPIType & {id: string};

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
};

export type InitialStateType = typeof initialState;

const chatReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/chat/MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: uuidv4() }))].filter((m, index, array) => index >= array.length - 100),
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
  messagesReceived: (messages: ChatMessageAPIType[]) => ({
    type: "SN/chat/MESSAGES_RECEIVED",
    payload: { messages }
  } as const),
  statusChanged: (status: StatusType) => ({
    type: "SN/chat/STATUS_CHANGED",
    payload: { status }
  } as const)
};

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessageHandlerCreator =
  (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
      _newMessageHandler = (messages) => {
        dispatch(actions.messagesReceived(messages));
      };
    }
    return _newMessageHandler;
  };

  let _statusChangeHandler: ((status: StatusType) => void) | null = null;

  const statusChangeHandlerCreator =
    (dispatch: Dispatch) => {
      if (_statusChangeHandler === null) {
        _statusChangeHandler = (status) => {
          dispatch(actions.statusChanged(status));
        };
      }
      return _statusChangeHandler;
    };

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.subscribe('status-changed', statusChangeHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe('status-changed', statusChangeHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
  };
  

export default chatReducer;
