
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
          <div className="flex-1 p-8 text-blue-100">
            <h2 className="text-xl font-semibold mb-6 text-blue-200">Configuración</h2>
            <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-800/50">
              <p className="text-blue-300">Ajustes del asistente...</p>
            </div>
          </div>
        );
      case "events":
        return (
          <div className="flex-1 p-8 text-blue-100">
            <h2 className="text-xl font-semibold mb-6 text-blue-200">Eventos</h2>
            <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-800/50">
              <p className="text-blue-300">Próximos eventos...</p>
            </div>
          </div>
        );
      case "notes":
        return (
          <div className="flex-1 p-8 text-blue-100">
            <h2 className="text-xl font-semibold mb-6 text-blue-200">Notas</h2>
            <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-800/50">
              <p className="text-blue-300">Tus notas rápidas...</p>
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-thin scrollbar-thumb-blue-600">
              <div className="space-y-6">
                {messages.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
              </div>
            </div>

            {/* Área de input */}
            <div className="px-8 pb-8 pt-4">
              <MessageInput onSendMessage={handleSendMessage} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-slate-950/50 rounded-2xl m-4 border border-blue-900/30 shadow-2xl shadow-blue-900/20">
      {/* Menú minimalista */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-blue-800/50 bg-gradient-to-r from-blue-950/80 to-slate-950/80 rounded-t-2xl">
        <span className="text-blue-200 font-semibold text-lg">Catto</span>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveSection("chat")}
            className={`p-3 rounded-xl transition-all duration-200 ${
              activeSection === "chat" 
                ? "bg-blue-700 text-blue-100 shadow-lg shadow-blue-700/50" 
                : "hover:bg-blue-900/60 text-blue-400 hover:text-blue-300"
            }`}
            title="Chat"
          >
            <FileText className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveSection("events")}
            className={`p-3 rounded-xl transition-all duration-200 ${
              activeSection === "events" 
                ? "bg-blue-700 text-blue-100 shadow-lg shadow-blue-700/50" 
                : "hover:bg-blue-900/60 text-blue-400 hover:text-blue-300"
            }`}
            title="Eventos"
          >
            <Calendar className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveSection("notes")}
            className={`p-3 rounded-xl transition-all duration-200 ${
              activeSection === "notes" 
                ? "bg-blue-700 text-blue-100 shadow-lg shadow-blue-700/50" 
                : "hover:bg-blue-900/60 text-blue-400 hover:text-blue-300"
            }`}
            title="Notas"
          >
            <FileText className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveSection("config")}
            className={`p-3 rounded-xl transition-all duration-200 ${
              activeSection === "config" 
                ? "bg-blue-700 text-blue-100 shadow-lg shadow-blue-700/50" 
                : "hover:bg-blue-900/60 text-blue-400 hover:text-blue-300"
            }`}
            title="Configuración"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default ChatInterface;
