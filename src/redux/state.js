const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you?", likesCount: "30" },
        { id: 2, message: "It is my first post", likesCount: "35" },
        { id: 3, message: "Bye", likesCount: "40" },
        { id: 4, message: "Fine", likesCount: "10" },
        { id: 5, message: "Nice to meet you", likesCount: "15" },
        { id: 6, message: "Ok", likesCount: "50" },
      ],
      newPostText: "it-kamasutra.com",
    },
    _callSubscriber() {
      console.log("State changed");
    },
    dialogsPage: {
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
          name: "Yuliya",
          avatar: "https://rg.ru/uploads/images/122/97/48/10_86ad2d85.jpg",
        },
        {
          id: 2,
          name: "Denis",
          avatar:
            "https://ru.wikifur.com/w/images/thumb/3/39/Officer_Clawhauser.png/624px-Officer_Clawhauser.png",
        },
        {
          id: 3,
          name: "Vika",
          avatar:
            "https://cdn-irec.r-99.com/sites/default/files/imagecache/200i/user-images/1339753/IvRUEBD3ACbElAzKwI7XA.jpg",
        },
        {
          id: 4,
          name: "Pavel",
          avatar:
            "https://assets.gq.ru/photos/5d9f6987547bbd00084ca9e0/master/w_1600%2Cc_limit/07.jpg",
        },
        {
          id: 5,
          name: "Katya",
          avatar:
            "https://sun9-48.userapi.com/impf/vueke6ZQ3KxsMOM31G_rc-1LrpMQfurtQx_O8w/sRpORPDcC4A.jpg?size=604x453&quality=96&sign=a3470eecb6d63d1f54f1dc4bf99542e0&c_uniq_tag=wCKQscRZDGLhe5Rd3GzCt91YYXdNJgCBpFT8udp4-X4&type=album",
        },
        {
          id: 6,
          name: "Vita",
          avatar:
            "https://www.soyuz.ru/public/uploads/files/2/6975472/2017032211202719915d928a.jpg",
        },
      ],
    },
    friendsPage: {
      sidebar: [
        {
          id: 1,
          name: "Liam",
          avatar:
            "https://www.youloveit.ru/uploads/posts/2015-12/1451404078_youloveit_ru_selfie_zveropolis01.jpg",
        },
        {
          id: 2,
          name: "Ted",
          avatar: "https://rg.ru/uploads/images/123/41/07/7_a0513ad7.jpg",
        },
        {
          id: 2,
          name: "Nata",
          avatar:
            "https://ru.wikifur.com/w/images/thumb/a/a6/Bellwether_Zootopia_poster_wiki.png/488px-Bellwether_Zootopia_poster_wiki.png",
        },
      ],
    },
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      };

      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === SEND_MESSAGE) {
      let newMessage = {
        id: 7,
        message: this._state.dialogsPage.newMessageText,
      };

      this._state.dialogsPage.messages.push(newMessage);
      this._state.dialogsPage.newMessageText = "";
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
      this._state.dialogsPage.newMessageText = action.newMes;
      this._callSubscriber(this._state);
    }
  },
};

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });

export const updateNewMessageTextActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newMes: text,
});

export default store;
window.store = store;
