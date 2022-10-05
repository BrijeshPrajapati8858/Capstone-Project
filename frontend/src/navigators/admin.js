import React, { useEffect, useState } from 'react';

import { Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home.js';
import Footer from '../components/Footer/Footer';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import Products from '../pages/Products/Products';
import Search from '../components/Search/Search';
import LoginSignup from '../pages/LoginSignup/LoginSignup';
import store from '../store';
import { loadUser } from '../actions/userAction';
import UserOptions from '../components/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from '../pages/Profile/Profile.js';
import ProtectedRoute from '../components/Route/ProtectedRoute';
import UpdateProfile from '../components/User/UpdateProfile.js';
import UpdatePassword from '../components/User/UpdatePassword.js';
import ForgotPassword from '../components/User/ForgotPassword';
import ResetPassword from '../components/User/ResetPassword.js';
import Cart from '../components/cart/Cart';
import Shipping from '../components/cart/Shipping.js';
import CheckoutSteps from '../components/order/CheckoutSteps';
import ConfirmOrder from '../components/order//ConfirmOrder';
import Payment from '../components/order//Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from '../components/order/OrderSuccess.js';
import MyOrder from '../components/order/MyOrder';
import MyOrderDetails from '../components/order/MyOrderDetails';
import Dashboard from '../components/Admin/Dashboard';
import CreateProduct from '../components/Admin/CreateProduct';
import AllProducts from '../components/Admin/AllProducts';
import EditProduct from '../components/Admin/EditProduct';
import AllOrder from '../components/Admin/AllOrder';
import UpdateOrder from '../components/Admin/UpdateOrder';
import AllUsers from '../components/Admin/AllUsers';
import UpdateUser from '../components/Admin/UpdateUser';
import AllReviews from '../components/Admin/AllReviews';
import BottomTab from '../components/BottomTab/BottomTab';
import Search_Section from '../components/contents/Search_Section';
import SignUp from '../pages/Join/SignUp';

// import Notfound from "./more/Notfound";

function AdminNavigator() {
  const { isAuthenticated, user } = useSelector((state) => state.user);



          if(isAuthenticated)
          return(
            <>

              {/* Admin Routes */}

              {user?.role === "admin" ? (
                <>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/admin/products' element={<AllProducts />} />
                  <Route path='/admin/product' element={<CreateProduct />} />
                  <Route path='/edit/product/:id' element={<EditProduct />} />
                  <Route path='/admin/orders' element={<AllOrder />} />
                  <Route path='/admin/order/:id' element={<UpdateOrder />} />
                  <Route path='/admin/users' element={<AllUsers />} />
                  <Route path='/admin/user/:id' element={<UpdateUser />} />
                  <Route path='/admin/reviews' element={<AllReviews />} />
                </>
              ): <Route path='/' element={<Home />} />}
          
          
          </>
          );

  
 
}

export default AdminNavigator;
