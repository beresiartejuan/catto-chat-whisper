
import { Cat, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "catto";
  timestamp: string; // ISO string
}

interface MessageProps {
  message: ChatMessage;
}

const Message = ({ message }: MessageProps) => {
  const isUser = message.sender === "user";
  
  // Convertir ISO string a Date solo para mostrar
  const displayTime = new Date(message.timestamp).toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <div className={cn("flex items-start space-x-3", isUser && "flex-row-reverse space-x-reverse")}>
      {/* Avatar con temática felina */}
      <div className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
        isUser 
          ? "bg-slate-600 shadow-sm" 
          : "bg-slate-700 shadow-sm"
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-slate-200" />
        ) : (
          <Cat className="w-4 h-4 text-amber-200" />
        )}
      </div>

      {/* Contenido del mensaje */}
      <div className={cn("max-w-[75%]", isUser && "flex flex-col items-end")}>
        <div className={cn(
          "px-4 py-3 rounded-2xl border",
          isUser 
            ? "bg-slate-700 text-slate-100 border-slate-600/50" 
            : "bg-slate-800 text-slate-100 border-slate-600/50"
        )}>
          <p className="text-sm leading-relaxed font-light">{message.content}</p>
        </div>
        
        <span className="text-xs text-slate-400 mt-1.5 px-2">
          {displayTime}
        </span>
      </div>
    </div>
  );
};

export default Message;
