import React from 'react';
import BrandLogo from './BrandLogo/BrandLogo';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Chip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectMeasuredPointsPerSecond } from '../../store/chartDataReducer';
import SettingsIcon from '@material-ui/icons/Settings';

const NavBar: React.FC = () => {
    const measuredPointsPerSecond: number = useSelector(selectMeasuredPointsPerSecond);
    const getMeasuredSpeedLabel = () => `Measurement spead ${measuredPointsPerSecond} pts/s`
    return (
    <nav>
        <ul className={styles.navUl}>
            <BrandLogo text={'Microwave Q-Meter'}/>
            <li>
                <Link className={styles.homeLink} to="/">Home</Link> 
            </li>
            <li>
                <Chip 
                    className={styles.measurementsStatus}
                    size="medium"
                    color="default"
                    label={getMeasuredSpeedLabel()}/>
            </li>
            <li>
                <Link className={styles.settingsLink} to="/settings">
                    <SettingsIcon fontSize="small"/>
                </Link>
            </li>
        </ul>
    </nav>
    )
}

export default NavBar;