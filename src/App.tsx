// import React from 'react'
import { Route , Routes } from 'react-router-dom'
import './globals.css'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import { Home } from './_root/pages'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from '../@/components/ui/toaster'
import Explore from './_root/pages/Explore'
import Saved from './_root/pages/Saved'
import CreatePost from './_root/pages/CreatePost'
import EditPost from './_root/pages/EditPost'
import PostDetails from './_root/pages/PostDetails'
import Profile from './_root/pages/Profile'
import UpdateProfile from './_root/pages/UpdateProfile'
import LikedPosts from './_root/pages/LikedPosts'
import AllUsers from './_root/pages/AllUsers'
export default function App() {
    return (
<main className='flex h-screen'>
    <Routes>
        {/* {PUBLIC ROUTES} */}
        <Route element= {<AuthLayout/>}>
            <Route path='/sign-in' element={<SigninForm/>} />
            <Route path='/sign-up' element={<SignupForm/>} />
        </Route>
        {/* {Private ROUTES} */}
        <Route element = {<RootLayout/>}>
        <Route index element = {<Home/>} />
        <Route path='/explore' element = {<Explore/>} />
        <Route path='/saved' element = {<Saved/>} />
        <Route path='/liked-posts' element = {<LikedPosts/>} />
        <Route path='/create-post' element = {<CreatePost/>} />
        <Route path='/update-post/:id' element = {<EditPost/>} />
        <Route path='/posts/:id' element = {<PostDetails/>} />
        <Route path='/Profile/:id/*' element = {<Profile/>} />
        <Route path='/update-Profile/:id' element = {<UpdateProfile/>} />
        <Route path='/all-users' element = {<AllUsers/>} />

        </Route>
    </Routes>

        <Toaster/>

</main>
    )
}
