import React,{useState,useEffect} from "react";
import './Rightsec.css';
import { Avatar, IconButton,Input } from "@mui/material";
import Search from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoodIcon from "@mui/icons-material/Mood";
import MicIcon from "@mui/icons-material/Mic";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Mic from "@mui/icons-material/Mic";

const messages = [
    { sender: 'user', text: 'Hello' },
    { sender: 'other', text: 'Hi there' },

    {sender:'user', text:'Kaisa hai lauday'},
    {sender:'user', text:'Kahan gaand mara rha hai??'},


    { sender: 'other', text: 'main toh ketan hoon , mera kaam hi hai gaand marwana' },
    { sender: 'user', text: 'Hello' },
    { sender: 'other', text: 'Hi there' },

    {sender:'user', text:'Kaisa hai lauday'},
    {sender:'user', text:'Kahan gaand mara rha hai??'},


    { sender: 'other', text: 'main toh ketan hoon , mera kaam hi hai gaand marwana' },
    { sender: 'user', text: 'Hello' },
    { sender: 'other', text: 'Hi there' },

    {sender:'user', text:'Kaisa hai lauday'},
    {sender:'user', text:'Kahan gaand mara rha hai??'},


    { sender: 'other', text: 'main toh ketan hoon , mera kaam hi hai gaand marwana' },
    { sender: 'user', text: 'Hello' },
    { sender: 'other', text: 'Hi there' },

    {sender:'user', text:'Kaisa hai lauday'},
    {sender:'user', text:'Kahan gaand mara rha hai??'},


    { sender: 'other', text: 'main toh ketan hoon , mera kaam hi hai gaand marwana' },

    { sender: 'user', text: 'Hello' },
    { sender: 'other', text: 'Hi there' },

    {sender:'user', text:'Kaisa hai lauday'},
    {sender:'user', text:'Kahan gaand mara rha hai??'},


    { sender: 'other', text: 'main toh ketan hoon , mera kaam hi hai gaand marwana' },

    { sender: 'user', text: 'Hello' },
    { sender: 'other', text: 'Hi there' },

    {sender:'user', text:'Kaisa hai lauday'},
    {sender:'user', text:'Kahan gaand mara rha hai??'},


    { sender: 'other', text: 'main toh ketan hoon , mera kaam hi hai gaand marwana' },




    
  ];




const Rightsec =(props)=>{

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const[mesg,setmessage]= useState(messages);
    const [textValue, setTextValue] = useState("");
    const { selectedUser } = props;

   console.log("right", props);
   console.log("Selected User:", selectedUser);



    const onEmojiclick=(event)=>{  
        
        // console.log('this is emoji',event.emoji);

        // console.log('Before',textValue);

        let tempo= textValue;

        tempo+= event.emoji;



        setTextValue(tempo);
        // console.log('after',textValue);

        setShowEmojiPicker(false);


    };

    const onEnterpress= (event)=>{

        if(event.key==="Enter")
        {
            const tempmsg=[...mesg];

            tempmsg.push({

                sender:'other',
                text:textValue,
            });
                

            console.log("text", textValue);

            setmessage(tempmsg);
            setTextValue("");

        }
    };




    


    return(
        <div className="Rightsec">

            <div className="selecteduser">


                <div>
                <Avatar/>


                </div>

                <div style={{ marginLeft:'-1100px'}}>

                    
                    <span style={{color:'white' , fontSize:'20px'}}>{selectedUser?.name}</span> <br/>
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

                        {mesg.map((idx, index) => (
                    <div
                        className="messages"
                        style={{
                        justifyContent: idx.sender === 'user' ? 'flex-end' : 'flex-start',
                        }}
                        key={index}
                    >
                        <span>{idx.text}</span>
                    </div>
                    ))}
                            




                {/* <img src="./assets/bg.png"  style={{ height:'100%' ,width:'100%'}}/> */}
                
            </div>
            <div className="messagebox">

                {showEmojiPicker &&(

                <EmojiPicker 
                   onEmojiClick={onEmojiclick}
                />
                )}

                <div>
                <IconButton  onClick ={()=>{

                    setShowEmojiPicker(!showEmojiPicker);

                }}>                       
                      <MoodIcon sx={{ color: "#8696a1",height: "28px",width: "28px",}} />
                </IconButton>
                <IconButton>
                    <AttachFileIcon sx={{ color: "#8696a1",height: "28px",width: "28px",}}/>
                </IconButton>

                </div>

                <div className="msgbar">
                    <Input fullWidth disableUnderline  placeholder="Search or start a new chat" value={textValue} sx={{height:"35px",color:"white"}}

                       onKeyDown={onEnterpress}
                        
                        onChange={(e)=>{
                            setTextValue(e.target.value);

                        }}
                               

                    />
                </div>

                <IconButton onClick={()=>{}}>
                    <Mic sx={{ color:'grey'}}/>
                </IconButton>
            </div>

            


        </div>



    );
}

export default Rightsec;