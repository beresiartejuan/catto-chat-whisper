import { useState } from "react";
import { Settings, Calendar, FileText, Cat, Save, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Message from "./Message";
import MessageInput from "./MessageInput";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "catto";
  timestamp: Date;
}

interface Note {
  id: string;
  body: string;
  tags: string[];
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
  const [centralPrompt, setCentralPrompt] = useState("Eres Catto, un asistente personal amigable con personalidad felina. Siempre respondes de manera útil y con un toque juguetón. Utilizas emojis relacionados con gatos ocasionalmente y mantienes un tono cálido y acogedor.");

  // Estado del asistente (solo lectura)
  const assistantStatus = {
    mood: "Alegre y juguetón",
    energy: "Alta",
    lastUpdate: new Date().toLocaleDateString('es-ES'),
    personalityMode: "Amigable"
  };

  // Notas generadas por el asistente
  const [notes] = useState<Note[]>([
    {
      id: "note-1",
      body: "El usuario parece interesado en funcionalidades de productividad. Recordar sugerir herramientas de organización en futuras conversaciones.",
      tags: ["productividad", "usuario", "preferencias"]
    },
    {
      id: "note-2", 
      body: "Conversación sobre configuración del sistema. El usuario prefiere interfaces minimalistas y colores oscuros.",
      tags: ["ui", "preferencias", "configuración"]
    },
    {
      id: "note-3",
      body: "Interés mostrado en automatización de tareas. Considerar sugerir flujos de trabajo automatizados.",
      tags: ["automatización", "tareas", "eficiencia"]
    }
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
      "Entiendo lo que me dices. ¿Podrías darme más detalles? 🐱",
      "Esa es una excelente pregunta. Déjame pensar... *ronroneo*",
      "Me parece muy interesante. ¿Te gustaría que profundice en ese tema?",
      "Perfecto, creo que puedo ayudarte con eso. ¿Hay algo específico que necesites? 🐾",
      "¡Genial! Estoy aquí para asistirte en lo que necesites.",
      "Interesante perspectiva. ¿Qué más te gustaría saber al respecto?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSavePrompt = () => {
    console.log("Prompt guardado:", centralPrompt);
    // Aquí se implementaría la lógica para guardar el prompt
  };

  const renderContent = () => {
    switch (activeSection) {
      case "config":
        return (
          <div className="flex-1 p-6 text-slate-100 overflow-y-auto">
            <h2 className="text-lg font-light mb-6 text-slate-200 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuración
            </h2>
            
            {/* Estado del Asistente (Solo lectura) */}
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30 backdrop-blur-sm mb-6">
              <h3 className="text-md font-medium mb-4 text-slate-200 flex items-center gap-2">
                <Cat className="w-4 h-4 text-amber-400" />
                Estado Actual del Asistente
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estado de ánimo:</span>
                    <span className="text-slate-200">{assistantStatus.mood}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nivel de energía:</span>
                    <span className="text-slate-200">{assistantStatus.energy}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Modo personalidad:</span>
                    <span className="text-slate-200">{assistantStatus.personalityMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Última actualización:</span>
                    <span className="text-slate-200">{assistantStatus.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuración del Prompt Central */}
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30 backdrop-blur-sm">
              <h3 className="text-md font-medium mb-4 text-slate-200 flex items-center gap-2">
                <Cat className="w-4 h-4 text-amber-400" />
                Prompt Central de Catto
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="central-prompt" className="text-slate-300 text-sm">
                    Personalidad y comportamiento base
                  </Label>
                  <Textarea
                    id="central-prompt"
                    value={centralPrompt}
                    onChange={(e) => setCentralPrompt(e.target.value)}
                    className="mt-2 min-h-[120px] bg-slate-700/50 border-slate-600/30 text-slate-100 placeholder-slate-400 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 rounded-lg resize-none"
                    placeholder="Define la personalidad y comportamiento de Catto..."
                  />
                </div>
                <Button 
                  onClick={handleSavePrompt}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Prompt
                </Button>
              </div>
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
          <div className="flex-1 p-6 text-slate-100 overflow-y-auto">
            <h2 className="text-lg font-light mb-6 text-slate-200 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Notas del Asistente
            </h2>
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/30 backdrop-blur-sm">
                  <div className="mb-3">
                    <p className="text-slate-200 text-sm leading-relaxed">{note.body}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-md border border-amber-500/20"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-slate-500 text-xs font-mono">ID: {note.id}</span>
                  </div>
                </div>
              ))}
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
