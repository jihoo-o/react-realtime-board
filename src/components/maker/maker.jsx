import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ FileInput, authService, cardRepository }) => {
    const historyState = useHistory().state;
    const [cards, setCards] = useState({
        // 1: {
        //     id: '1',
        //     name: 'Liz',
        //     company: 'toss',
        //     theme: 'Dark',
        //     title: 'Software Enginner',
        //     email: 'liza@gmail.com',
        //     message: 'hi',
        //     fileName: 'alalal',
        //     fileUrl: null,
        // },
    });
    const [userId, setUserId] = useState(historyState && historyState.id);

    const history = useHistory();

    const onLogout = () => {
        authService //
            .logout() //
            .then(() => {
                history.push('/');
            });
    };

    // firebase sync 관련
    useEffect(() => {
        if (!userId) {
            return;
        }
        const stopSync = cardRepository.syncCards(userId, (cards) => {
            setCards(cards);
        });
        return () => {
            stopSync();
        };
    }, [userId]);

    // 로그인 관련
    useEffect(() => {
        authService.onAuthChange((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
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
        cardRepository.saveCard(userId, card);
    };

    const deleteCard = (card) => {
        setCards((cards) => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
        cardRepository.removeCard(userId, card);
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
