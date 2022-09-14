import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
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
                <Route path="/post" element={<CreatePost user={user}/>}/>
                <Route path="/post/:postid" element={<UpdatePost user={user}/>}/>
                <Route path="/post/delete/:postid" element={<DeletePost user={user}/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}