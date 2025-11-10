export class ApiService {
  private static readonly API_KEY =
    "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";
  private static readonly API_URL =
    "https://openrouter.ai/api/v1/chat/completions";

  // Метод для проверки доступных моделей
  static async getAvailableModels() {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/models", {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
        },
      });
      const models = await response.json();
      console.log("Available models:", models);
      return models;
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  }

  static async sendMessage(message: string): Promise<string> {
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
          // Попробуем разные модели по очереди
          model: "anthropic/claude-3.5-sonnet", // Или 'google/gemini-2.0-flash-exp'
          messages: [
            {
              role: "system",
              content: "Ты полезный AI ассистент. Отвечай кратко.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 150,
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
