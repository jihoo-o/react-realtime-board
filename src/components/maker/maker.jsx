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
            theme: 'Dark',
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
            theme: 'Light',
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
            theme: 'Colorful',
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

    const addCard = (card) => {
        console.log(card);
        const updated = [...cards, card];
        setCards(updated);
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor cards={cards} addCard={addCard} />
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
    );
};

export default Maker;
