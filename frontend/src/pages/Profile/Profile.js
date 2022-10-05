import React, { useEffect } from 'react'
import { Link} from 'react-router-dom'
import MetaData from '../../components/MetaData/MetaData';
import { useSelector, useDispatch} from 'react-redux';
import Loader from '../../components/loader/Loader';
import { useNavigate,  } from 'react-router-dom';
import './Profile.css';
import { clearErrors} from "../../actions/productAction";
import { ToastContainer, toast } from 'react-toastify';


const Profile = () => {
    
    const navigate = useNavigate();
   
  const dispatch = useDispatch();

    const {isAuthenticated, user, loading,error } = useSelector((state)=> state.user);


    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
          }
        if(isAuthenticated===false){
          navigate("/login")
         }
        }, [isAuthenticated]);

        
useEffect(() => {
   
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  return (
   <>


    

    {loading ? (<Loader />): ( 
   <>
   <MetaData title={`${user.name}'s Profile`}/>
  <div className='profileContainer'>
   <div>
       <h1>My profile</h1>
       <img src={user.avatar.url} alt={user.name} className="profile__img"/>
       <Link to="/me/update">Edit Profile</Link>
   </div>
   <div>
       <div>
           <h4>Full Name</h4>
           <p>{user.name}</p>
       </div>
       <div>
           <h4>Email</h4>
           <p>{user.email}</p>
       </div>
       <div>
           <h4>Joined On</h4>
           <p>{String(user.createdAt).substr(0, 10)}</p>
       </div>
       <div>
           <Link to="/orders">My Orders</Link>
           <Link to="password/update">Change Password</Link>
       </div>

   </div>

  </div>
  

  
  </>
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
  )
}

export default Profile