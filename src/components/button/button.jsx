import styles from './button.module.css';

import React, { memo } from 'react';

const Button = memo(({ name, onClick }) => (
    <button className={styles.button} onClick={onClick}>
        {name}
    </button>
));

export default Button;
