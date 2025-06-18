
import { Settings } from "lucide-react";
import AssistantStatus from "./AssistantStatus";
import PromptConfiguration from "./PromptConfiguration";

interface ConfigurationViewProps {
  assistantStatus: {
    mood: string;
    energy: string;
    lastUpdate: string;
    personalityMode: string;
  };
  centralPrompt: string;
  setCentralPrompt: (prompt: string) => void;
  onSavePrompt: () => void;
}

const ConfigurationView = ({ 
  assistantStatus, 
  centralPrompt, 
  setCentralPrompt, 
  onSavePrompt 
}: ConfigurationViewProps) => {
  return (
    <div className="flex-1 p-6 text-slate-100 overflow-y-auto">
      <h2 className="text-lg font-light mb-6 text-slate-200 flex items-center gap-2">
        <Settings className="w-5 h-5" />
        Configuración
      </h2>
      
      <AssistantStatus status={assistantStatus} />
      <PromptConfiguration 
        centralPrompt={centralPrompt}
        setCentralPrompt={setCentralPrompt}
        onSavePrompt={onSavePrompt}
      />
    </div>
  );
};

export default ConfigurationView;
