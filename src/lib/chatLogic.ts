
import { ChatMessage } from "@/types";

export class ChatLogic {
  static generateCattoResponse(userMessage: string): string {
    const responses = [
      "Entiendo lo que me dices. ¿Podrías darme más detalles? 🐱",
      "Esa es una excelente pregunta. Déjame pensar... *ronroneo*",
      "Me parece muy interesante. ¿Te gustaría que profundice en ese tema?",
      "Perfecto, creo que puedo ayudarte con eso. ¿Hay algo específico que necesites? 🐾",
      "¡Genial! Estoy aquí para asistirte en lo que necesites.",
      "Interesante perspectiva. ¿Qué más te gustaría saber al respecto?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static createMessage(content: string, sender: "user" | "catto"): ChatMessage {
    return {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };
  }

  static getInitialMessages(): ChatMessage[] {
    return [
      {
        id: "1",
        content: "¡Miau! Soy Catto, tu asistente personal. ¿En qué puedo ayudarte hoy? 🐾",
        sender: "catto",
        timestamp: new Date(),
      },
    ];
  }
}
