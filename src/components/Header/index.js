import React, { useState } from "react";
import MenuIcon from "../../icons/menu.png";
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    const { user, setUser } = props;
    const [ menuVis, setMenuVis ] = useState("dispNone");
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        setUser(null);
        navigate("../login", {replace: true});
    }

    const handleClickMenu = (e) => {
        e.preventDefault();
        if (menuVis === "dispNone") {
            setMenuVis("dispFlex");
        } else {
            setMenuVis("dispNone");
        }
    }

    return(
        <header>
            <div className="header-box">
                <div className="header-top-box">
                    <div className="logo-box">
                        <a href="/"><h1>{"<"}<span id="logo-first-letter">E</span>dit{"/>"}</h1></a>
                    </div>
                    <button onClick={handleClickMenu} id="menuBtn"><img id="menu" src={MenuIcon}/></button>
                </div>
                {user?
                <div className={menuVis + " mobile-auth-box"}>
                    <a href="/profile">
                        <button className="mobile-profile-button">
                            <span>Profile</span>
                            <img className="mobile-profile-avatar-icon" src={user.avatar_url}/>
                        </button>
                    </a>
                    <a onClick={handleClick}><button className="mobile-logout-button">Log Out</button></a>
                </div>:
                <div className={menuVis + " mobile-auth-box"}>
                    <a href="/login"><button className="mobile-login-button">Login</button></a>
                    <a href="/signup"><button className="mobile-sign-up-button">Sign up</button></a>
                </div>}
                {user?
                <div className="auth-box">
                    <a href="/profile">
                        <button className="profile-button">
                            <img className="profile-avatar-icon" src={user.avatar_url}/>
                            <span>Profile</span>
                        </button>
                    </a>
                    <a onClick={handleClick}><button className="logout-button">Log Out</button></a>
                </div>:
                <div className="auth-box">
                    <a href="/login"><button className="login-button">Login</button></a>
                    <a href="/signup"><button className="sign-up-button">Sign up</button></a>
                </div>}
            </div>
        </header>
    )
}