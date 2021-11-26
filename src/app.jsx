import React from 'react';
import styles from './app.module.css';
import Login from './components/login/login';

function App() {
    return (
        <div className={styles.loginComponent}>
            <Login />
        </div>
    );
}

export default App;
