import { Cat, Calendar, FileText, Settings, Wifi, WifiOff } from "lucide-react";
import ConfigurationView from "./ConfigurationView";
import NotesView from "./NotesView";
import ChatView from "./ChatView";
import { useChat } from "@/hooks/useChat";
import { designConfig, navigationConfig } from "@/lib/designConfig";
import { ActiveSection } from "@/types";

const ChatInterface = () => {
  const { state, actions } = useChat();

  const getIconComponent = (iconName: string) => {
    const icons = { Cat, FileText, Settings };
    return icons[iconName as keyof typeof icons];
  };

  const renderContent = () => {
    switch (state.activeSection) {
      case "config":
        return (
          <ConfigurationView
            centralPrompt={state.centralPrompt}
            setCentralPrompt={actions.setCentralPrompt}
            onSavePrompt={actions.handleSavePrompt}
          />
        );
      case "notes":
        return <NotesView notes={state.notes} />;
      default:
        return (
          <ChatView 
            messages={state.messages}
            onSendMessage={actions.handleSendMessage}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-[92vh] max-w-4xl mx-auto bg-slate-800 rounded-2xl m-4 border border-slate-700/30 shadow-xl">
      {/* Header con indicador de conexión */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/30 bg-slate-700 rounded-t-2xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <Cat className="w-5 h-5 text-amber-400" />
          <span className="text-slate-200 font-light text-lg">Catto</span>
          
          {/* Indicador de conexión */}
          <div className="flex items-center gap-1">
            <div title={state.isConnected ? "Conectado al servidor" : "Desconectado del servidor"}>
              {state.isConnected ? (
                <Wifi className="w-4 h-4 text-green-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-400" />
              )}
            </div>
            <span className={`text-xs ${state.isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {state.isConnected ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-1">
          {navigationConfig.map((nav) => {
            const IconComponent = getIconComponent(nav.icon);
            const isActive = state.activeSection === nav.key;
            
            return (
              <button
                key={nav.key}
                onClick={() => actions.setActiveSection(nav.key as ActiveSection)}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "bg-amber-500/20 text-amber-400" 
                    : "hover:bg-slate-700/50 text-slate-400 hover:text-slate-200"
                }`}
                title={nav.title}
              >
                <IconComponent className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Error de conexión */}
      {state.connectionError && (
        <div className="px-6 py-2 bg-red-500/10 border-b border-red-500/20">
          <p className="text-red-400 text-sm">{state.connectionError}</p>
        </div>
      )}

      <div className="flex-1 min-h-0 flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};

export default ChatInterface;
