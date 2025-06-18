
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";
import MessageInput from "./MessageInput";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "catto";
  timestamp: Date;
}

interface ChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
}

const ChatView = ({ messages, onSendMessage }: ChatViewProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <>
      {/* Área de mensajes con altura fija y scroll */}
      <div className="flex-1 min-h-0">
        <ScrollArea ref={scrollAreaRef} className="h-full px-6 py-4">
          <div className="space-y-4 pb-4">
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
        </ScrollArea>
      </div>

      {/* Área de input */}
      <div className="px-6 pb-6 pt-2 flex-shrink-0">
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </>
  );
};

export default ChatView;
