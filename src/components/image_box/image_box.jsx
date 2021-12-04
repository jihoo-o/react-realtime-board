import { IMAGE_BOX } from 'common/constants';
import React, { useState, useRef } from 'react';
import styles from './image_box.module.css';

const ImageBox = ({ img, onImageClick }) => {
    const imgRef = useRef();
    const [itemType, setItemType] = useState(IMAGE_BOX);
    const { id, x, y, fileUrl } = img;
    return (
        <div
            ref={imgRef}
            className={styles.imgWrapper}
            style={{
                top: y,
                left: x,
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
                    imgRef.current.style.cursor = 'auto';
                    imgRef.current.style.cursor = 'grab';
                    // 'url(images/back_hand_black_24dp.svg), auto';
                } else {
                    imgRef.current.style.cursor = 'auto';
                }
            }}
        >
            <img id={id} className={styles.img} src={fileUrl} alt="사진" />
        </div>
    );
};

export default ImageBox;
