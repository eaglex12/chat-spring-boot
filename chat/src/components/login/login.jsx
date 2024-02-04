import React ,{useState} from "react";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { Input } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate
} from "react-router-dom";


import './login.css';

const Login =()=>{

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  

    const handleLogin = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
    
          if (response.ok) {
            // Authentication successful
            console.log("Login successful");

            localStorage.setItem('email',email);
            navigate('/about'); // Redirect to the about page or the desired page
          } else {
            // Authentication failed
            console.error("Login failed");
          }
        } catch (error) {
          console.error("An error occurred", error);
        }
      };

    const handlesignup =()=>{

        navigate('/');
    }
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

                

                <span style={{fontSize:'40px', marginTop:'-89px'}}>Sign in to your account</span> <br/>
                <span style={{fontSize:'40px'}}>for experiencing virtual chat</span>

                <div className="email" style={{marginTop:'64px'}}>
                    <EmailIcon  />


                <Input fullWidth disableUnderline  placeholder="Enter your email id" sx={{height:"35px",color:"black" ,marginLeft:'17px'}}
                   onChange={handleEmailChange}/>

                </div>

                <div className="password" style={{marginTop:'20px'}}>

                    <LockIcon/>
                <Input fullWidth disableUnderline  placeholder="Enter your password" sx={{height:"35px",color:"black",marginLeft:'17px'}}
                    onChange={handlePasswordChange}/>

                </div>

                <div>
                    <Button variant="contained" color="success"  style={{
                        marginTop: '58px',
                        width: '265px'
                        }}   onClick={handleLogin}>
                            Login
                            </Button>
                </div>

                <div>
                    <Button variant="contained" color="success"  style={{
                        marginTop: '58px',
                        width: '265px'
                        }}   onClick={handlesignup}>
                            Sign up
                            </Button>
                </div>


            </div>


        </div>



    );


}

export default Login;