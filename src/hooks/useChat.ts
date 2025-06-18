
import { useState } from "react";
import { ChatMessage, ActiveSection, ChatState } from "@/types";
import { ChatLogic } from "@/lib/chatLogic";
import { DataService } from "@/lib/dataService";

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: ChatLogic.getInitialMessages(),
    activeSection: "chat",
    centralPrompt: DataService.getInitialPrompt(),
    assistantStatus: DataService.getAssistantStatus(),
    notes: DataService.getInitialNotes()
  });

  const setActiveSection = (section: ActiveSection) => {
    setState(prev => ({ ...prev, activeSection: section }));
  };

  const setCentralPrompt = (prompt: string) => {
    setState(prev => ({ ...prev, centralPrompt: prompt }));
  };

  const handleSendMessage = (content: string) => {
    const userMessage = ChatLogic.createMessage(content, "user");
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage]
    }));

    // Simular respuesta de Catto después de un breve delay
    setTimeout(() => {
      const cattoResponse = ChatLogic.createMessage(
        ChatLogic.generateCattoResponse(content), 
        "catto"
      );
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, cattoResponse]
      }));
    }, 1000);
  };

  const handleSavePrompt = () => {
    console.log("Prompt guardado:", state.centralPrompt);
    // Aquí se implementaría la lógica para guardar el prompt
  };

  return {
    state,
    actions: {
      setActiveSection,
      setCentralPrompt,
      handleSendMessage,
      handleSavePrompt
    }
  };
};
