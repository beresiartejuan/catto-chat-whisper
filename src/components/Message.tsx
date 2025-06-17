
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
    <div className={cn("flex items-start space-x-3 mb-6", isUser && "flex-row-reverse space-x-reverse")}>
      {/* Avatar simple */}
      <div className={cn(
        "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
        isUser 
          ? "bg-slate-600" 
          : "bg-slate-700"
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-slate-300" />
        ) : (
          <Bot className="w-4 h-4 text-slate-300" />
        )}
      </div>

      {/* Contenido del mensaje sin card */}
      <div className={cn("max-w-[75%]", isUser && "flex flex-col items-end")}>
        <div className={cn(
          "px-4 py-3 rounded-lg",
          isUser 
            ? "bg-slate-700 text-slate-100" 
            : "bg-slate-800 text-slate-200"
        )}>
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        
        <span className="text-xs text-slate-500 mt-1 px-1">
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
