// TextDisplay.tsx
import React, { useState, useEffect } from 'react';
import style from "../../Styles/TextDisplay.module.scss";

interface TextDisplayProps {
    text: string;
    isVisible: boolean;
    isUser?: boolean;
}

function TextDisplay({ text, isVisible, isUser = false }: TextDisplayProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (isVisible && text) {
            setDisplayText('');
            setCurrentIndex(0);
            setIsTyping(true);
        } else {
            setDisplayText('');
            setCurrentIndex(0);
            setIsTyping(false);
        }
    }, [text, isVisible]);

    useEffect(() => {
        if (isTyping && currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, isUser ? 0 : 50); // Сообщения пользователя показываются сразу

            return () => clearTimeout(timer);
        } else if (currentIndex >= text.length) {
            setIsTyping(false);
        }
    }, [currentIndex, isTyping, text, isUser]);

    if (!isVisible || !text) {
        return null;
    }

    return (
        <div className={`${style.textDisplay} ${isUser ? style.userMessage : style.aiMessage}`}>
            <div className={style.textContent}>
                {displayText}
                {isTyping && !isUser && <span className={style.cursor}>|</span>}
            </div>
        </div>
    );
}

export default TextDisplay;