export class ApiService {
  private static readonly API_KEY =
    "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";
  private static readonly API_URL =
    "https://openrouter.ai/api/v1/chat/completions";

  // Существующие методы...

  static async sendMessageWithImage(
    message: string,
    imageFile: File
  ): Promise<string> {
    try {
      // Конвертируем изображение в base64
      const imageBase64 = await this.fileToBase64(imageFile);

      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Norta AI Assistant",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3.5-sonnet", // Claude поддерживает изображения
          messages: [
            {
              role: "system",
              content:
                "Ты полезный AI ассистент. Анализируй изображения и отвечай на вопросы о них.",
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: message,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${imageFile.type};base64,${imageBase64}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0]?.message?.content || "Ответ получен";
      } else {
        const errorDetails = await response.json();
        console.error("API Error Details:", errorDetails);
        throw new Error(
          `API error: ${response.status} - ${JSON.stringify(errorDetails)}`
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Вспомогательный метод для конвертации файла в base64
  private static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Убираем префикс "data:image/...;base64,"
        const base64 = reader.result?.toString().split(",")[1];
        if (base64) {
          resolve(base64);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  }

  // Универсальный метод для отправки сообщений с опциональным изображением
  static async sendMessage(message: string, imageFile?: File): Promise<string> {
    if (imageFile) {
      return this.sendMessageWithImage(message, imageFile);
    } else {
      return this.sendTextMessage(message);
    }
  }

  // Выносим старую логику в отдельный метод
  private static async sendTextMessage(message: string): Promise<string> {
    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Norta AI Assistant",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3.5-sonnet",
          messages: [
            {
              role: "system",
              content: "Ты полезный AI ассистент. Отвечай как можно больше.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0]?.message?.content || "Ответ получен";
      } else {
        const errorDetails = await response.json();
        console.error("API Error Details:", errorDetails);
        throw new Error(
          `API error: ${response.status} - ${JSON.stringify(errorDetails)}`
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
}
