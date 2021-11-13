import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ FileInput, authService }) => {
    const [cards, setCards] = useState({
        1: {
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
    });
    // const [cards, setCards] = useState([
    //     {
    //         id: '1',
    //         name: 'Liz',
    //         company: 'toss',
    //         theme: 'Dark',
    //         title: 'Software Enginner',
    //         email: 'liza@gmail.com',
    //         message: 'hi',
    //         fileName: 'alalal',
    //         fileUrl: null,
    //     },
    //     {
    //         id: '2',
    //         name: 'Liz2',
    //         company: 'toss',
    //         theme: 'Light',
    //         title: 'Software Enginner',
    //         email: 'liza@gmail.com',
    //         message: 'hi',
    //         fileName: 'alalal',
    //         fileUrl: 'liz.png',
    //     },
    //     {
    //         id: '3',
    //         name: 'Liz3',
    //         company: 'toss',
    //         theme: 'Colorful',
    //         title: 'Software Enginner',
    //         email: 'liza@gmail.com',
    //         message: 'hi',
    //         fileName: 'alalal',
    //         fileUrl: null,
    //     },
    // ]);
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

    const createOrUpdateCard = (card) => {
        setCards((cards) => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });
    };

    const deleteCard = (card) => {
        setCards((cards) => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor
                    FileInput={FileInput}
                    cards={cards}
                    addCard={createOrUpdateCard}
                    updateCard={createOrUpdateCard}
                    deleteCard={deleteCard}
                />
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
    );
};

export default Maker;
