import { MESSAGE_BOX } from 'common/constant';
import React, { useState, useEffect, useRef } from 'react';
import styles from './message_box.module.css';

const MessageBox = ({ message, onMessageClick, onMessageChange }) => {
    const [itemType, setItemType] = useState(MESSAGE_BOX);
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
                itemType && onMessageClick(e, itemType);
            }}
            onInput={(e) => {
                onMessageChange(e.target.id, e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onMouseMove={(e) => {
                if (e.metaKey) {
                    inputRef.current.style.cursor = 'auto';
                    inputRef.current.style.cursor =
                        'url(/images/outline_delete_black_24dp.png), auto';
                } else if (e.altKey) {
                    inputRef.current.style.cursor = 'auto';
                    inputRef.current.style.cursor =
                        'url(images/back_hand_black_24dp.svg), auto';
                } else {
                    inputRef.current.style.cursor = 'auto';
                }
            }}
        />
    );
};

export default MessageBox;
