import React, { useState } from 'react';
import Draggable from 'react-draggable';
import styles from './box_wrapper.module.css';

const cursorStyle = {
    Meta: styles.meta,
    Alt: styles.alt,
    // m: styles.addMessageBox,
    // i: styles.addImageBox,
    // d: styles.addDrawingBox,
    // w: styles.addWebcamBox,
    // g: styles.addGameBox,
};

/**
 *
 * @param pressedKey The currently pressed key. For changing the cursor style.
 * @param updatePosition callback triggered when drag is finished.
 * @param children Message/Image/Webcam-Box. The ID of the item must be placed with the first child in the Box.
 * @returns Message/Image/Webcam-Box that can automatically adjust the cursor and can be dragged.
 */

const BoxWrapper = ({ pressedKey, updatePosition, children }) => {
    const [mouseEnter, setMouseEnter] = useState(false);
    const [dragging, setDragging] = useState(false);

    return (
        <Draggable
            axis="both"
            bounds={{
                // ----> TODO: define as the board size
                left: 0,
                right: 1000,
                top: 0,
                bottom: 1000,
            }}
            position={{ x: 0, y: 0 }}
            scale={1}
            onStart={() => {
                if (pressedKey === 'Alt') {
                    setDragging(true);
                    return true;
                } else return false;
            }}
            onStop={(e, data) => {
                setDragging(false);
                updatePosition(data.node.firstChild.id, null, data.x, data.y);
            }}
        >
            <div
                className={`${
                    mouseEnter && pressedKey
                        ? dragging
                            ? styles.dragging
                            : cursorStyle[pressedKey]
                        : styles.autoCursor
                }`}
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
            >
                {children}
            </div>
        </Draggable>
    );
};

export default BoxWrapper;
