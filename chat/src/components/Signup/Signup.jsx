import React , {useState} from "react";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { Input } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate
} from "react-router-dom";


import './Signup.css';

const Signup =()=>{

    const navigate = useNavigate();

    
    const handlelogin =()=>{

        navigate('/login');
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlesignup = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Handle success, e.g., show a success message or redirect to login
                console.log("User registered successfully");
                localStorage.setItem('email',email);

                navigate('/about');
            } else {
                // Handle error, e.g., show an error message
                console.error("Failed to register user");
            }
        } catch (error) {
            console.error("An error occurred", error);
        }
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

    return(

        <div className="Login" >

            

            <h1 style={{color:'white', marginTop:'70px',fontSize:'65px'}}>Welcome to realem of virtual chat</h1>
            <div className="loginbox">

                

                <span style={{fontSize:'40px', marginTop:'-89px'}}>Create your new  account</span> <br/>
                <span style={{fontSize:'40px'}}>for experiencing virtual chat</span>

                <div className="email" style={{marginTop:'64px'}}>
                    <EmailIcon  />


                <Input fullWidth disableUnderline  placeholder="Enter your email id" sx={{height:"35px",color:"black" ,marginLeft:'17px'}}
                onChange={handleEmailChange}
                
                />

                </div>

                <div className="password" style={{marginTop:'20px'}}>

                    <LockIcon/>
                <Input fullWidth disableUnderline  placeholder="Enter your password" sx={{height:"35px",color:"black",marginLeft:'17px'}}
                onChange={handlePasswordChange}

                  />

                </div>

                <div>
                    <Button variant="contained" color="success"  style={{
                        marginTop: '58px',
                        width: '265px'
                        }}   onClick={handlesignup}>
                            Signup
                            </Button>
                </div>

                <div>
                    <Button variant="contained" color="success"  style={{
                        marginTop: '58px',
                        width: '265px'
                        }}   onClick={handlelogin}>
                            Login
                            </Button>
                </div>



            </div>


        </div>



    );


}

export default Signup;