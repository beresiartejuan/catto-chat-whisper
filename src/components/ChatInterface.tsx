
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { Bot } from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "catto";
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "¡Hola! Soy Catto, tu asistente personal. ¿En qué puedo ayudarte hoy?",
      sender: "catto",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simular respuesta de Catto después de un breve delay
    setTimeout(() => {
      const cattoResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateCattoResponse(content),
        sender: "catto",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, cattoResponse]);
    }, 1000);
  };

  const generateCattoResponse = (userMessage: string): string => {
    const responses = [
      "Entiendo lo que me dices. ¿Podrías darme más detalles?",
      "Esa es una excelente pregunta. Déjame pensar en la mejor manera de ayudarte.",
      "Me parece muy interesante. ¿Te gustaría que profundice en ese tema?",
      "Perfecto, creo que puedo ayudarte con eso. ¿Hay algo específico que necesites?",
      "¡Genial! Estoy aquí para asistirte en lo que necesites.",
      "Interesante perspectiva. ¿Qué más te gustaría saber al respecto?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      {/* Header */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-4 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Catto</h1>
            <p className="text-sm text-slate-400">Tu asistente personal</p>
          </div>
        </div>
      </Card>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      {/* Input Area */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
