import React, { useEffect, useRef } from 'react';
import styles from './message_box.module.css';

const MessageBox = ({ message, onMessageClick, onMessageChange }) => {
    const inputRef = useRef();
    const { id, x, y, text } = message;

    useEffect(() => {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }, [message]);

    return (
        <textarea
            ref={inputRef}
            key={id}
            id={id}
            className={styles.input}
            type="text"
            value={text}
            maxLength="50"
            style={{
                top: y,
                left: x,
                cursor: 'auto',
            }}
            onClick={(e) => {
                e.stopPropagation();
                if (e.metaKey) {
                    onMessageClick(e.target.id);
                }
            }}
            onInput={(e) => {
                onMessageChange(e.target.id, e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onMouseMove={(e) => {
                if (!e.metaKey) {
                    inputRef.current.style.cursor = 'auto';
                    return;
                }
                inputRef.current.style.cursor =
                    'url(/images/outline_delete_black_24dp.png), pointer';
            }}
        />
    );
};

export default MessageBox;
