
import { Cat, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PromptConfigurationProps {
  centralPrompt: string;
  setCentralPrompt: (prompt: string) => void;
  onSavePrompt: () => void;
}

const PromptConfiguration = ({ centralPrompt, setCentralPrompt, onSavePrompt }: PromptConfigurationProps) => {
  return (
    <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30 backdrop-blur-sm">
      <h3 className="text-md font-medium mb-4 text-slate-200 flex items-center gap-2">
        <Cat className="w-4 h-4 text-amber-400" />
        Prompt Central de Catto
      </h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="central-prompt" className="text-slate-300 text-sm">
            Personalidad y comportamiento base
          </Label>
          <Textarea
            id="central-prompt"
            value={centralPrompt}
            onChange={(e) => setCentralPrompt(e.target.value)}
            className="mt-2 min-h-[120px] bg-slate-700/50 border-slate-600/30 text-slate-100 placeholder-slate-400 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 rounded-lg resize-none"
            placeholder="Define la personalidad y comportamiento de Catto..."
          />
        </div>
        <Button 
          onClick={onSavePrompt}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium"
        >
          <Save className="w-4 h-4 mr-2" />
          Guardar Prompt
        </Button>
      </div>
    </div>
  );
};

export default PromptConfiguration;
