import React from 'react';
import styles from './messageBox.module.css';

const MessageBox = ({ message }) => {
    const { id, x, y, text } = message;
    const inputStyle = {
        top: y,
        left: x,
    };

    return (
        <textarea
            className={styles.input}
            type="text"
            defaultValue={text || null}
            maxLength="50"
            style={inputStyle}
            onClick={(e) => {
                e.stopPropagation();
            }}
            onInput={(e) => {
                if (e.target.scrollHeight <= 46) return;
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
            }}
        />
    );
};

export default MessageBox;
