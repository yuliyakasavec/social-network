import { headerAPI, loginAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const getAuthUserData = () => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    return headerAPI
    .headerGetAuth()
    .then((data) => {
      dispatch(toggleIsFetching(false));
      if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
  };
};

export const login = (email, password, rememberMe, onServerError) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    loginAPI
    .logIn(email, password, rememberMe)
    .then((data) => {
      dispatch(toggleIsFetching(false));
      console.log(data)
      if (data.resultCode === 0) {
        dispatch(getAuthUserData())
      } else {
        onServerError(data.messages.join(' !'));
      }
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    loginAPI
    .logOut()
    .then((data) => {
      dispatch(toggleIsFetching(false));
      if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  };
};


export default authReducer;
