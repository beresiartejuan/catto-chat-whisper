
import { useState } from "react";
import { Settings, Calendar, FileText } from "lucide-react";
import Message from "./Message";
import MessageInput from "./MessageInput";

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
  const [activeSection, setActiveSection] = useState<"chat" | "config" | "events" | "notes">("chat");

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

  const renderContent = () => {
    switch (activeSection) {
      case "config":
        return (
          <div className="flex-1 p-6 text-slate-300">
            <h2 className="text-lg font-medium mb-4">Configuración</h2>
            <p className="text-sm text-slate-400">Ajustes del asistente...</p>
          </div>
        );
      case "events":
        return (
          <div className="flex-1 p-6 text-slate-300">
            <h2 className="text-lg font-medium mb-4">Eventos</h2>
            <p className="text-sm text-slate-400">Próximos eventos...</p>
          </div>
        );
      case "notes":
        return (
          <div className="flex-1 p-6 text-slate-300">
            <h2 className="text-lg font-medium mb-4">Notas</h2>
            <p className="text-sm text-slate-400">Tus notas rápidas...</p>
          </div>
        );
      default:
        return (
          <>
            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>

            {/* Área de input */}
            <div className="px-6 pb-6">
              <MessageInput onSendMessage={handleSendMessage} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      {/* Menú minimalista */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800">
        <span className="text-slate-300 font-medium">Catto</span>
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveSection("chat")}
            className={`p-2 rounded transition-colors ${
              activeSection === "chat" ? "bg-slate-700" : "hover:bg-slate-800"
            }`}
            title="Chat"
          >
            <FileText className="w-4 h-4 text-slate-400" />
          </button>
          <button
            onClick={() => setActiveSection("events")}
            className={`p-2 rounded transition-colors ${
              activeSection === "events" ? "bg-slate-700" : "hover:bg-slate-800"
            }`}
            title="Eventos"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
          </button>
          <button
            onClick={() => setActiveSection("notes")}
            className={`p-2 rounded transition-colors ${
              activeSection === "notes" ? "bg-slate-700" : "hover:bg-slate-800"
            }`}
            title="Notas"
          >
            <FileText className="w-4 h-4 text-slate-400" />
          </button>
          <button
            onClick={() => setActiveSection("config")}
            className={`p-2 rounded transition-colors ${
              activeSection === "config" ? "bg-slate-700" : "hover:bg-slate-800"
            }`}
            title="Configuración"
          >
            <Settings className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default ChatInterface;
