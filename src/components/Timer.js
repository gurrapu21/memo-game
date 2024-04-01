import React, { useState, useEffect } from 'react';

function Timer(props) {
    const [seconds, setSeconds] = useState(props.time);

    useEffect(() => {
        setSeconds(props.time);
    }, [props.time]);
    
    useEffect(() => {
        let interval = null;
        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (seconds === 0 && interval) {
            clearInterval(interval);
        }
        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, [seconds]); // Add seconds as a dependency

    return (
        <>{seconds}</>
    );
}

export default Timer;
