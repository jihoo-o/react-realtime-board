import { MESSAGE_BOX } from 'common/constants';
import React, { useState, useEffect, useRef } from 'react';
import styles from './message_box.module.css';
import Draggable from 'react-draggable';
// ~cursors: '../../common/constant.js';

const cursorStyle = {
    Meta: styles.meta,
    Alt: styles.alt,
    // m: styles.addMessageBox,
    // i: styles.addImageBox,
    // d: styles.addDrawingBox,
    // w: styles.addWebcamBox,
    // g: styles.addGameBox,
};

const MessageBox = ({ currKey, message, onMessageClick, onMessageChange }) => {
    const [itemType, setItemType] = useState(MESSAGE_BOX);
    const [mouseEnter, setMouseEnter] = useState(false);
    const [dragging, setDragging] = useState(false);
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
            scale={1}
            /**
             * TODO
             * Mutual exclusion related to the location of the item can be occured on the board.
             * use the onStart below.
             */
            onStart={() => {
                if (currKey === 'Alt') {
                    setDragging(true); //
                    return true;
                } else return false;
            }}
            onStop={(e, data) => {
                setDragging(false);
                onMessageChange(message.id, null, data.x, data.y);
            }}
        >
            <textarea
                ref={inputRef}
                key={message.id}
                id={message.id}
                className={`${styles.input} ${
                    mouseEnter && currKey
                        ? dragging
                            ? styles.dragging
                            : cursorStyle[currKey]
                        : styles.autoCursor
                }`}
                type="text"
                value={message.text}
                maxLength="50"
                style={{
                    top: message.y,
                    left: message.x,
                }}
                onClick={(e) => {
                    itemType && onMessageClick(e, itemType);
                }}
                onInput={(e) => {
                    onMessageChange(e.target.id, e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                }}
                onMouseEnter={() => {
                    setMouseEnter(true);
                }}
                onMouseLeave={() => {
                    setMouseEnter(false);
                }}
                onKeyDown={(e) => {
                    e.stopPropagation();
                }}
                onKeyPress={(e) => {
                    e.stopPropagation();
                }}
            />
        </Draggable>
    );
};

export default MessageBox;
