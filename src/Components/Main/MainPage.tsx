// MainPage.tsx
import React, { useRef, useState, useEffect } from "react";
import style from "../../Styles/MainPage.module.scss";
import CanvasAnimation from "../Animation/CanvasAnimation.tsx";
import LeftPanel from "./LeftPanel.tsx";
import VoiceAssist from "./VoiceAssist.tsx";
import { ApiService } from "../ai/apiService.ts";
import TextDisplay from "./TextDisplay.tsx";

function MainPage(props) {
  const [showVoiceAssist, setShowVoiceAssist] = useState(false);
  const [clickplus, setClickplus] = useState(false);
  const [valinp, setValinp] = useState("");
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean; image?: File }>
  >([]);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const inp = useRef(null);
  const name = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Обработчик выбора файла
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Проверяем тип файла
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        setValinp((prev) => prev || "Что на этом изображении?");
        setClickplus(false); // Закрываем меню после выбора
      } else {
        alert("Пожалуйста, выберите файл изображения (JPEG, PNG, GIF)");
      }
    }
  };

  // Функция для открытия диалога выбора файла
  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleSendMessage = async () => {
    if (!valinp.trim() && !selectedImage) return;

    const userMessage = valinp || "Проанализируй это изображение";

    // Добавляем сообщение пользователя
    setMessages((prev) => [
      ...prev,
      {
        text: userMessage,
        isUser: true,
        image: selectedImage || undefined,
      },
    ]);

    setValinp("");
    setIsTextVisible(true);

    try {
      const response = await ApiService.sendMessage(
        userMessage,
        selectedImage || undefined
      );
      console.log("Ответ от API:", response);

      if (response) {
        setMessages((prev) => [...prev, { text: response, isUser: false }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Нет ответа от сервера", isUser: false },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Произошла ошибка при отправке запроса", isUser: false },
      ]);
    } finally {
      // Очищаем выбранное изображение после отправки
      setSelectedImage(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const inps = inp.current;
    const names = name.current;
    if (e.key === "Enter") {
      handleSendMessage();

      if (inps) {
        inps.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        inps.style.transform = "translateY(200px)";
        inps.style.opacity = "0.8";
        inps.style.position = "absolute";
        inps.style.top = "600px";
      }

      if (names) {
        names.style.transition = "all 0.5s ease";
        names.style.position = "absolute";
        names.style.width = "100%";
        names.style.height = "100%";
        names.style.display = "flex";
        names.style.transform = "translateY(-500px)";
        names.style.top = "50px";
        names.style.left = "300px";
        names.style.transform = "translateX(200px)";
        names.style.opacity = "0.8";
      }
    }
  };

  // Функция для отображения превью изображения
  const renderImagePreview = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <>
      <div className={style.main}>
        <main>
          <LeftPanel />
          <div className={style.divinfo}>
            <h1 className={style.name} ref={name}>
              Norta 1.2
            </h1>
            <div className={style.messagesContainer} ref={messagesContainerRef}>
              {messages.map((message, index) => (
                <div key={index}>
                  {message.image && (
                    <div className={style.imagePreview}>
                      <img
                        src={renderImagePreview(message.image)}
                        alt="Загруженное изображение"
                        className={style.previewImage}
                      />
                    </div>
                  )}
                  <TextDisplay
                    text={message.text}
                    isVisible={true}
                    isUser={message.isUser}
                  />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Скрытый input для выбора файла */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              style={{ display: "none" }}
            />

            <div className={style.divinput} ref={inp}>
              <div
                className={`${style.glassCircle} ${style.leftCircle} ${
                  clickplus ? style.expandedCircle : ""
                }`}
                onClick={() => {
                  setClickplus(!clickplus);
                }}
              >
                {clickplus ? (
                  <div
                    className={style.photoOptions}
                    onClick={handleAddPhotoClick}
                  >
                    <p>Добавить фото</p>
                  </div>
                ) : (
                  <div className={style.plusIcon}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 4V16M4 10H16"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <input
                placeholder={
                  selectedImage
                    ? "Изображение загружено. Введите запрос..."
                    : "Введите запрос..."
                }
                className={clickplus ? style.expandedInput : ""}
                value={valinp}
                onChange={(e) => setValinp(e.target.value)}
                onKeyPress={handleKeyPress}
              />

              {/* Индикатор загруженного изображения */}
              {selectedImage && (
                <div className={style.imageIndicator}>
                  <span>📷</span>
                </div>
              )}

              <div
                className={`${style.glassCircle} ${style.rightCircle}`}
                onClick={() => setShowVoiceAssist(true)}
              >
                <div className={style.plusIcon}>
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 21V1M13 18V4M19 16V6M1 16V6"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </main>
        <CanvasAnimation />
      </div>
      {showVoiceAssist && (
        <VoiceAssist onClose={() => setShowVoiceAssist(false)} />
      )}
    </>
  );
}

export default MainPage;
