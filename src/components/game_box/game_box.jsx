import { gameLinks } from 'common/constants';
import GameOptions from 'components/game_options/game_options';
import React, { useEffect, useState, useRef } from 'react';
import styles from './game_box.module.css';

const GameBox = ({ userId, pressedKey, game, onGameChange }) => {
    const iframeRef = useRef();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (!game.game && userId === game.userId) {
            setModal(true);
        }
    }, [game.id]);

    /**
     * TODO
     * responsive
     */

    return (
        <>
            {game.game ? (
                <iframe
                    ref={iframeRef}
                    className={styles.gameBox}
                    src={gameLinks[game.game]}
                    // sandbox=""
                ></iframe>
            ) : modal ? (
                <GameOptions
                    getSelectedGame={(selectedGame) => {
                        onGameChange(game.id, selectedGame);
                        setModal(false);
                    }}
                />
            ) : (
                <span>loadinig game...</span> // ---> expected
            )}
        </>
    );
};

export default GameBox;
