
import { Cat } from "lucide-react";

interface AssistantStatusProps {
  status: {
    mood: string;
    energy: string;
    lastUpdate: string;
    personalityMode: string;
  };
}

const AssistantStatus = ({ status }: AssistantStatusProps) => {
  return (
    <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30 backdrop-blur-sm mb-6">
      <h3 className="text-md font-medium mb-4 text-slate-200 flex items-center gap-2">
        <Cat className="w-4 h-4 text-amber-400" />
        Estado Actual del Asistente
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Estado de ánimo:</span>
            <span className="text-slate-200">{status.mood}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Nivel de energía:</span>
            <span className="text-slate-200">{status.energy}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Modo personalidad:</span>
            <span className="text-slate-200">{status.personalityMode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Última actualización:</span>
            <span className="text-slate-200">{status.lastUpdate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantStatus;
