import React from 'react';
import styles from './webcam_controller.module.css';

const WebcamController = ({ mouseEnter }) => (
    <div
        className={`${styles.webcamController} ${
            mouseEnter
                ? styles.showWebcamController
                : styles.hideWebcamController
        }`}
    >
        {/* 
        /**
         * on/off toggle
        */}
        <label className={styles.switch}>
            <input type="checkbox" />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    </div>
);

export default WebcamController;
