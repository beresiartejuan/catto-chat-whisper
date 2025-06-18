import { useState } from "react";
import { Settings, Calendar, FileText, Cat } from "lucide-react";
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
      content: "¡Miau! Soy Catto, tu asistente personal. ¿En qué puedo ayudarte hoy? 🐾",
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
      "Entiendo lo que me dices. ¿Podrías darme más detalles? 🐱",
      "Esa es una excelente pregunta. Déjame pensar... *ronroneo*",
      "Me parece muy interesante. ¿Te gustaría que profundice en ese tema?",
      "Perfecto, creo que puedo ayudarte con eso. ¿Hay algo específico que necesites? 🐾",
      "¡Genial! Estoy aquí para asistirte en lo que necesites.",
      "Interesante perspectiva. ¿Qué más te gustaría saber al respecto?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const renderContent = () => {
    switch (activeSection) {
      case "config":
        return (
          <div className="flex-1 p-6 text-slate-100">
            <h2 className="text-lg font-light mb-4 text-slate-200 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuración
            </h2>
            <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/30 backdrop-blur-sm">
              <p className="text-slate-300 font-light">Ajustes del asistente...</p>
            </div>
          </div>
        );
      case "events":
        return (
          <div className="flex-1 p-6 text-slate-100">
            <h2 className="text-lg font-light mb-4 text-slate-200 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Eventos
            </h2>
            <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/30 backdrop-blur-sm">
              <p className="text-slate-300 font-light">Próximos eventos...</p>
            </div>
          </div>
        );
      case "notes":
        return (
          <div className="flex-1 p-6 text-slate-100">
            <h2 className="text-lg font-light mb-4 text-slate-200 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Notas
            </h2>
            <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/30 backdrop-blur-sm">
              <p className="text-slate-300 font-light">Tus notas rápidas...</p>
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-slate-600">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={message.id}>
                    <Message message={message} />
                    {index < messages.length - 1 && (
                      <div className="flex justify-center my-3">
                        <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Área de input */}
            <div className="px-6 pb-6 pt-2">
              <MessageInput onSendMessage={handleSendMessage} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto bg-slate-800 rounded-2xl m-4 border border-slate-700/40 shadow-xl">
      {/* Encabezado minimalista con Catto */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/30 bg-slate-700 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <Cat className="w-5 h-5 text-amber-400" />
          <span className="text-slate-200 font-light text-lg">Catto</span>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveSection("chat")}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              activeSection === "chat" 
                ? "bg-amber-500/20 text-amber-400" 
                : "hover:bg-slate-700/50 text-slate-400 hover:text-slate-300"
            }`}
            title="Chat"
          >
            <Cat className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveSection("events")}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              activeSection === "events" 
                ? "bg-amber-500/20 text-amber-400" 
                : "hover:bg-slate-700/50 text-slate-400 hover:text-slate-300"
            }`}
            title="Eventos"
          >
            <Calendar className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveSection("notes")}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              activeSection === "notes" 
                ? "bg-amber-500/20 text-amber-400" 
                : "hover:bg-slate-700/50 text-slate-400 hover:text-slate-300"
            }`}
            title="Notas"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveSection("config")}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              activeSection === "config" 
                ? "bg-amber-500/20 text-amber-400" 
                : "hover:bg-slate-700/50 text-slate-400 hover:text-slate-300"
            }`}
            title="Configuración"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default ChatInterface;
