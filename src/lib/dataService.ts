
import { Note, AssistantStatus } from "@/types";

export class DataService {
  static getAssistantStatus(): AssistantStatus {
    return {
      mood: "Alegre y juguetón",
      energy: "Alta",
      lastUpdate: new Date().toLocaleDateString('es-ES'),
      personalityMode: "Amigable"
    };
  }

  static getInitialNotes(): Note[] {
    return [
      {
        id: "note-1",
        body: "El usuario parece interesado en funcionalidades de productividad. Recordar sugerir herramientas de organización en futuras conversaciones.",
        tags: ["productividad", "usuario", "preferencias", "organización", "futuras", "conversaciones", "herramientas"]
      },
      {
        id: "note-2", 
        body: "Conversación sobre configuración del sistema. El usuario prefiere interfaces minimalistas y colores oscuros.",
        tags: ["ui", "preferencias", "configuración", "minimalista", "colores", "oscuros", "sistema"]
      },
      {
        id: "note-3",
        body: "Interés mostrado en automatización de tareas. Considerar sugerir flujos de trabajo automatizados.",
        tags: ["automatización", "tareas", "eficiencia", "flujos", "trabajo", "sugerencias", "consideración"]
      },
      {
        id: "note-4",
        body: "Esta es una nota extremadamente larga para probar la funcionalidad de expansión y colapso de contenido. El usuario ha demostrado un gran interés en optimizar su flujo de trabajo diario, especialmente en lo que respecta a la gestión de proyectos y la coordinación de equipos. Durante nuestras conversaciones, ha mencionado repetidamente la importancia de mantener una comunicación clara y efectiva entre los miembros del equipo, así como la necesidad de implementar herramientas que faciliten la colaboración remota. También ha expresado su preferencia por interfaces limpias y minimalistas que no distraigan de las tareas principales. Es importante recordar que valora mucho la eficiencia y tiende a buscar soluciones que le permitan automatizar procesos repetitivos. En futuras interacciones, sería beneficioso sugerir integraciones con herramientas de productividad populares y explorar opciones de personalización avanzada para adaptar mejor el sistema a sus necesidades específicas. El usuario también ha mostrado interés en métricas y análisis de rendimiento.",
        tags: ["productividad", "equipos", "colaboración", "automatización", "métricas", "análisis", "personalización"]
      }
    ];
  }

  static getInitialPrompt(): string {
    return "Eres Catto, un asistente personal amigable con personalidad felina. Siempre respondes de manera útil y con un toque juguetón. Utilizas emojis relacionados con gatos ocasionalmente y mantienes un tono cálido y acogedor.";
  }
}
