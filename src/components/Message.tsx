
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "catto";
  timestamp: Date;
}

interface MessageProps {
  message: ChatMessage;
}

const Message = ({ message }: MessageProps) => {
  const isUser = message.sender === "user";
  
  return (
    <div className={cn("flex items-start space-x-4", isUser && "flex-row-reverse space-x-reverse")}>
      {/* Avatar mejorado */}
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg",
        isUser 
          ? "bg-gradient-to-br from-blue-600 to-blue-700 shadow-blue-600/30" 
          : "bg-gradient-to-br from-blue-800 to-blue-900 shadow-blue-800/30"
      )}>
        {isUser ? (
          <User className="w-5 h-5 text-blue-100" />
        ) : (
          <Bot className="w-5 h-5 text-blue-200" />
        )}
      </div>

      {/* Contenido del mensaje mejorado */}
      <div className={cn("max-w-[75%]", isUser && "flex flex-col items-end")}>
        <div className={cn(
          "px-5 py-4 rounded-2xl shadow-lg backdrop-blur-sm border",
          isUser 
            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-blue-50 border-blue-500/30 shadow-blue-600/20" 
            : "bg-gradient-to-br from-blue-950/80 to-slate-900/80 text-blue-100 border-blue-800/50 shadow-blue-900/20"
        )}>
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        
        <span className="text-xs text-blue-400 mt-2 px-2 opacity-75">
          {message.timestamp.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};

export default Message;
