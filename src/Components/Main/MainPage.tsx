// MainPage.tsx
import React, { useRef, useState } from 'react';
import style from "../../Styles/MainPage.module.scss"
import CanvasAnimation from "../Animation/CanvasAnimation.tsx";
import LeftPanel from "./LeftPanel.tsx";
import VoiceAssist from './VoiceAssist.tsx';
import { ApiService } from '../ai/apiService.ts';
import TextDisplay from './TextDisplay.tsx';

function MainPage(props) {
    const [showVoiceAssist, setShowVoiceAssist] = useState(false);
    const [clickplus, setClickplus] = useState(false);
    const [valinp, setValinp] = useState('');
    const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
    const [isTextVisible, setIsTextVisible] = useState(false);
    
    const inp = useRef(null)
    const name = useRef(null)

    const handleSendMessage = async () => {
        if (!valinp.trim()) return;
        
        const userMessage = valinp;
        setValinp('');
        
        // Добавляем сообщение пользователя
        setMessages(prev => [...prev, {text: userMessage, isUser: true}]);
        setIsTextVisible(true);
        
        try {
            const response = await ApiService.sendMessage(userMessage);
            console.log('Ответ от API:', response);
            
            // Добавляем ответ нейронки
            if (response && response.text) {
                setMessages(prev => [...prev, {text: response.text, isUser: false}]);
            } else {
                setMessages(prev => [...prev, {text: 'Нет ответа от сервера', isUser: false}]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {text: 'Произошла ошибка при отправке запроса', isUser: false}]);
        }
    };
  
    const handleKeyPress = (e: React.KeyboardEvent) => {
        const inps = inp.current
        const names = name.current
        if (e.key === 'Enter') {
            handleSendMessage();
         
            if (inps) {
                inps.style.transition = "transform 0.5s ease, opacity 0.5s ease";
                inps.style.transform = "translateY(200px)";
                inps.style.opacity = "0.8";
            }
            
            if (names) {
                names.style.transition = "all 0.5s ease";
                names.style.position = "relative";
                names.style.width = "100%";
                names.style.height = "100%";
                names.style.display = "flex";
                names.style.transform = "translateY(-200px)";
                names.style.opacity = "0.8";
            }
        }
    };

    return (<>
            <div className={style.main}>
                <main>
                    <LeftPanel/>
                    <div className={style.divinfo}>
                        <h1 className={style.name} ref={name}>Norta 1.2</h1>
                        <div className={style.messagesContainer}>
                            {messages.map((message, index) => (
                                <TextDisplay 
                                    key={index} 
                                    text={message.text} 
                                    isVisible={true}
                                    isUser={message.isUser}
                                />
                            ))}
                        </div>
                        <div className={style.divinput} ref={inp}>
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
                                value={valinp}
                                onChange={(e) => setValinp(e.target.value)}
                                onKeyPress={handleKeyPress}
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