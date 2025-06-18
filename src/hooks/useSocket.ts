
import { useState, useEffect, useCallback } from 'react';
import { socketService } from '@/services/socketService';
import { ChatMessage, AssistantStatus, Note } from '@/types';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [assistantStatus, setAssistantStatus] = useState<AssistantStatus | null>(null);
  const [centralPrompt, setCentralPrompt] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);

  // Initialize socket connection
  useEffect(() => {
    const initializeSocket = async () => {
      try {
        await socketService.connect();
        setIsConnected(true);
        setConnectionError(null);
      } catch (error) {
        setConnectionError('Error al conectar con el servidor');
        console.error('Socket connection error:', error);
      }
    };

    initializeSocket();

    // Setup connection listeners
    socketService.onConnect(() => {
      setIsConnected(true);
      setConnectionError(null);
    });

    socketService.onDisconnect(() => {
      setIsConnected(false);
    });

    // Setup data listeners
    socketService.onMessageHistory((messageHistory) => {
      setMessages(messageHistory);
    });

    socketService.onReceiveMessage((message) => {
      setMessages(prev => [...prev, message]);
    });

    socketService.onAssistantStatus((status) => {
      setAssistantStatus(status);
    });

    socketService.onPromptUpdated((prompt) => {
      setCentralPrompt(prompt);
    });

    socketService.onNotesList((notesList) => {
      setNotes(notesList);
    });

    socketService.onNoteCreated((note) => {
      setNotes(prev => [...prev, note]);
    });

    socketService.onNoteUpdated((updatedNote) => {
      setNotes(prev => prev.map(note => 
        note.id === updatedNote.id ? updatedNote : note
      ));
    });

    socketService.onNoteDeleted((noteId) => {
      setNotes(prev => prev.filter(note => note.id !== noteId));
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  // Actions
  const sendMessage = useCallback((content: string) => {
    if (!isConnected) {
      console.warn('No conectado al servidor. Mensaje no enviado.');
      return;
    }

    const messageData = {
      content,
      sender: 'user' as const
    };

    socketService.sendMessage(messageData);
  }, [isConnected]);

  const updatePrompt = useCallback((prompt: string) => {
    if (!isConnected) {
      console.warn('No conectado al servidor. Prompt no actualizado.');
      return;
    }

    socketService.updatePrompt(prompt);
    setCentralPrompt(prompt);
  }, [isConnected]);

  return {
    // Connection state
    isConnected,
    connectionError,
    
    // Data state
    messages,
    assistantStatus,
    centralPrompt,
    notes,
    
    // Actions
    sendMessage,
    updatePrompt,
    setCentralPrompt,
    
    // Socket service for advanced usage
    socketService
  };
};
