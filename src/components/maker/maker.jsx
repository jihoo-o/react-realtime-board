import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styles from './maker.module.css';

const Maker = ({ authService, database }) => {
    const location = useLocation();
    const [userId, setUserId] = useState(location.state && location.state.id);
    const navigate = useNavigate();

    const onBoardChange = (e) => {
        database //
            .writeData(userId, e.target.value);
    };

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

    return (
        <textarea
            id="board"
            cols="30"
            rows="10"
            onChange={onBoardChange}
        ></textarea>
    );
};

export default Maker;
