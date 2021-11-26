import React from 'react';
import styles from './login.module.css';

const Login = (props) => {
    return (
        <div className={styles.loginBox}>
            <h1 className={styles.loginTitle}>LOGIN</h1>
            <section className={styles.loginBtns}>
                <button className={styles.loginBtn}>
                    <i className={`fab fa-google ${styles.loginIcon}`}></i>
                </button>
                <button className={styles.loginBtn}>
                    <i className={`fab fa-twitter ${styles.loginIcon}`}></i>
                </button>
                <button className={styles.loginBtn}>
                    <i className={`fab fa-github ${styles.loginIcon}`}></i>
                </button>
            </section>
        </div>
    );
};

export default Login;
