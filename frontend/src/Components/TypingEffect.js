import React, { useState, useEffect } from 'react';


const TypingEffect = ({ words,styles }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [blink, setBlink] = useState(true);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink((prev) => !prev);
        }, 700);
        return () => clearTimeout(timeout2);
    }, [blink]);

    useEffect(() => {

        if (
            subIndex === words[index].length + 1 &&
            !reverse
        ) {
            setTimeout(() => {
                setReverse(true);
                return;
            }, 3000);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }
        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, 100);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse]);
    return <span style={{...styles,textAlign: 'center'}}>
        {`${words[index].substring(0, subIndex)}${blink ? "|" : ""}`}
    </span>;
};

export default TypingEffect;
