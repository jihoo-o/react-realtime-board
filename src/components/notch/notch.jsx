import React from 'react';
import styles from './notch.module.css';

const Notch = (props) => {
    return <div className={styles.notch}>{props.children}</div>;
};

export default Notch;
