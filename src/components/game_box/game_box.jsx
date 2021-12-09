import { gameLinks } from 'common/constants';
import GameOptions from 'components/game_options/game_options';
import React from 'react';
import { useRef } from 'react/cjs/react.development';
import styles from './game_box.module.css';

const GameBox = ({ userId, pressedKey, game, onGameChange }) => {
    const iframeRef = useRef();
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
            ) : userId === game.userId ? (
                <GameOptions
                    getSelectedGame={(selectedGame) => {
                        onGameChange(game.id, selectedGame);
                    }}
                />
            ) : (
                <span>loadinig game...</span> // ---> expected
            )}
        </>
    );
};

export default GameBox;
