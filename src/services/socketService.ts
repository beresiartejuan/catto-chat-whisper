
import { io, Socket } from 'socket.io-client';
import { SOCKET_CONFIG, SOCKET_EVENTS } from '@/lib/socketConfig';
import { ChatMessage, AssistantStatus, Note } from '@/types';

class SocketService {
  private socket: Socket | null = null;
  private connectionCallbacks: Array<() => void> = [];
  private disconnectionCallbacks: Array<() => void> = [];

  connect(): Promise<Socket> {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve(this.socket);
        return;
      }

      this.socket = io(SOCKET_CONFIG.url, SOCKET_CONFIG.options);

      this.socket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log('Conectado al servidor de sockets');
        this.connectionCallbacks.forEach(callback => callback());
        resolve(this.socket!);
      });

      this.socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error) => {
        console.error('Error de conexión:', error);
        reject(error);
      });

      this.socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        console.log('Desconectado del servidor');
        this.disconnectionCallbacks.forEach(callback => callback());
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Connection management
  onConnect(callback: () => void): void {
    this.connectionCallbacks.push(callback);
  }

  onDisconnect(callback: () => void): void {
    this.disconnectionCallbacks.push(callback);
  }

  // Chat methods
  sendMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): void {
    this.socket?.emit(SOCKET_EVENTS.SEND_MESSAGE, message);
  }

  onReceiveMessage(callback: (message: ChatMessage) => void): void {
    this.socket?.on(SOCKET_EVENTS.RECEIVE_MESSAGE, callback);
  }

  onMessageHistory(callback: (messages: ChatMessage[]) => void): void {
    this.socket?.on(SOCKET_EVENTS.MESSAGE_HISTORY, callback);
  }

  // Assistant methods
  updatePrompt(prompt: string): void {
    this.socket?.emit(SOCKET_EVENTS.UPDATE_PROMPT, { prompt });
  }

  onAssistantStatus(callback: (status: AssistantStatus) => void): void {
    this.socket?.on(SOCKET_EVENTS.ASSISTANT_STATUS, callback);
  }

  onPromptUpdated(callback: (prompt: string) => void): void {
    this.socket?.on(SOCKET_EVENTS.PROMPT_UPDATED, callback);
  }

  // Notes methods
  onNotesList(callback: (notes: Note[]) => void): void {
    this.socket?.on(SOCKET_EVENTS.NOTES_LIST, callback);
  }

  onNoteCreated(callback: (note: Note) => void): void {
    this.socket?.on(SOCKET_EVENTS.NOTE_CREATED, callback);
  }

  onNoteUpdated(callback: (note: Note) => void): void {
    this.socket?.on(SOCKET_EVENTS.NOTE_UPDATED, callback);
  }

  onNoteDeleted(callback: (noteId: string) => void): void {
    this.socket?.on(SOCKET_EVENTS.NOTE_DELETED, callback);
  }

  // Events methods
  onEventsList(callback: (events: any[]) => void): void {
    this.socket?.on(SOCKET_EVENTS.EVENTS_LIST, callback);
  }

  // Generic emit method for custom events
  emit(event: string, data?: any): void {
    this.socket?.emit(event, data);
  }

  // Generic listener method for custom events
  on(event: string, callback: (...args: any[]) => void): void {
    this.socket?.on(event, callback);
  }

  // Remove listeners
  off(event: string, callback?: (...args: any[]) => void): void {
    this.socket?.off(event, callback);
  }

  // Get connection status
  get isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const socketService = new SocketService();
