import React, {useEffect, useState} from 'react';
import frames from "../../assets/Animation/index.js";
import style from "../../Styles/CanvasAnimation.module.scss";

function CanvasAnimation(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % frames.length);
            setNextIndex(prev => (prev + 1) % frames.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={style.main} style={{position: 'relative'}}>
            {frames.map((frame, index) => {
                let opacity = 0;

                if (index === currentIndex) {
                    opacity = 1;
                }

                else if (index === nextIndex) {
                    opacity = 1;
                }

                return (
                    <img
                        key={index}
                        src={frame}
                        style={{
                            opacity: opacity,
                            transition: 'opacity 1.5s ease-in-out',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                        alt={`Animation frame ${index}`}
                    />
                );
            })}
        </div>
    );
}

export default CanvasAnimation;