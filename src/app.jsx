import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import Header from './components/header/header';
import Login from './components/login/login';
import Board from './components/board/board';

function App({ authService, database }) {
    return (
        <div className={styles.appContainer}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <div className={styles.loginComponent}>
                                    <Login authService={authService} />
                                </div>
                            </>
                        }
                    />
                    <Route
                        path="/board"
                        element={
                            <>
                                <Header authService={authService} />
                                <Board
                                    authService={authService}
                                    database={database}
                                />
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
