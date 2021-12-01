import React from 'react';
import styles from './image_box.module.css';

const ImageBox = ({ img }) => {
    const { id, x, y, fileUrl } = img;
    return (
        <div
            className={styles.imgWrapper}
            style={{
                top: y,
                left: x,
            }}
        >
            <img className={styles.img} src={fileUrl} />
        </div>
    );
};

export default ImageBox;
