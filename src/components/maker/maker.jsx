import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {
    const [cards, setCards] = useState([
        {
            id: '1',
            name: 'Liz',
            company: 'toss',
            theme: 'dark',
            title: 'Software Enginner',
            email: 'liza@gmail.com',
            message: 'hi',
            fileName: 'alalal',
            fileUrl: null,
        },
        {
            id: '2',
            name: 'Liz2',
            company: 'toss',
            theme: 'light',
            title: 'Software Enginner',
            email: 'liza@gmail.com',
            message: 'hi',
            fileName: 'alalal',
            fileUrl: 'liz.png',
        },
        {
            id: '3',
            name: 'Liz3',
            company: 'toss',
            theme: 'colorful',
            title: 'Software Enginner',
            email: 'liza@gmail.com',
            message: 'hi',
            fileName: 'alalal',
            fileUrl: null,
        },
    ]);
    const history = useHistory();

    const onLogout = () => {
        authService //
            .logout() //
            .then(() => {
                history.push('/');
            });
    };

    useEffect(() => {
        authService.onAuthChange((user) => {
            if (!user) {
                history.push('/');
            }
        });
    });
    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor cards={cards} />
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
    );
};

export default Maker;
