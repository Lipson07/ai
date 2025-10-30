// MainPage.tsx
import React, { useState } from 'react';
import style from "../../Styles/MainPage.module.scss"
import CanvasAnimation from "../Animation/CanvasAnimation.tsx";
import LeftPanel from "./LeftPanel.tsx";
import VoiceAssist from './VoiceAssist.tsx';

function MainPage(props) {
    const [showVoiceAssist, setShowVoiceAssist] = useState(false);
    const [clickplus, setClickplus] = useState(false);

    return (<>
            <div className={style.main} >
                <main>
                    <LeftPanel/>
                    <div className={style.divinfo}>
                        <h1>Norta 1.2</h1>
                        <div className={style.divinput}>
                            <div 
                                className={`${style.glassCircle} ${style.leftCircle} ${clickplus ? style.expandedCircle : ''}`} 
                                onClick={() => {
                                    setClickplus(!clickplus)
                                }}
                            >
                                {
                                    clickplus ? (
                                        <div className={style.photoOptions}>
                                            <p>Добавить фото</p>
                                        </div>
                                    ) : (
                                        <div className={style.plusIcon}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 4V16M4 10H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                            </svg>
                                        </div>
                                    )
                                }
                            </div>

                            <input 
                                placeholder="Введите запрос..." 
                                className={clickplus ? style.expandedInput : ''}
                            />

                            <div 
                                className={`${style.glassCircle} ${style.rightCircle}`}
                                onClick={() => setShowVoiceAssist(true)}
                            >
                                <div className={style.plusIcon}>
                                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 21V1M13 18V4M19 16V6M1 16V6" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <CanvasAnimation/>
            </div>
            {showVoiceAssist && <VoiceAssist onClose={() => setShowVoiceAssist(false)} />}
        </>
    );
}

export default MainPage;