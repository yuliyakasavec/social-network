import { Dispatch } from "redux";
import { getAuthUserData } from "./auth_reducer";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux_store";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
      default: 
      return state;
    }
};

type ThunkType = ThunkAction<void, AppStateType, unknown, InitializedSuccessActionType>;

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS // "INITIALIZED_SUCCESS"
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS
});


export const initializeApp = (): ThunkType => {
  return (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
      dispatch(initializedSuccess())
    })
  };
};


export default appReducer;
