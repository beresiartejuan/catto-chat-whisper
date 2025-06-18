
import { Calendar } from "lucide-react";

const EventsView = () => {
  return (
    <div className="flex-1 p-6 text-slate-100">
      <h2 className="text-lg font-light mb-4 text-slate-200 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Eventos
      </h2>
      <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/30 backdrop-blur-sm">
        <p className="text-slate-300 font-light">Próximos eventos...</p>
      </div>
    </div>
  );
};

export default EventsView;
