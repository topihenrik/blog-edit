import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp"
import SignUpSuccess from "./components/SignUp/SignUpSuccess";
import Profile from "./components/Profile";
import ProfileEdit from "./components/Profile/ProfileEdit";
import ProfileDelete from "./components/Profile/ProfileDelete"
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import Footer from "./components/Footer";
import DeletePost from "./components/DeletePost";

export default function RouteSwitch() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    return(
        <BrowserRouter>
            <Header user={user} setUser={setUser}/>
            <Routes>
                <Route path="/" element={<Home user={user}/>}/>
                <Route path="/login" element={<LogIn user={user} setUser={setUser}/>}/>
                <Route path="/signup" element={<SignUp user={user}/>}/> 
                <Route path="/signup/success" element={<SignUpSuccess/>}/>
                <Route path="/profile" element={<Profile user={user}/>}/>
                <Route path="/profile/edit" element={<ProfileEdit user={user} setUser={setUser}/>}/>
                <Route path="/profile/delete" element={<ProfileDelete user={user} setUser={setUser}/>}/>
                <Route path="/post" element={<CreatePost user={user}/>}/>
                <Route path="/post/:postid" element={<UpdatePost user={user}/>}/>
                <Route path="/post/delete/:postid" element={<DeletePost user={user}/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}