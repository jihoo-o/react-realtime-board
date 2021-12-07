import { WEBCAM_BOX } from 'common/constants';
import WebcamController from 'components/webcam_controller/webcam_controller';
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import Webcam from 'react-webcam';
import styles from './webcam_box.module.css';

const cursorStyle = {
    Meta: styles.meta,
    Alt: styles.alt,
};

const WebcamBox = ({
    pressedKey,
    userId,
    webcam,
    onWebcamClick,
    onWebcamChange,
}) => {
    const [itemType, setItemType] = useState(WEBCAM_BOX);
    const [mouseEnter, setMouseEnter] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [camOn, setCamOn] = useState(false);

    useEffect(() => {
        handleWebcamChange(false);
    }, []);

    const handleWebcamChange = (isPlaying) => {
        setCamOn(isPlaying);
        onWebcamChange(webcam.id, null, null, isPlaying);
    };

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
                onWebcamChange(webcam.id, data.x, data.y);
            }}
        >
            <div
                className={`${styles.webcamAbsolute} ${
                    mouseEnter && pressedKey
                        ? dragging
                            ? styles.dragging
                            : cursorStyle[pressedKey]
                        : styles.autoCursor
                }`}
                style={{
                    top: webcam.y,
                    left: webcam.x,
                }}
                onClick={(e) => {
                    itemType && onWebcamClick(e, itemType);
                }}
                onMouseEnter={() => {
                    setMouseEnter(true);
                }}
                onMouseLeave={() => {
                    setMouseEnter(false);
                }}
            >
                <div className={styles.webcamRelative}>
                    {/**
                     * WebcamControler appears when mouse over && user own.
                     */}
                    {userId === webcam.userId && (
                        <WebcamController
                            camOn={camOn}
                            mouseEnter={mouseEnter}
                            changeCamState={handleWebcamChange}
                        />
                    )}
                    {webcam.playing && (
                        <Webcam
                            id={webcam.id}
                            className={styles.webcam}
                            mirrored={true}
                            screenshotQuality={1}
                            /**
                             * Set audio true only when the earphone is connected.
                             */
                            audio={false}
                            // audioConstraints={}
                            videoConstraints={{
                                width: 200,
                                height: 200,
                                // facingMode: "user" // front camera on mobile
                            }}
                        />
                    )}
                </div>
            </div>
        </Draggable>
    );
};

export default WebcamBox;
