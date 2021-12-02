import { IMAGE_BOX } from 'common/constant';
import { motion } from 'framer-motion';
import React, { useState, useRef } from 'react';
import styles from './image_box.module.css';

const ImageBox = ({ img, onImageClick, constraintsRef }) => {
    const imgRef = useRef();
    const dragRef = useRef();
    const [itemType, setItemType] = useState(IMAGE_BOX);
    const [draggable, setDraggable] = useState(false);
    const { id, x, y, fileUrl, height, width } = img;
    return (
        <motion.div
            ref={dragRef}
            className={styles.motionItem}
            drag={draggable}
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragElastic={0}
            onDragEnd={(event, info) => {
                console.log(info.point.x, info.point.y);
                setDraggable(false);
            }}
            style={{
                top: y,
                left: x,
            }}
        >
            <div
                ref={imgRef}
                id={id}
                className={styles.img}
                style={{
                    top: y,
                    left: x,
                    height,
                    width,
                    backgroundImage: `url(${fileUrl})`,
                }}
                onClick={(e) => {
                    itemType && onImageClick(e, itemType);
                }}
                onMouseMove={(e) => {
                    if (e.metaKey) {
                        imgRef.current.style.cursor = 'auto';
                        imgRef.current.style.cursor =
                            'url(/images/outline_delete_black_24dp.png), auto';
                    } else if (e.altKey) {
                        // TODO
                        // change to grab & grabbing
                        imgRef.current.style.cursor = 'auto';
                        imgRef.current.style.cursor = 'grab';
                        setDraggable(true);
                    } else {
                        imgRef.current.style.cursor = 'auto';
                    }
                }}
            ></div>
        </motion.div>
    );
};

export default ImageBox;
