import React, {useState} from 'react';
import style from "../../Styles/LeftPanel.module.scss"
import  {icon} from "../../assets/LeftPanel/index.js"
import Profilepanel from "./Profilepanel.tsx";

function LeftPanel(props) {
    const chat:string[] =["Придумай текс для сдачи курсовой",'Сгенерируй промт для видеохостинга','Что такое скибиди']
    return (
        <div className={style.main}>
            <div className={style.nav}>
                <div className={style.upicon}>
                    <img src={icon} alt="ss"/>
                    <div className={`${style.glassicon} ${style.specialGlassicon}`}>

                        <svg  className={style.glassimg} width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.78516 3.5V10.5M15.2852 4V10C15.2852 11.6569 13.942 13 12.2852 13H4.28516C2.6283 13 1.28516 11.6569 1.28516 10V4C1.28516 2.34315 2.6283 1 4.28516 1H12.2852C13.942 1 15.2852 2.34315 15.2852 4Z" stroke="white" stroke-width="1.6" stroke-linecap="round"/>
                        </svg>

                    </div>
                </div>
                <div className={style.function}>
                    <div>
                        <div className={`${style.glassicon} ${style.specialGlassiconSides}`}>

                            <svg  className={style.glassimg1} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.82759 1.5H4C2.34315 1.5 1 2.84315 1 4.5V10.5C1 12.1569 2.34315 13.5 4 13.5H9.58621C11.2431 13.5 12.5862 12.1569 12.5862 10.5V8.5M14.7159 2.32288C14.3949 0.993202 12.8134 0.431902 11.726 1.26175L4.90493 6.46729C4.87686 6.48872 4.85496 6.51719 4.84146 6.54981L3.47099 9.86176C3.44375 9.9276 3.49214 10 3.5634 10H6.7235C6.76857 10 6.81233 9.98477 6.84767 9.95678L14.0507 4.25183C14.6295 3.79346 14.8891 3.04054 14.7159 2.32288Z" stroke="white" stroke-width="1.6" stroke-linecap="round"/>
                            </svg>

                        </div>
                        <h1>Новый чат</h1>
                    </div>
                    <div>
                        <div className={`${style.glassicon} ${style.specialGlassiconSides}`}>
                            <svg className={style.glassimg1} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 15.5L10.572 10.9308M10.572 10.9308C8.43945 13.3514 4.58657 13.3514 2.45402 10.9308C0.515328 8.73024 0.515328 5.51603 2.45402 3.31546C4.58657 0.894846 8.43945 0.894846 10.572 3.31546C12.5107 5.51603 12.5107 8.73024 10.572 10.9308Z" stroke="white" stroke-width="1.6" stroke-linecap="round"/>
                            </svg>

                        </div>
                        <h1>Поиск</h1>
                    </div>
                </div>
                <div className={style.chats}>
                    <h1>Чаты</h1>
                    <div >
                    {chat.map((value)=>{
                        return(
                            <h2>{value}</h2>
                        )
                    })}
                    </div>
                </div>
                <Profilepanel/>
            </div>
        </div>
    );
}

export default LeftPanel;