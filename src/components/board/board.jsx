import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MessageBox from '../message_box/message_box';
import ImageBox from 'components/image_box/image_box';
import styles from './board.module.css';

const Board = ({ authService, database, imageUploader }) => {
    const dndZoneRef = useRef();
    const location = useLocation();
    const [userId, setUserId] = useState(location.state && location.state.id);
    const [messages, setMessages] = useState({});
    const [images, setImages] = useState({});
    // {
    //     // FIREBASE
    //     // userId/
    //     images: {
    //         id,
    //         x,
    //         y,
    //        fileURL
    //     }
    // }
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
        };
    }, [userId, authService, database]);

    // About drag and drop
    useEffect(() => {
        initDragEvents();
        return () => {
            removeDragEvents();
        };
    }, []);

    const initDragEvents = () => {
        dndZoneRef.current.addEventListener('dragenter', handleDragEnter);
        dndZoneRef.current.addEventListener('dragleave', handleDragLeave);
        dndZoneRef.current.addEventListener('dragover', handleDragOver);
        dndZoneRef.current.addEventListener('drop', handleDrop);
    };

    const removeDragEvents = () => {
        dndZoneRef.current.removeEventListener('dragenter', (e) => {});
        dndZoneRef.current.removeEventListener('dragleave', (e) => {});
        dndZoneRef.current.removeEventListener('dragover', (e) => {});
        dndZoneRef.current.removeEventListener('drop', (e) => {});
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadImage(e.dataTransfer.files[0], e.clientX, e.clientY);
    };

    const uploadImage = async (file, x, y) => {
        try {
            const uploaded = await imageUploader.upload(file);
            const id = Date.now();
            const rect = dndZoneRef.current.getBoundingClientRect();
            const img = {
                id,
                x: x - rect.left,
                y: y - rect.top,
                // TODO
                // using public ID
                fileUrl: uploaded.url
                    ? uploaded.url
                    : '불러올 수 없는 이미지입니다!',
            };
            setImages((images) => {
                const updated = { ...images };
                updated[id] = img;
                return updated;
            });
            database.saveImage(userId, img);
        } catch (e) {
            console.error(e);
        }
    };

    const handleBoardClick = (e) => {
        const id = Date.now();
        const rect = dndZoneRef.current.getBoundingClientRect();
        const message = {
            id,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            text: '',
        };
        setMessages((messages) => {
            const updated = { ...messages };
            updated[id] = message;
            return updated;
        });
        database.saveMessage(userId, message);
    };

    const handleMessageClick = useCallback((messageId) => {
        setMessages((messages) => {
            const updated = { ...messages };
            delete updated[messageId];
            return updated;
        });
        database.removeMessage(userId, messageId);
    });

    const handleMessageChange = useCallback((messageId, text) => {
        const changedMessage = { ...messages[messageId], text };
        setMessages((messages) => {
            const updated = { ...messages };
            updated[messageId] = changedMessage;
            return updated;
        });
        database.saveMessage(userId, changedMessage);
    });

    return (
        <div
            ref={dndZoneRef}
            className={styles.board}
            onClick={handleBoardClick}
        >
            {Object.keys(messages).map((key) => (
                <MessageBox
                    key={key}
                    message={messages[key]}
                    onMessageClick={handleMessageClick}
                    onMessageChange={handleMessageChange}
                />
            ))}
            {Object.keys(images).map((key) => (
                <ImageBox key={key} img={images[key]} />
            ))}
        </div>
    );
};

export default Board;
