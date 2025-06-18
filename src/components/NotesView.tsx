
import { useState } from "react";
import { FileText, Tag, ChevronDown, ChevronUp } from "lucide-react";

interface Note {
  id: string;
  body: string;
  tags: string[];
}

interface NotesViewProps {
  notes: Note[];
}

const NotesView = ({ notes }: NotesViewProps) => {
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());

  const toggleNoteExpansion = (noteId: string) => {
    setExpandedNotes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(noteId)) {
        newSet.delete(noteId);
      } else {
        newSet.add(noteId);
      }
      return newSet;
    });
  };

  const shouldTruncate = (text: string) => text.length > 600;
  const getTruncatedText = (text: string) => text.substring(0, 600) + "...";

  return (
    <div className="flex-1 p-6 text-slate-100 overflow-y-auto">
      <h2 className="text-lg font-light mb-6 text-slate-200 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Notas del Asistente
      </h2>
      <div className="space-y-6">
        {notes.map((note) => {
          const isExpanded = expandedNotes.has(note.id);
          const needsTruncation = shouldTruncate(note.body);
          const displayText = needsTruncation && !isExpanded 
            ? getTruncatedText(note.body) 
            : note.body;

          return (
            <div key={note.id} className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/30 backdrop-blur-sm">
              <div className="mb-4">
                <p className="text-slate-200 text-sm leading-relaxed max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600">
                  {displayText}
                </p>
                {needsTruncation && (
                  <button
                    onClick={() => toggleNoteExpansion(note.id)}
                    className="mt-2 flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-3 h-3" />
                        Ver menos
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3" />
                        Ver más
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {note.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-md border border-amber-500/20 truncate"
                      title={tag}
                    >
                      <Tag className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{tag}</span>
                    </span>
                  ))}
                </div>
                <div className="flex justify-end">
                  <span className="text-slate-500 text-xs font-mono">ID: {note.id}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesView;
