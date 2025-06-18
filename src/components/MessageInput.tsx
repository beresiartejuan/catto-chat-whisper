
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");

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

  return (
    <div className="border-t border-slate-700/30 pt-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe a Catto..."
            className="min-h-[50px] max-h-32 resize-none bg-slate-800/40 border-slate-600/30 text-slate-100 placeholder-slate-400 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 rounded-xl backdrop-blur-sm font-light"
            rows={1}
          />
        </div>
        
        <Button
          type="submit"
          disabled={!message.trim()}
          size="icon"
          className="bg-amber-500 hover:bg-amber-600 disabled:opacity-40 border-0 rounded-xl h-[50px] w-[50px] transition-all duration-200 hover:scale-105 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
