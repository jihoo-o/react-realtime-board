import React from 'react';
import styles from './login.module.css';

const Login = ({ authService }) => {
    const onLogin = (e) => {
        authService.login(e.target.dataset.provider);
    };
    return (
        <div className={styles.loginBox}>
            <h1 className={styles.loginTitle}>LOGIN</h1>
            <section className={styles.loginBtns}>
                <button
                    className={styles.loginBtn}
                    data-provider="google"
                    onClick={onLogin}
                >
                    <i className={`fab fa-google ${styles.loginIcon}`}></i>
                </button>
                <button
                    className={styles.loginBtn}
                    data-provider="twitter"
                    onClick={onLogin}
                >
                    <i className={`fab fa-twitter ${styles.loginIcon}`}></i>
                </button>
                <button
                    className={styles.loginBtn}
                    data-provider="github"
                    onClick={onLogin}
                >
                    <i className={`fab fa-github ${styles.loginIcon}`}></i>
                </button>
            </section>
        </div>
    );
};

export default Login;
