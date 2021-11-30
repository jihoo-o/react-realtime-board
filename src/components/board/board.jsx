import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MessageBox from '../messageBox/messageBox';
import styles from './board.module.css';

const Board = ({ authService, database }) => {
    const location = useLocation();
    const [userId, setUserId] = useState(location.state && location.state.id);
    const [messages, setMessages] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        authService //
            .onAuthChange((user) => {
                if (!user) {
                    navigate('/');
                } else {
                    setUserId(user.uid);
                    database.getMessage(userId, (messages) => {
                        setMessages(messages);
                    });
                }
            });
    }, [userId, authService, database]);

    const handleBoardClick = (e) => {
        const id = Date.now();
        // TODO
        // fix the way getting rect whenever the board clicked
        const rect = e.target.getBoundingClientRect();
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
        <div className={styles.board} onClick={handleBoardClick}>
            {console.log(messages)}
            {Object.keys(messages).map((key) => (
                <MessageBox
                    key={key}
                    message={messages[key]}
                    onMessageClick={handleMessageClick}
                    onMessageChange={handleMessageChange}
                />
            ))}
        </div>
    );
};

export default Board;
