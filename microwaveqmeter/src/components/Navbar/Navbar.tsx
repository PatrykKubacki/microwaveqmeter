import React from 'react';
import BrandLogo from './BrandLogo/BrandLogo';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavBar: React.FC = () => {
    return (
    <nav>
        <ul>
            <BrandLogo text={'Microwave Q-Meter'}/>
            <li>
                <Link to="/">Home</Link> 
            </li>
            <li className="settingsLink">
                <Link to="/settings">Settings</Link>
            </li>
        </ul>
    </nav>
    )
}

export default NavBar;