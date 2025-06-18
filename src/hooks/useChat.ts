
import { useState } from "react";
import { ActiveSection } from "@/types";
import { useSocket } from "./useSocket";

export const useChat = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("chat");
  
  const {
    isConnected,
    connectionError,
    messages,
    assistantStatus,
    centralPrompt,
    notes,
    sendMessage,
    updatePrompt,
    setCentralPrompt
  } = useSocket();

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  const handleSavePrompt = () => {
    updatePrompt(centralPrompt);
    console.log("Prompt guardado y enviado al servidor:", centralPrompt);
  };

  // Fallback data for when not connected
  const fallbackAssistantStatus = {
    mood: "Desconectado",
    energy: "N/A",
    lastUpdate: new Date().toLocaleDateString('es-ES'),
    personalityMode: "Modo offline"
  };

  return {
    state: {
      messages: messages.length > 0 ? messages : [
        {
          id: "1",
          content: isConnected 
            ? "¡Hola! Estoy conectado al servidor. ¿En qué puedo ayudarte? 🐾"
            : "Conectando con el servidor... 🔌",
          sender: "catto" as const,
          timestamp: new Date().toISOString(), // Usar ISO string
        }
      ],
      activeSection,
      centralPrompt: centralPrompt || "Eres Catto, un asistente personal amigable con personalidad felina...",
      assistantStatus: assistantStatus || fallbackAssistantStatus,
      notes: notes.length > 0 ? notes : [],
      isConnected,
      connectionError
    },
    actions: {
      setActiveSection,
      setCentralPrompt,
      handleSendMessage,
      handleSavePrompt
    }
  };
};
