import dialogsReducer from "./dialogs_reducer";
import profileReducer from "./profile_reducer";
import sidebarReducer from "./sidebar_reducer";


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
    
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.friendsPage = sidebarReducer(this._state.friendsPage, action);

    this._callSubscriber(this._state);
  },
};


export default store;
window.store = store;
