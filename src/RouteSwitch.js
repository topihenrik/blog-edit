import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeMain from "./components/HomeMain";
import LogInMain from "./components/LogInMain";
import EditorMain from "./components/EditorMain";
import Footer from "./components/Footer";



export default function RouteSwitch() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    return(
        <BrowserRouter>
            <Header user={user} setUser={setUser}/>
            <Routes>
                <Route path="/" element={<HomeMain user={user}/>}/>
                <Route path="/login" element={<LogInMain user={user} setUser={setUser}/>}/>
                <Route path="/post" element={<EditorMain user={user}/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}