import React, { useState } from 'react'
import { motion } from "framer-motion"

export function Button(props){ 

    const [style, setStyle] = useState(props.icon);

    const OnTap = () => {
        console.log(style);
        props.onClick();
        setStyle(props.onTapColor);
    }

    return (<motion.button
        content='props.content'
        onClick={OnTap}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={style}
    >
        {props.icon}
    </motion.button>
    );
};