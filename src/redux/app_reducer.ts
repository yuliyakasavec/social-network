import { getAuthUserData } from "./auth_reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS // "INITIALIZED_SUCCESS"
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS
});


export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
      dispatch(initializedSuccess())
    })
  };
};


export default appReducer;
