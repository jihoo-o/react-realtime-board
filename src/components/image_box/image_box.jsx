import { IMAGE_BOX } from 'common/constants';
import React, { useState, useRef } from 'react';
import styles from './image_box.module.css';
import Draggable from 'react-draggable';

const cursorStyle = {
    Meta: styles.meta,
    Alt: styles.alt,
};

const ImageBox = ({ pressedKey, img, onImageClick, onImageChange }) => {
    const imgRef = useRef();
    const [itemType, setItemType] = useState(IMAGE_BOX);
    const [mouseEnter, setMouseEnter] = useState(false);
    const [dragging, setDragging] = useState(false);

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
                if (pressedKey === 'Alt') {
                    setDragging(true); //
                    return true;
                } else return false;
            }}
            onStop={(e, data) => {
                setDragging(false);
                onImageChange(img.id, data.x, data.y);
            }}
        >
            <div
                ref={imgRef}
                className={`${styles.imgWrapper} ${
                    mouseEnter && pressedKey
                        ? dragging
                            ? styles.dragging
                            : cursorStyle[pressedKey]
                        : styles.autoCursor
                }`}
                style={{
                    top: img.y,
                    left: img.x,
                }}
                onClick={(e) => {
                    itemType && onImageClick(e, itemType);
                }}
                onMouseEnter={() => {
                    setMouseEnter(true);
                }}
                onMouseLeave={() => {
                    setMouseEnter(false);
                }}
            >
                <img
                    id={img.id}
                    className={styles.img}
                    src={img.fileUrl}
                    alt="사진"
                    draggable="false"
                />
            </div>
        </Draggable>
    );
};

export default ImageBox;
