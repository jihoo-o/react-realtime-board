import React from 'react';
import styles from './header.module.css';

const Header = (props) => (
    <header className={styles.header}>
        <h1 className={styles.headerText}>RealtimeBoard</h1>
        <button className={styles.logoutBtn}>sign out</button>
    </header>
);

export default Header;
