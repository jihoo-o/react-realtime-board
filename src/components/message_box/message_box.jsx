import { MESSAGE_BOX } from 'common/constant';
import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react';
import styles from './message_box.module.css';

const MessageBox = ({
    message,
    removeMessageBox,
    updateMessageBox,
    constraintsRef,
}) => {
    const inputRef = useRef();
    const dragRef = useRef();
    const [itemType, setItemType] = useState(MESSAGE_BOX);
    const [draggable, setDraggable] = useState(false);
    const { id, x, y, text } = message;

    useEffect(() => {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }, [message]);

    return (
        <motion.div
            ref={dragRef}
            className={styles.motionItem}
            drag={draggable}
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragElastic={0}
            onDragEnd={(event, info) => {
                setDraggable(false);
                // TODO
                // upload to DB
                // updateMessageBox(id, null, info.point.x, info.point.y);
            }}
            style={{
                top: y,
                left: x,
            }}
        >
            <textarea
                ref={inputRef}
                id={id}
                className={styles.input}
                type="text"
                value={text}
                maxLength="50"
                style={{
                    cursor: 'auto',
                }}
                onClick={(e) => {
                    itemType && removeMessageBox(e, itemType);
                }}
                onInput={(e) => {
                    updateMessageBox(e.target.id, e.target.value);
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
                        inputRef.current.style.cursor = 'grab';
                        // TODO
                        // change to grab & grabbing
                        // set draggable state & render motion.div
                        setDraggable(true);
                    } else {
                        inputRef.current.style.cursor = 'auto';
                    }
                }}
            />
        </motion.div>
    );
};

export default MessageBox;
