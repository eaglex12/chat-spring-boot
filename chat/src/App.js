import './App.css';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/login/login';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div >
      
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Signup />}
                    />
                    <Route
                       exact
                       path="/login"
                       element={<Login/>}
                    
                    />
                    <Route
                        exact
                        path="/about"
                        element={<Home />}
                    />
                </Routes>
            
    </div>
  );
}

export default App;
