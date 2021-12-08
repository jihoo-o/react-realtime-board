import { gameLinks } from 'common/constants';
import GameOptions from 'components/game_options/game_options';
import React from 'react';
import { useState } from 'react/cjs/react.development';
import styles from './game_box.module.css';

const GameBox = ({ pressedKey, game, onGameChange }) => {
    /**
     * press g + click board => onBoardClick => render grey box that has clicked position on the board
     *  => render modal to allow the user to select a specific game, and update game state on it. => render <ifram> with src of the game state
     */

    return (
        <>
            {game.game ? (
                <div className={styles.gameBoxWrapper}>
                    <iframe
                        className={styles.gameBox}
                        src={gameLinks[game.game]}
                    ></iframe>
                </div>
            ) : (
                <GameOptions
                    getSelectedGame={(selectedGame) => {
                        onGameChange(game.id, selectedGame);
                    }}
                />
            )}
        </>
    );
};

export default GameBox;
