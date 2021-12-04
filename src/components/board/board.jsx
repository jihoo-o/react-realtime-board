import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MessageBox from '../message_box/message_box';
import ImageBox from 'components/image_box/image_box';
import styles from './board.module.css';
import { itemTemplate } from 'common/template';
import { BOARD, IMAGE_BOX, MESSAGE_BOX } from 'common/constants';

const Board = ({ authService, database, imageUploader }) => {
    const dndZoneRef = useRef();
    const location = useLocation();
    const [itemType, setItemType] = useState(BOARD);
    const [currKey, setCurrKey] = useState(null);
    const [userId, setUserId] = useState(location.state && location.state.id);
    const [messages, setMessages] = useState({});
    const [images, setImages] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const stopSync = authService //
            .onAuthChange((user) => {
                if (!user) {
                    navigate('/');
                } else {
                    setUserId(user.uid);
                    database.getMessage(userId, (messages) => {
                        setMessages(messages);
                    });
                    database.getImages(userId, (images) => {
                        setImages(images);
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
         * Alt -> move clicked item    ---> expected
         * Meta -> delete clicked item
         * m -> create MessageBox
         * i -> create ImageBox
         * d -> create DrawingBox ---> expected
         * w -> create WebcamBox ---> expected
         * v -> create VideoBox ---> expected
         * g -> create GameBox ---> expected
         */
        if (currKey === 'm') {
            addMessageBox(clickEvent.clientX, clickEvent.clientY);
        } else if (currKey === 'i') {
            addImageBox();
        } else if (currKey === 'Meta') {
            if (itemType === MESSAGE_BOX) {
                removeMessageBox(clickEvent.target.id);
            }
            if (itemType === IMAGE_BOX) {
                removeImageBox(clickEvent.target.id);
            }
        }
    });

    /**
     * MessageBox
     * ⬇️
     */

    const addMessageBox = (x, y) => {
        const id = Date.now();
        const rect = dndZoneRef.current.getBoundingClientRect();
        const template = { ...itemTemplate[itemType] };
        template.id = id;
        template.x = x - rect.left;
        template.y = y - rect.top;
        template.text = '';
        setMessages((messages) => {
            const updated = { ...messages };
            updated[id] = template;
            return updated;
        });
        database.saveMessage(userId, template);
    };

    const removeMessageBox = useCallback((messageId) => {
        setMessages((messages) => {
            const updated = { ...messages };
            delete updated[messageId];
            return updated;
        });
        database.removeMessage(userId, messageId);
    });

    const updateMessageBox = useCallback((messageId, text, deltaX, deltaY) => {
        const x = messages[messageId].x + deltaX;
        const y = messages[messageId].y + deltaY;
        const changedMessage = (deltaX || deltaY) ? { ...messages[messageId], x, y } : { ...messages[messageId], text };
        // const changedMessage = text
        //     ? { ...messages[messageId], text }
        //     : { ...messages[messageId], x, y };
        setMessages((messages) => {
            const updated = { ...messages };
            updated[messageId] = changedMessage;
            return updated;
        });
        database.saveMessage(userId, changedMessage);
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
            const template = { ...itemTemplate[itemType] };
            template.id = id;
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
            database.saveImage(userId, template);
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
        database.removeImage(userId, imageId);
    };

    return (
        <div
            ref={dndZoneRef}
            className={styles.board}
            onClick={(e) => handleBoardClick(e, itemType)}
        >
            {/* 
            /**
             * TODO
             * All draggable item has <Draggable>
             * Why not use DraggableItem wrapper.
             * 
             */}
            {Object.keys(messages).map((key) => (
                <MessageBox
                    key={key}
                    currKey={currKey} //
                    message={messages[key]}
                    // handleMessageClick -> handleBoardClick
                    // onMessageClick={handleMessageClick}
                    onMessageClick={handleBoardClick}
                    onMessageChange={updateMessageBox}
                />
            ))}
            {Object.keys(images).map((key) => (
                <ImageBox
                    key={key}
                    img={images[key]}
                    onImageClick={handleBoardClick}
                />
            ))}
        </div>
    );
};

export default Board;
