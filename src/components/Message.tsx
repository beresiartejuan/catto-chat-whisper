
import { Card } from "@/components/ui/card";
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
    <div className={cn("flex items-start space-x-3 animate-fade-in", isUser && "flex-row-reverse space-x-reverse")}>
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
        isUser 
          ? "bg-gradient-to-r from-blue-500 to-cyan-500" 
          : "bg-gradient-to-r from-purple-500 to-blue-500"
      )}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn("max-w-[80%]", isUser && "flex flex-col items-end")}>
        <Card className={cn(
          "p-3 backdrop-blur-sm border transition-all duration-200 hover:scale-[1.02]",
          isUser 
            ? "bg-blue-600/20 border-blue-500/30 text-white" 
            : "bg-slate-800/50 border-slate-700 text-slate-100"
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </Card>
        
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
