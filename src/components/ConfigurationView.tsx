
import { Settings } from "lucide-react";
import PromptConfiguration from "./PromptConfiguration";

interface ConfigurationViewProps {
  centralPrompt: string;
  setCentralPrompt: (prompt: string) => void;
  onSavePrompt: () => void;
}

const ConfigurationView = ({ 
  centralPrompt, 
  setCentralPrompt, 
  onSavePrompt 
}: ConfigurationViewProps) => {
  return (
    <div className="flex-1 p-6 text-slate-100 overflow-y-auto">
      <PromptConfiguration 
        centralPrompt={centralPrompt}
        setCentralPrompt={setCentralPrompt}
        onSavePrompt={onSavePrompt}
      />
    </div>
  );
};

export default ConfigurationView;
