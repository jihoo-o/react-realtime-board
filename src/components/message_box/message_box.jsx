import { MESSAGE_BOX } from 'common/constant';
import React, { useState, useEffect, useRef } from 'react';
import styles from './message_box.module.css';
import Draggable from 'react-draggable';

const MessageBox = ({ message, onMessageClick, onMessageChange }) => {
    const [itemType, setItemType] = useState(MESSAGE_BOX);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }, [message]);

    return (
        <Draggable
            axis="both"
            bounds="parent"
            position={{ x: 0, y: 0 }}
            // handle=".handle"
            // defaultPosition={{ x: 0, y: 0 }}
            scale={1}
            /**
             * TODO
             * Mutual exclusion related to the location of the item can be occured on the board.
             * use the onStart below.
             */
            // onStart={() => true}
            onStop={(e, data) => {
                onMessageChange(message.id, null, data.x, data.y);
            }}
        >
            <textarea
                ref={inputRef}
                key={message.id}
                id={message.id}
                className={styles.input}
                type="text"
                value={message.text}
                maxLength="50"
                style={{
                    top: message.y,
                    left: message.x,
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
                    /**
                     * TODO
                     * use classList + css
                     */
                    if (e.metaKey) {
                        inputRef.current.style.cursor = 'auto';
                        inputRef.current.style.cursor =
                            'url(/images/outline_delete_black_24dp.png), auto';
                    } else if (e.altKey) {
                        inputRef.current.style.cursor = 'auto';
                        inputRef.current.style.cursor = 'grab';
                    } else {
                        inputRef.current.style.cursor = 'auto';
                    }
                }}
            />
        </Draggable>
    );
};

export default MessageBox;
