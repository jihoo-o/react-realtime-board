import React from 'react';
import styles from './game_options.module.css';
import imgRummikub from '../../images/rummikub.png';
import imgDrawnGuess from '../../images/drawnguess.png';
import imgShellShockers from '../../images/shellshockers.png';
import GameLinks, {
    DRAWANDGUESS,
    RUMMIKUB,
    SHELLSHOCKERS,
} from '../../common/constants.js';

/**
 * TODO
 * Close it without selecting one
 */

const GameOptions = ({ getSelectedGame }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.dialog}>
                <ul className={styles.options}>
                    <li className={styles.game}>
                        <span className={styles.gameTitle}>Rummikub</span>
                        <img
                            id={RUMMIKUB}
                            className={styles.gameImg}
                            src={imgRummikub}
                            alt=""
                            onClick={(e) => {
                                getSelectedGame(e.target.id);
                            }}
                        />
                    </li>
                    <li className={styles.game}>
                        <span className={styles.gameTitle}>
                            Drawing&Guessing
                        </span>
                        <img
                            id={DRAWANDGUESS}
                            className={styles.gameImg}
                            src={imgDrawnGuess}
                            alt=""
                            onClick={(e) => {
                                getSelectedGame(e.target.id);
                            }}
                        />
                    </li>
                    <li className={styles.game}>
                        <span className={styles.gameTitle}>Shell Shockers</span>
                        <img
                            id={SHELLSHOCKERS}
                            className={styles.gameImg}
                            src={imgShellShockers}
                            alt=""
                            onClick={(e) => {
                                getSelectedGame(e.target.id);
                            }}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default GameOptions;
