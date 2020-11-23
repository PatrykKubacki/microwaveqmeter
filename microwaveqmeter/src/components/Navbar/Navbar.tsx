import React from 'react';
import BrandLogo from './BrandLogo/BrandLogo';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const NavBar: React.FC = () => {
    return (
    <nav>
        <ul className={styles.navUl}>
            <BrandLogo text={'Microwave Q-Meter'}/>
            <li>
                <Link className={styles.homeLink} to="/">Home</Link> 
            </li>
            <li>
                <Link className={styles.settingsLink} to="/settings">Settings</Link>
            </li>
        </ul>
    </nav>
    )
}

export default NavBar;