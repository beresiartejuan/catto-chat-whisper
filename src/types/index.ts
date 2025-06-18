
export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "catto";
  timestamp: Date;
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

export type ActiveSection = "chat" | "config" | "events" | "notes";

export interface ChatState {
  messages: ChatMessage[];
  activeSection: ActiveSection;
  centralPrompt: string;
  assistantStatus: AssistantStatus;
  notes: Note[];
  isConnected?: boolean;
  connectionError?: string | null;
}
