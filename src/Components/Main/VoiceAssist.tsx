// VoiceAssist.tsx
import React, { useState } from 'react'
import style from "../../Styles/VoiceAssist.module.scss"
import {
    krest,
    micro
} from "../../assets/Voice/index.js"

interface VoiceAssistProps {
    onClose: () => void;
}

function VoiceAssist({ onClose }: VoiceAssistProps) {
    return (
        <div className={style.main}>
            <div className={style.krug}>
                <div 
                    className={`${style.colorSegment} ${style.color1}`}
                    style={{ '--start-rotate': '0deg' } as React.CSSProperties}
                ></div>
                <div 
                    className={`${style.colorSegment} ${style.color2}`}
                    style={{ '--start-rotate': '120deg' } as React.CSSProperties}
                ></div>
                <div 
                    className={`${style.colorSegment} ${style.color3}`}
                    style={{ '--start-rotate': '240deg' } as React.CSSProperties}
                ></div>
            </div>
            <div className={style.buttondiv}>
                <div onClick={onClose}>
                    <img src={krest}/>
                </div>
                <div>
                    <img src={micro}/>
                </div>
            </div>
        </div>
    )
}

export default VoiceAssist