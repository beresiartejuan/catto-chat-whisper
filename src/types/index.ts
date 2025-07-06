
export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "catto";
  timestamp: string; // Cambiado de Date a string (ISO string)
}

export interface Note {
  id: string;
  body: string;
  tags: string[];
}

export interface AssistantStatus {
  mood: string;
  energy: string;
  lastUpdate: string;
  personalityMode: string;
}

export type ActiveSection = "chat" | "config" | "notes";

export interface ChatState {
  messages: ChatMessage[];
  activeSection: ActiveSection;
  centralPrompt: string;
  assistantStatus: AssistantStatus;
  notes: Note[];
  isConnected?: boolean;
  connectionError?: string | null;
}
