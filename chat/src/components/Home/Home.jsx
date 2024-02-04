import React, { useState } from "react";

import Leftsec from "../leftsec/Leftsec";
import Rightsec from "../rightsec/Rightsec";
import './Home.css';

const Home =()=>{
    const[selectedUser, setselecteduser]=useState(null);



    const handleSelectUser= (user)=>{
        setselecteduser(user);


    };

    console.log('home paga user', selectedUser);
  


    return(
        <div className="Home">

       <Leftsec onselectuser={handleSelectUser}  />
       {selectedUser ?(
                    <Rightsec selectedUser={selectedUser}/>



       ): (<div style={{
        'flex': 3,
    boxSizing: 'border-box',
    border: '4px solid black',
    height: '100vh',
    overflowY: 'hidden',
       }}>   <div style={{ marginLeft:'29vh', marginTop:'29vh'}}>

        <img  style={{borderRadius:'176px'}}
       src="./assets/right/nh.avif"/>

       <h1>NO chat is selected yet</h1>
        
        </div>     
       </div>

       )}
               

            


        </div>



    );
}

export default Home;