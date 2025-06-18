
import { FileText, Tag } from "lucide-react";

interface Note {
  id: string;
  body: string;
  tags: string[];
}

interface NotesViewProps {
  notes: Note[];
}

const NotesView = ({ notes }: NotesViewProps) => {
  return (
    <div className="flex-1 p-6 text-slate-100 overflow-y-auto">
      <h2 className="text-lg font-light mb-6 text-slate-200 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Notas del Asistente
      </h2>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/30 backdrop-blur-sm">
            <div className="mb-3">
              <p className="text-slate-200 text-sm leading-relaxed">{note.body}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-md border border-amber-500/20"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-slate-500 text-xs font-mono">ID: {note.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesView;
