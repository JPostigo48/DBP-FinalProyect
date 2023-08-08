import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserRoute } from "./user.routes.js";

import Home from '../core/Home.js';
import SignIn from '../core/SignIn.js';
import SignUp from '../core/SignUp.js';
import Main from '../core/Main.js';
import Logout from '../core/Logout.js';
import Profile from '../core/Profile.js';
import ProfileA from '../core/ProfileA.js';
import ProfileF from '../core/ProfileF.js';
import EditProfile from '../core/EditProfile.js';
import CreatePost from '../core/CreatePost.js';
import User from '../core/User.js';
import Search from '../core/Search.js';
import AddCity from '../core/AddCity.js';

export const Enrutador = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" exact element = { <Home/> } />
        <Route path = "/signin" exact element = { <SignIn/> } />
        <Route path = "/signup" exact element = { <SignUp/> } />
        <Route path = "/logout" exact element = { <Logout/> } />

        <Route path = "/main" exact element = { <UserRoute><Main/></UserRoute> } />
        <Route path = "/profile" exact element = { <UserRoute><Profile/></UserRoute> } />
        <Route path = "/profile/A" exact element = { <UserRoute><ProfileA/></UserRoute> } />
        <Route path = "/profile/F" exact element = { <UserRoute><ProfileF/></UserRoute> } />
        <Route path = "/profile/edit" exact element = { <UserRoute><EditProfile/></UserRoute> } />
        <Route path = "/profile/edit/city" exact element = { <UserRoute><AddCity/></UserRoute> } />
        <Route path = "/profile/newpost" exact element = { <UserRoute><CreatePost/></UserRoute> } />
        <Route path = "/user/:Userid" exact element = { <UserRoute><User/></UserRoute> } />
        <Route path = "/search/:word" exact element = {<UserRoute><Search/></UserRoute> } />
        
        
      </Routes>
    </BrowserRouter>
  )
}

// export default Router;