import React from 'react';
import styles from './app.module.css';
import Header from './components/header/header';
import Login from './components/login/login';

function App({ authService }) {
    return (
        <div className={styles.appContainer}>
            <Header />
            <div className={styles.loginComponent}>
                <Login authService={authService} />
            </div>
        </div>
    );
}

export default App;
