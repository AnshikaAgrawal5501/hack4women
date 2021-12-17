import React from 'react';
import Typewriter from 'typewriter-effect';

const TypeWriterEffect = () => {

    return (
        <Typewriter
            options={{
                strings: ['Femaissance', 'Redefining motherhood!'],
                autoStart: true,
                loop: true,
            }}
        />
    );
};

export default TypeWriterEffect;