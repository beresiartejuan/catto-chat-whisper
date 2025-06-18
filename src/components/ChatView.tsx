
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
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </>
  );
};

export default ChatView;
