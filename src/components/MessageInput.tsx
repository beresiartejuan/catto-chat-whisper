
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Aquí se implementaría la funcionalidad de grabación de voz
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje a Catto..."
            className="min-h-[60px] max-h-32 resize-none bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
            rows={1}
          />
        </div>
        
        <div className="flex space-x-2">
          <Button
            type="button"
            onClick={toggleRecording}
            variant="outline"
            size="icon"
            className={cn(
              "border-slate-600 transition-all duration-200",
              isRecording 
                ? "bg-red-500 hover:bg-red-600 border-red-500 text-white" 
                : "bg-slate-700 hover:bg-slate-600 text-slate-300"
            )}
          >
            <Mic className="w-4 h-4" />
          </Button>
          
          <Button
            type="submit"
            disabled={!message.trim()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default MessageInput;
