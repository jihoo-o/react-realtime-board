import React from 'react';
import { useNavigate } from 'react-router';
import styles from './header.module.css';

const Header = ({ authService }) => {
    const navigate = useNavigate();

    const onLogout = () => {
        authService //
            .logout() //
            .then(() => {
                navigate('/');
            });
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.headerText}>RealtimeBoard</h1>
            <button className={styles.logoutBtn} onClick={onLogout}>
                sign out
            </button>
        </header>
    );
};

export default Header;
