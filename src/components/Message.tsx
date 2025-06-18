
import { Cat, User } from "lucide-react";
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
    <div className={cn("flex items-start space-x-3", isUser && "flex-row-reverse space-x-reverse")}>
      {/* Avatar con temática felina */}
      <div className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
        isUser 
          ? "bg-gradient-to-br from-amber-100 to-amber-200 shadow-sm" 
          : "bg-gradient-to-br from-slate-700 to-slate-800 shadow-sm"
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-amber-700" />
        ) : (
          <Cat className="w-4 h-4 text-amber-200" />
        )}
      </div>

      {/* Contenido del mensaje */}
      <div className={cn("max-w-[75%]", isUser && "flex flex-col items-end")}>
        <div className={cn(
          "px-4 py-3 rounded-2xl border",
          isUser 
            ? "bg-amber-50 text-amber-900 border-amber-200/50" 
            : "bg-slate-800/60 text-slate-100 border-slate-700/50 backdrop-blur-sm"
        )}>
          <p className="text-sm leading-relaxed font-light">{message.content}</p>
        </div>
        
        <span className="text-xs text-slate-400 mt-1.5 px-2">
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
