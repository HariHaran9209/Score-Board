import React from 'react'
import '../css/Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="logo">Score Mash</div>
        <ul className="nav-links">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="user">
            <button className="login">Login</button>
            <button className="register">Register</button>
        </div>
    </div>
  )
}

export default Navbar
