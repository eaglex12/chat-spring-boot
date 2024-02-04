import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Input } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";

import './Leftsec.css';


const namelist=[


    {
        name: "Divyansh",
        lastText: "Hey there testing whatsapp",
        lastSeen: "4:21 PM",
        selected: true,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      {
        name: "Ketan",
        lastText: "DevStack testing whatsapp",
        lastSeen: "8:51 PM",
        selected: false,
      },
      
]

const Leftsec =(props)=>{

  const [nameList, setNameList] = useState([]);

    const[email,setEmail]=useState('');
    const { onselectuser } = props;
    const navigate = useNavigate();



    useEffect(() => {
      const fetchUserNames = async () => {
        try {
          if (localStorage.getItem('email')) {
            const loggedInUserEmail = localStorage.getItem('email');
            const response = await fetch(`http://localhost:8080/api/users/usernames/${loggedInUserEmail}`);
            const data = await response.json();
            setNameList(data);


            console.log(data); // Log the data here


          }
        } catch (error) {
          console.error('Error fetching user names:', error);
        }
      };
    
      fetchUserNames();
    
      if (localStorage.getItem('email')) {
        setEmail(localStorage.getItem('email'));
      }
    }, [email]);






    const handleUserClick = (user) => {

      onselectuser(user);

      console.log(user);
    };
    const handleLogout = () => {


      localStorage.removeItem('email');
      setEmail('');
      console.log("Logout successful");

      navigate('/login');

    };


    return(
        <div className="Leftsec">

            <div className="loggedinbar">

                <div style={{display:'flex', alignItems:'center'}}>
                <Avatar/>

                <span style={{color:'white',fontSize:'20px',marginLeft:'12px'}}>{email.split('@')[0]} </span>

                </div>

                <div style={{
                    display:'flex',


                }}>
                    <IconButton  onClick={() => {}}   sx={{paddingRight: "15px",}}>
                        <DonutLargeIcon sx={{color: "#afbac0",}}/>
                    </IconButton>
                    <IconButton  onClick={() => {}}  sx={{paddingRight: "10px",}}>
                        <ChatIcon  sx={{color: "#afbac0",}}/>
                    </IconButton>
                    <IconButton  onClick={handleLogout}>
                        <MoreVertIcon sx={{color: "#afbac0",}}/>
                    </IconButton>
                </div>


            </div>

            <div className="searchinbar">

                <div className="searchingbar">

                    <IconButton onClick={() => {}} >

                    <SearchIcon sx={{ color: "#8696a1",height: "20px",width: "20px",}}/>

                    </IconButton>

                    <Input fullWidth disableUnderline  placeholder="Search or start a new chat" sx={{height:"35px",color:"white"}}/>
                </div>

                <IconButton onClick={() => {}}>
                     <FilterListIcon sx={{ color: "#8696a1",height: "20px",width: "20px",}}/>
                </IconButton>
                
            </div>

            <div className="namelistbar">
            {nameList.map((idx,index)=>(

                <div key={index}  style={{ 
                    
                    boxSizing:'border-box',
                    border:'2px solid black',
                    display:'flex',

                    padding:'0px 12px',
                    height:'88px',
                    alignItems:'center',
                    cursor:'pointer'
                                    
                    }}            onClick={() => handleUserClick(idx)}
                    >  
                    <div style={{flex:0.2}}><Avatar/>
                    
                     </div>

                     <div style={{
                        color:'grey',
                        flex:'1.6',
                     }}><span>{idx.email}</span><br/>
                <span>{idx.lastText}</span>
                     </div>
                    

                    <div style={{
                        color:'grey'
                     }}> 
                        <span>{idx.lastSeen}</span>
                    </div>

                    

                </div>

                

            ))}


            </div>

            


        </div>



    );
}

export default Leftsec;