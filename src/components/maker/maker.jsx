import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
    const navigate = useNavigate();

    useEffect(() => {
        authService //
            .onAuthChange((user) => {
                if (user) {
                    const uid = user.uid;
                } else {
                    navigate('/');
                }
            });
    }, [authService]);

    return <h1>hi</h1>;
};

export default Maker;
