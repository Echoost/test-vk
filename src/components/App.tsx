import React, { useState } from 'react';
import classes from './App.module.scss';
export const App = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(prevCount => prevCount + 1);
    };
    return (
        <>
            <div>{count}</div>
            <button className={classes.button} onClick={handleClick}>
                Click
            </button>
        </>
    );
};
