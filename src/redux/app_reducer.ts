import { Dispatch } from "redux";
import { getAuthUserData } from "./auth_reducer";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux_store";

let initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;


const appReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true
      };
      default: 
      return state;
    }
};

type ActionType = InferActionsTypes<typeof action>;

export const action = {
  initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' } as const)
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;


export const initializeApp = (): ThunkType => {
  return (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
      dispatch(action.initializedSuccess())
    })
  };
};


export default appReducer;
