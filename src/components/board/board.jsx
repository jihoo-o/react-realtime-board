import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MessageBox from '../messageBox/messageBox';
import styles from './board.module.css';

const Board = ({ authService, database }) => {
    const location = useLocation();
    const [userId, setUserId] = useState(location.state && location.state.id);
    const [message, setMessage] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        authService //
            .onAuthChange((user) => {
                if (!user) {
                    navigate('/');
                } else {
                    setUserId(user.uid);
                }
            });
    }, [authService]);

    // const onBoardChange = (e) => {
    //     database //
    //         .writeData(userId, e.target.value);
    // };

    const onBoardClick = (e) => {
        const id = Date.now();
        // TODO
        // fix the way getting rect whenever the board clicked
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMessage((message) => {
            const updated = { ...message };
            updated[id] = {
                id,
                x,
                y,
                text: null,
            };
            return updated;
        });
    };

    return (
        <div className={styles.board} onClick={onBoardClick}>
            {Object.keys(message).map((key) => (
                <MessageBox key={key} message={message[key]} />
            ))}
        </div>
    );
};

export default Board;
