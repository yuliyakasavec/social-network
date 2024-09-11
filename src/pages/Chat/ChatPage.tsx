import React, { useEffect, useState } from "react";
import classes from "./ChatPage.module.css";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage:React.FC = () => {
    return <div>
        <Chat />
    </div>
};

const Chat:React.FC = () => {

    return <div>
        <Messages />
        <AddMessageForm />
    </div>
};

const Messages:React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        })
    }, [])


    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
};

const Message:React.FC<{message: ChatMessageType}> = ({message}) => {

    return <div>
        <img src={message.photo} className={classes.userPhoto}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
};

const AddMessageForm:React.FC = () => {
    const [message, setMessage] = useState('');
    const sendMessage = () => {
        if (!message) {
            return;
        }
        wsChannel.send(message);
        setMessage('');
    };

    return <div>
        <form>
        <div><textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea></div>
        <div><input type='submit' onClick={sendMessage} value='Send'/></div>
        </form>
    </div>
};

export default ChatPage;