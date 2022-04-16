import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
    
    let { title } = props;
    //let loggedIn = JSON.parse(sessionStorage.getItem("loginState"));
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-header">
                    <NavLink className="navbar-brand" to="/">{title}</NavLink>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"><NavLink className="nav-link active" to="/">Home</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/aboutus">About Us</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/contactus">Contact Us</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;