
import { useState } from "react";
import { Settings, Calendar, FileText, Cat } from "lucide-react";
import ConfigurationView from "./ConfigurationView";
import EventsView from "./EventsView";
import NotesView from "./NotesView";
import ChatView from "./ChatView";

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
      tags: ["productividad", "usuario", "preferencias", "organización", "futuras", "conversaciones", "herramientas"]
    },
    {
      id: "note-2", 
      body: "Conversación sobre configuración del sistema. El usuario prefiere interfaces minimalistas y colores oscuros.",
      tags: ["ui", "preferencias", "configuración", "minimalista", "colores", "oscuros", "sistema"]
    },
    {
      id: "note-3",
      body: "Interés mostrado en automatización de tareas. Considerar sugerir flujos de trabajo automatizados.",
      tags: ["automatización", "tareas", "eficiencia", "flujos", "trabajo", "sugerencias", "consideración"]
    },
    {
      id: "note-4",
      body: "Esta es una nota extremadamente larga para probar la funcionalidad de expansión y colapso de contenido. El usuario ha demostrado un gran interés en optimizar su flujo de trabajo diario, especialmente en lo que respecta a la gestión de proyectos y la coordinación de equipos. Durante nuestras conversaciones, ha mencionado repetidamente la importancia de mantener una comunicación clara y efectiva entre los miembros del equipo, así como la necesidad de implementar herramientas que faciliten la colaboración remota. También ha expresado su preferencia por interfaces limpias y minimalistas que no distraigan de las tareas principales. Es importante recordar que valora mucho la eficiencia y tiende a buscar soluciones que le permitan automatizar procesos repetitivos. En futuras interacciones, sería beneficioso sugerir integraciones con herramientas de productividad populares y explorar opciones de personalización avanzada para adaptar mejor el sistema a sus necesidades específicas. El usuario también ha mostrado interés en métricas y análisis de rendimiento.",
      tags: ["productividad", "equipos", "colaboración", "automatización", "métricas", "análisis", "personalización"]
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
          <ConfigurationView
            assistantStatus={assistantStatus}
            centralPrompt={centralPrompt}
            setCentralPrompt={setCentralPrompt}
            onSavePrompt={handleSavePrompt}
          />
        );
      case "events":
        return <EventsView />;
      case "notes":
        return <NotesView notes={notes} />;
      default:
        return (
          <ChatView 
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-slate-800 rounded-2xl m-4 border border-slate-700/40 shadow-xl">
      {/* Encabezado minimalista con Catto */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/30 bg-slate-700 rounded-t-2xl flex-shrink-0">
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

      <div className="flex-1 min-h-0 flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};

export default ChatInterface;
