import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let freshPosts = [
  {id: 1, message: 'Hi, how are you?', likesCount: '30'}, 
  {id: 2, message: 'It is my first post', likesCount: '35'},
  {id: 3, message: 'Bye', likesCount: '40'},
  {id: 4, message: 'Fine'},
  {id: 5, message: 'Nice to meet you'},
  {id: 6, message: 'Ok'}
]

let dialogsData = [
  {id: 1, name: 'Yuliya'}, 
  {id: 2, name: 'Denis'},
  {id: 3, name: 'Vika'},
  {id: 4, name: 'Pavel'},
  {id: 5, name: 'Katya'},
  {id: 6, name: 'Vita'}
]


let messages = [
  {id: 1, message: 'Hi'}, 
  {id: 2, message: 'How are you?'},
  {id: 3, message: 'Bye'},
  {id: 4, message: 'Fine'},
  {id: 5, message: 'Nice to meet you'},
  {id: 6, message: 'Ok'}
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App posts={freshPosts} dialogsData={dialogsData} messages={messages} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
