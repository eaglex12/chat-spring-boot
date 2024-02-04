import React, { useState, useEffect } from "react";
import './Rightsec.css';
import { Avatar, IconButton, Input } from "@mui/material";
import Search from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoodIcon from "@mui/icons-material/Mood";
import MicIcon from "@mui/icons-material/Mic";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Mic from "@mui/icons-material/Mic";





const Rightsec = (props) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [messages, setMessages] = useState([]);
    const [textValue, setTextValue] = useState("");
    const { selectedUser } = props;

    


    
    useEffect(() => {


    
        // Fetch messages for the selected user (replace with your actual logic)
        const fetchMessages = async () => {
            try {
                if (selectedUser) {
                    const response = await fetch(`http://localhost:8080/api/messages/${selectedUser.email}`);
                    const data = await response.json();
                    setMessages(data.messages || []);

                    console.log('selected user', selectedUser.email);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [selectedUser]);

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

    const sendMessage = async () => {
        if (textValue.trim() === "") return;

        try {
            // Replace with your actual API endpoint and logic to send a message
            const response = await fetch(`http://localhost:8080/api/chat/${selectedUser.email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderEmail: 'currentLoggedInUserEmail', // Replace with the actual sender's email
                    receiverEmail: selectedUser.email,
                    text: textValue,
                    timestamp: Date.now(),
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessages([...messages, data.message]);
                setTextValue('');
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (

        <div className="Rightsec">

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
                {messages & messages.map((message, index) => (
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
