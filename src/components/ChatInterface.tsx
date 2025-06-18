import { Cat, Calendar, FileText, Settings, Wifi, WifiOff } from "lucide-react";
import ConfigurationView from "./ConfigurationView";
import EventsView from "./EventsView";
import NotesView from "./NotesView";
import ChatView from "./ChatView";
import { useChat } from "@/hooks/useChat";
import { designConfig, navigationConfig } from "@/lib/designConfig";
import { ActiveSection } from "@/types";

const ChatInterface = () => {
  const { state, actions } = useChat();

  const getIconComponent = (iconName: string) => {
    const icons = { Cat, Calendar, FileText, Settings };
    return icons[iconName as keyof typeof icons];
  };

  const renderContent = () => {
    switch (state.activeSection) {
      case "config":
        return (
          <ConfigurationView
            assistantStatus={state.assistantStatus}
            centralPrompt={state.centralPrompt}
            setCentralPrompt={actions.setCentralPrompt}
            onSavePrompt={actions.handleSavePrompt}
          />
        );
      case "events":
        return <EventsView />;
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
    <div className={`flex flex-col h-[${designConfig.layout.containerHeight}] max-w-${designConfig.layout.maxWidth} mx-auto bg-${designConfig.colors.background} rounded-${designConfig.layout.borderRadius} m-${designConfig.layout.padding.container} border border-${designConfig.colors.border} shadow-xl`}>
      {/* Header con indicador de conexión */}
      <div className={`flex items-center justify-between px-6 py-4 border-b border-${designConfig.colors.border} bg-${designConfig.colors.surface} rounded-t-${designConfig.layout.borderRadius} flex-shrink-0`}>
        <div className="flex items-center gap-3">
          <Cat className={`w-5 h-5 text-${designConfig.colors.text.accent}`} />
          <span className={`text-${designConfig.colors.text.primary} font-light text-lg`}>Catto</span>
          
          {/* Indicador de conexión */}
          <div className="flex items-center gap-1">
            {state.isConnected ? (
              <Wifi className="w-4 h-4 text-green-400" title="Conectado al servidor" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-400" title="Desconectado del servidor" />
            )}
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
                    ? `bg-${designConfig.colors.primary}-500/20 text-${designConfig.colors.text.accent}` 
                    : `hover:bg-${designConfig.colors.surface}/50 text-${designConfig.colors.text.secondary} hover:text-${designConfig.colors.text.primary}`
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
