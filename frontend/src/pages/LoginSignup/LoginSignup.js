import React, {useRef,useState, useEffect} from 'react';
import Loader from '../../components/loader/Loader';
import {Link} from 'react-router-dom';
import './LoginSignup.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction';
import { useNavigate , useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const LoginSignup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

  const { error, loading, isAuthenticated} = useSelector(state=> state.user)
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail]= useState("");
    const [loginPassword, setLoginPassword] = useState("");


    const [user, setUser] =useState(
        {
            name:"",
            email:"",
            password:"",
        }
    );
    const {name, email, password} = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/profile.png")
   
    const loginSubmit =(e) =>{
      e.preventDefault();
      dispatch(login(loginEmail, loginPassword))
       
    };

    const registerSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);
      dispatch(register(myForm));
    };

    const registerDataChange=(e)=>{
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload=()=>{
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user, [e.target.name]:e.target.value})
        }

    }

    useEffect(() => {
   
      window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);
    
    const redirect= location.search ? location.search.split("=")[1]: "/account";
    useEffect(() => {
      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }
      if(isAuthenticated){
        navigate(redirect)
       }
      
      }, [isAuthenticated,  error, redirect]);

    const switchTabs = (e, tab)=>{
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft")
    }
    if(tab === "register"){
        switcherTab.current.classList.add("shiftToRight");
        switcherTab.current.classList.remove("shiftToNeutral");
     
        registerTab.current.classList.add("shiftToNeutralForm");
        loginTab.current.classList.add("shiftToLeft")

        }    
    }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                <p onClick={(e) => switchTabs(e, "register")}>Register</p>
              </div>
              <button ref={switcherTab}></button>
            </div>

            <form
              action=""
              className="loginForm"
              ref={loginTab}
              onSubmit={loginSubmit}
            >
              <div className="loginEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot" className="forgotBtn">
                Forget Password ?
              </Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <FaceIcon />
                <input
                  type="text"
                  minLength="3"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <LockOpenIcon />
                <input
                  minLength="8"
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                  required
                />
                <p style={{fontSize : "10px", color: "red"}}>File size should be less than 500kb.
                  </p>
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
              <div className="rest-link">
                <Link to="/signup">
                  {" "}
                  Click Here! (Register Your Restaurant){" "}
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default LoginSignup;