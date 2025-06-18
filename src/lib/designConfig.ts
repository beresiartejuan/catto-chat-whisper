
export const designConfig = {
  colors: {
    primary: "amber",
    background: "slate-800",
    surface: "slate-700",
    border: "slate-700/30",
    text: {
      primary: "slate-200",
      secondary: "slate-400",
      accent: "amber-400"
    }
  },
  layout: {
    containerHeight: "70vh",
    maxWidth: "3xl",
    borderRadius: "2xl",
    padding: {
      container: "4",
      section: "6"
    }
  },
  animations: {
    transition: "all duration-200",
    hover: "hover:scale-105"
  }
} as const;

export const navigationConfig = [
  { 
    key: "chat" as const, 
    icon: "Cat", 
    title: "Chat" 
  },
  { 
    key: "events" as const, 
    icon: "Calendar", 
    title: "Eventos" 
  },
  { 
    key: "notes" as const, 
    icon: "FileText", 
    title: "Notas" 
  },
  { 
    key: "config" as const, 
    icon: "Settings", 
    title: "Configuración" 
  }
];
