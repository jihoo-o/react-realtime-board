import React from 'react';
import styles from './webcam_controller.module.css';

const WebcamController = ({ camOn, mouseEnter, changeCamState }) => (
    <div
        className={`${styles.webcamController} ${
            mouseEnter
                ? styles.showWebcamController
                : styles.hideWebcamController
        }`}
    >
        <label className={styles.switch}>
            <input
                type="checkbox"
                onClick={() => {
                    if (camOn === true) {
                        changeCamState(false);
                    } else {
                        changeCamState(true);
                    }
                }}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    </div>
);

export default WebcamController;
