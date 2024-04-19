const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState = {
    messages: [
      { id: 1, message: "Hi" },
      { id: 2, message: "How are you?" },
      { id: 3, message: "Bye" },
      { id: 4, message: "Fine" },
      { id: 5, message: "Nice to meet you" },
      { id: 6, message: "Ok" },
    ],
    newMessageText: "My name is",
    dialogs: [
      {
        id: 1,
        name: "Grace",
        avatar: "https://rg.ru/uploads/images/122/97/48/10_86ad2d85.jpg",
      },
      {
        id: 2,
        name: "Henry",
        avatar:
          "https://ru.wikifur.com/w/images/thumb/3/39/Officer_Clawhauser.png/624px-Officer_Clawhauser.png",
      },
      {
        id: 3,
        name: "Caroline",
        avatar:
          "https://cdn-irec.r-99.com/sites/default/files/imagecache/200i/user-images/1339753/IvRUEBD3ACbElAzKwI7XA.jpg",
      },
      {
        id: 4,
        name: "Oliver",
        avatar:
          "https://assets.gq.ru/photos/5d9f6987547bbd00084ca9e0/master/w_1600%2Cc_limit/07.jpg",
      },
      {
        id: 5,
        name: "Monica",
        avatar:
          "https://sun9-48.userapi.com/impf/vueke6ZQ3KxsMOM31G_rc-1LrpMQfurtQx_O8w/sRpORPDcC4A.jpg?size=604x453&quality=96&sign=a3470eecb6d63d1f54f1dc4bf99542e0&c_uniq_tag=wCKQscRZDGLhe5Rd3GzCt91YYXdNJgCBpFT8udp4-X4&type=album",
      },
      {
        id: 6,
        name: "Emily",
        avatar:
          "https://www.soyuz.ru/public/uploads/files/2/6975472/2017032211202719915d928a.jpg",
      },
    ],
  };

const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 7,
                message: state.newMessageText,
              };
        
              state.messages.push(newMessage);
              state.newMessageText = "";
              return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMes;
            return state;
        default:
            return state;
    }
}

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });

export const updateNewMessageTextActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newMes: text,
});

export default dialogsReducer;