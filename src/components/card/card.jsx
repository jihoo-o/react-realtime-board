import React, { memo } from 'react';
import styles from './card.module.css';

const styleTheme = {
    Dark: styles.dark,
    Light: styles.light,
    Colorful: styles.colorful,
    Default: styles.light,
};

const DEFAULT_IMAGE = '/images/default_logo.png';
const Card = memo(({ card }) => {
    const { name, company, title, email, message, theme, fileURL } = card;
    const url = fileURL || DEFAULT_IMAGE;
    return (
        <li className={`${styles.card} ${styleTheme[theme]}`}>
            <img className={styles.avatar} src={url} alt="profile" />
            <div className={styles.info}>
                <h1 className={styles.name}>{name}</h1>
                <p className={styles.company}>{company}</p>
                <p className={styles.title}>{title}</p>
                <p className={styles.email}>{email}</p>
                <p className={styles.message}>{message}</p>
            </div>
        </li>
    );
});

export default Card;
