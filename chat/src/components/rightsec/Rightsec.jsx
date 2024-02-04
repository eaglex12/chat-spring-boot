import React, { useState, useEffect } from "react";
import './Rightsec.css';
import { Avatar, IconButton, Input } from "@mui/material";
import Search from "@mui/icons-material/Search";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoodIcon from "@mui/icons-material/Mood";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from "@mui/icons-material/Mic";
import SockJsClient from 'react-stomp';
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";


const Rightsec = (props) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [messages, setMessages] = useState([]);
    const [textValue, setTextValue] = useState("");
    const { selectedUser } = props;
    let clientRef;

    const onEmojiClick = (event) => {
        let tempMessage = textValue + event.emoji;
        setTextValue(tempMessage);
        setShowEmojiPicker(false);
    };

    const onEnterPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (textValue.trim() === "") return;

        const message = {
            senderEmail: 'currentLoggedInUserEmail',
            receiverEmail: selectedUser.email,
            text: textValue,
            timestamp: Date.now(),
        };

        // Use SockJsClient to send the message
        clientRef.sendMessage(`/app/chat/${selectedUser.email}`, JSON.stringify(message));

        setMessages([...messages, message]);
        setTextValue('');
    };

    return (
        <div className="Rightsec">
            <SockJsClient
                url="http://localhost:8080/ws"  // WebSocket endpoint of your backend
                topics={[`/topic/chat/${selectedUser.email}`]}  // Subscription topic
                onConnect={() => console.log('Connected')}
                onDisconnect={() => console.log('Disconnected')}
                ref={(client) => (clientRef = client)}
            />

            <div className="selecteduser">
                <div>
                    <Avatar/>
                </div>
                <div style={{ marginLeft:'-1000px'}}>
                    <span style={{color:'white' , fontSize:'20px'}}>{selectedUser?.email}</span> <br/>
                    <span style={{color:'#afbac0'}}>online</span>
                </div>
                <div>
                    <IconButton onclick={()=> {}}>
                        <Search style={{ color:'grey'}}/>
                    </IconButton>
                    <IconButton onClick={()=>{}}>
                        <MoreVertIcon style={{color:'grey'}}/>
                    </IconButton>
                </div>
            </div>

            <div className="messagearea">
                {messages && messages.map((message, index) => (
                    <div
                        className="messages"
                        style={{
                            justifyContent: message.senderEmail === selectedUser.email ? 'flex-end' : 'flex-start',
                        }}
                        key={index}
                    >
                        <span>{message.text}</span>
                    </div>
                ))}
            </div>

            <div className="messagebox">
                {showEmojiPicker && (
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                )}

                <div>
                    <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        <MoodIcon sx={{ color: "#8696a1", height: "28px", width: "28px" }} />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon sx={{ color: "#8696a1", height: "28px", width: "28px" }} />
                    </IconButton>
                </div>

                <div className="msgbar">
                    <Input
                        fullWidth
                        disableUnderline
                        placeholder="Type your message..."
                        value={textValue}
                        sx={{ height: "35px", color: "white" }}
                        onKeyDown={onEnterPress}
                        onChange={(e) => setTextValue(e.target.value)}
                    />
                </div>

                <IconButton onClick={sendMessage}>
                    <MicIcon sx={{ color: 'grey' }} />
                </IconButton>
            </div>
        </div>
    );
}

export default Rightsec;
