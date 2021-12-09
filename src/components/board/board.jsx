import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MessageBox from '../message_box/message_box';
import ImageBox from 'components/image_box/image_box';
import styles from './board.module.css';
import { itemTemplate } from 'common/template';
import {
    BOARD,
    GAME_BOX,
    IMAGE_BOX,
    MESSAGE_BOX,
    WEBCAM_BOX,
} from 'common/constants';
import WebcamBox from 'components/webcam_box/webcam_box';
import GameBox from 'components/game_box/game_box';
import BoxWrapper from 'components/box_wrapper/box_wrapper';

const Board = ({ authService, database, imageUploader }) => {
    const dndZoneRef = useRef();
    const location = useLocation();
    const [itemType, setItemType] = useState(BOARD);
    const [currKey, setCurrKey] = useState(null);
    const [userId, setUserId] = useState(location.state && location.state.id);
    const [messages, setMessages] = useState({});
    const [images, setImages] = useState({});
    const [webcam, setWebcam] = useState({});
    const [games, setGames] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const stopSync = authService //
            .onAuthChange((user) => {
                if (!user) {
                    navigate('/');
                } else {
                    setUserId(user.uid);
                    database.getMessage((messages) => {
                        setMessages((satate) => messages);
                    });
                    database.getImages((images) => {
                        setImages((state) => images);
                    });
                    database.getWebcam((webcam) => {
                        setWebcam((state) => webcam);
                    });
                    database.getGames((game) => {
                        setGames((state) => game);
                    });
                }
            });
        return () => {
            stopSync();
            // setMessages({});
            // setImages({});
        };
    }, [userId, authService, database, navigate]);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        addImageBox(e.dataTransfer.files[0], e.clientX, e.clientY);
    }, []);

    const setEventListeners = useCallback(() => {
        // BUG
        // sometimes dndZoneRef undefined
        dndZoneRef.current.addEventListener('dragenter', handleDragEnter);
        dndZoneRef.current.addEventListener('dragleave', handleDragLeave);
        dndZoneRef.current.addEventListener('dragover', handleDragOver);
        dndZoneRef.current.addEventListener('drop', handleDrop);

        window.addEventListener('keydown', changeCurrKey);
        window.addEventListener('keyup', changeCurrKey);
    }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

    const removeEventListeners = useCallback(() => {
        dndZoneRef.current.removeEventListener('dragenter', handleDragEnter);
        dndZoneRef.current.removeEventListener('dragleave', handleDragLeave);
        dndZoneRef.current.removeEventListener('dragover', handleDragOver);
        dndZoneRef.current.removeEventListener('drop', handleDrop);

        window.addEventListener('keydown', changeCurrKey);
        window.addEventListener('keyup', changeCurrKey);
    }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

    // Handle drag and drop
    useEffect(() => {
        setEventListeners();
        return () => {
            // removeEventListeners();
        };
    }, [setEventListeners, removeEventListeners]);

    const changeCurrKey = (e) => {
        if (e.type === 'keydown') {
            console.log(e.key);
            setCurrKey(e.key);
        }
        if (e.type === 'keyup') {
            setCurrKey(null);
        }
    };

    /**
     * Event Delegation on Board
     * ⬇️
     */

    /**
     * @param clickEvent - Used to get coordinates. Don't use it for type checking.
     * @param itemType - Used to check item type when deleting it.
     */
    const handleBoardClick = useCallback((clickEvent, itemType) => {
        if (!itemType) return;

        /**
         * @currKey
         * Alt -> move clicked item
         * Meta -> delete clicked item
         * m -> create MessageBox
         * i -> create ImageBox
         * d -> create DrawingBox
         * w -> create WebcamBox
         * v -> create VideoBox ---> expected
         * g -> create GameBox
         */

        /**
         * BUG
         * If the keyboard language is not English,
         * The code below is ignored
         */
        switch (currKey) {
            case 'm':
                addMessageBox(clickEvent.clientX, clickEvent.clientY);
                break;
            case 'i':
                addImageBox(); // ---> expected: uploading a picture using a widget
                break;
            case 'w':
                addWebcamBox(clickEvent.clientX, clickEvent.clientY);
                break;
            case 'g':
                addGameBox(clickEvent.clientX, clickEvent.clientY);
                break;
            case 'Meta':
                if (itemType === MESSAGE_BOX) {
                    removeMessageBox(clickEvent.target.id);
                }
                if (itemType === IMAGE_BOX) {
                    removeImageBox(clickEvent.target.id);
                }
                if (itemType === WEBCAM_BOX) {
                    removeWebcamBox(clickEvent.target.id);
                }
                break;
        }
    });

    /**
     * MessageBox
     * ⬇️
     */

    const addMessageBox = (x, y) => {
        const id = Date.now();
        const rect = dndZoneRef.current.getBoundingClientRect();
        const template = { ...itemTemplate[MESSAGE_BOX] };
        template.id = id;
        template.userId = userId;
        template.x = x - rect.left;
        template.y = y - rect.top;
        template.text = '';
        setMessages((messages) => {
            const updated = { ...messages };
            updated[id] = template;
            return updated;
        });
        database.saveMessage(template);
    };

    const removeMessageBox = useCallback((messageId) => {
        setMessages((messages) => {
            const updated = { ...messages };
            delete updated[messageId];
            return updated;
        });
        database.removeMessage(messageId);
    });

    const updateMessageBox = useCallback((messageId, text, deltaX, deltaY) => {
        const x = messages[messageId].x + deltaX;
        const y = messages[messageId].y + deltaY;
        const changedMessage =
            deltaX || deltaY
                ? { ...messages[messageId], x, y }
                : { ...messages[messageId], text };
        setMessages((messages) => {
            const updated = { ...messages };
            updated[messageId] = changedMessage;
            return updated;
        });
        database.saveMessage(changedMessage);
    });

    /**
     * ImageBox
     * ⬇️
     */

    const addImageBox = async (file, x, y) => {
        try {
            // TODO
            // !file, show image upload widget
            if (!file) return;
            const uploaded = await imageUploader.upload(file);
            const id = Date.now();
            const rect = dndZoneRef.current.getBoundingClientRect();
            const template = { ...itemTemplate[IMAGE_BOX] };
            template.id = id;
            template.userId = userId;
            template.x = x - rect.left;
            template.y = y - rect.top;
            template.fileUrl = uploaded.url
                ? uploaded.url
                : '불러올 수 없는 이미지입니다!';
            setImages((images) => {
                const updated = { ...images };
                updated[id] = template;
                return updated;
            });
            database.saveImage(template);
        } catch (e) {
            console.error(e);
        }
    };

    const removeImageBox = (imageId) => {
        setImages((images) => {
            const updated = { ...images };
            delete updated[imageId];
            return updated;
        });
        database.removeImage(imageId);
    };

    const updateImageBox = (imageId, deltaX, deltaY) => {
        const x = images[imageId].x + deltaX;
        const y = images[imageId].y + deltaY;
        const updatedImage = { ...images[imageId], x, y };
        setImages((images) => {
            const updated = { ...images };
            updated[imageId] = updatedImage;
            return updated;
        });
        database.saveImage(updatedImage);
    };

    /**
     * WebcamBox
     * ⬇️
     */
    const addWebcamBox = (x, y) => {
        if (Object.keys(webcam).length > 0) {
            window.alert('웹캠은 한 개만 소유할 수 있습니다!');
            return;
        }
        const id = Date.now();
        const rect = dndZoneRef.current.getBoundingClientRect();
        const template = { ...itemTemplate[WEBCAM_BOX] };
        template.id = id;
        template.userId = userId;
        template.x = x - rect.left;
        template.y = y - rect.top;
        setWebcam((webcam) => {
            const updated = { ...webcam };
            updated[id] = template;
            return updated;
        });
        database.saveWebcam(template);
    };

    const removeWebcamBox = (webcamId) => {
        setWebcam((webcam) => {
            const updated = { ...webcam };
            delete updated[webcamId];
            return updated;
        });
        database.removeWebcam(webcamId);
    };

    const updateWebcam = (webcamId, deltaX, deltaY, playing) => {
        let updatedWebcam;
        if (deltaX || deltaY) {
            const x = webcam[webcamId].x + deltaX;
            const y = webcam[webcamId].y + deltaY;
            updatedWebcam = { ...webcam[webcamId], x, y };
        } else {
            updatedWebcam = { ...webcam[webcamId], playing };
        }
        setWebcam((webcam) => {
            const updated = { ...webcam };
            updated[webcamId] = updatedWebcam;
            return updated;
        });
        database.saveWebcam(updatedWebcam);
    };

    /**
     * GameBox
     * ⬇️
     */
    const addGameBox = () => {
        /**
         * TODO
         * show loading spinner until game is selected
         */

        /**
         * BUG
         * window.alert will ignore keyup event.
         * After closing the alert, click the board again, It appears that the pressed key is still active.
         */
        if (Object.keys(games).length > 0) {
            window.alert('하나의 게임만 실행할 수 있습니다!'); // ----> expected to allow more games
            return;
        }
        // const rect = dndZoneRef.current.getBoundingClientRect();
        const id = Date.now();
        const template = { ...itemTemplate[GAME_BOX] };
        template.id = id;
        template.userId = userId;
        // template.x = x - rect.left;
        // template.y = y - rect.top;
        setGames((games) => {
            const updated = { ...games };
            updated[id] = template;
            return updated;
        });
        database.saveGame(template);
    };

    const updateGame = (gameId, selectedGame) => {
        if (!selectedGame) {
            removeGame(gameId);
            return;
        }
        const game = selectedGame;
        const updatedGame = { ...games[gameId], game };
        setGames((games) => {
            const updated = { ...games };
            updated[gameId] = updatedGame;
            return updated;
        });
        database.saveGame(updatedGame);
    };

    const removeGame = (gameId) => {
        setGames((games) => {
            const updated = { ...games };
            delete updated[gameId];
            return updated;
        });
        database.removeGame(gameId);
    };

    return (
        <div
            ref={dndZoneRef}
            className={styles.board}
            onClick={(e) => handleBoardClick(e, itemType)}
        >
            {/**
             * TODO
             * All draggable items have <Draggable>
             * Why not use DraggableItem wrapper.
             *
             */}
            {Object.keys(messages).map((key) => (
                <MessageBox
                    key={key}
                    pressedKey={currKey}
                    message={messages[key]}
                    onMessageClick={handleBoardClick}
                    onMessageChange={updateMessageBox}
                />
            ))}
            {Object.keys(images).map((key) => (
                <ImageBox
                    key={key}
                    pressedKey={currKey}
                    img={images[key]}
                    onImageClick={handleBoardClick}
                    onImageChange={updateImageBox}
                />
            ))}
            {Object.keys(webcam).map((key) => (
                <WebcamBox
                    key={key}
                    pressedKey={currKey}
                    userId={userId}
                    webcam={webcam[key]}
                    onWebcamClick={handleBoardClick}
                    onWebcamChange={updateWebcam}
                />
            ))}
            {Object.keys(games).map((key) => (
                <GameBox
                    key={key}
                    userId={userId}
                    pressedKey={currKey}
                    game={games[key]}
                    onGameChange={updateGame}
                />
            ))}
            {
                <BoxWrapper
                    pressedKey={currKey}
                    updatePosition={updateMessageBox}
                >
                    <div
                        id="helsinki"
                        style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: 'red',
                        }}
                    >
                        tmp
                    </div>
                </BoxWrapper>
            }
        </div>
    );
};

export default Board;
