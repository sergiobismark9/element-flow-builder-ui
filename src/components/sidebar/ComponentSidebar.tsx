
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Type, 
  AlignLeft, 
  MousePointer, 
  Image, 
  Play, 
  List, 
  LayoutGrid, 
  Grid3x3, 
  Navigation, 
  FileText, 
  Grid2x2, 
  MapPin, 
  Code 
} from "lucide-react";

interface ComponentSidebarProps {
  onAddComponent: (type: string, content?: string) => void;
}

const components = [
  { type: "heading", icon: Type, label: "Título" },
  { type: "text", icon: AlignLeft, label: "Texto" },
  { type: "button", icon: MousePointer, label: "Botão" },
  { type: "image", icon: Image, label: "Imagem" },
  { type: "video", icon: Play, label: "Vídeo" },
  { type: "list", icon: List, label: "Lista" },
  { type: "section", icon: LayoutGrid, label: "Seção" },
  { type: "columns", icon: Grid3x3, label: "Colunas" },
  { type: "navigation", icon: Navigation, label: "Navegação" },
  { type: "form", icon: FileText, label: "Formulário" },
  { type: "gallery", icon: Grid2x2, label: "Galeria" },
  { type: "map", icon: MapPin, label: "Mapa" },
  { type: "custom-html", icon: Code, label: "HTML Personalizado" },
];

export const ComponentSidebar = ({ onAddComponent }: ComponentSidebarProps) => {
  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData("text/plain", componentType);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Componentes</h2>
        <p className="text-sm text-gray-500 mt-1">
          Arraste para o canvas ou clique para adicionar
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {components.map((component) => {
            const Icon = component.icon;
            return (
              <Button
                key={component.type}
                variant="outline"
                className="w-full justify-start h-auto p-3 cursor-grab active:cursor-grabbing"
                draggable
                onDragStart={(e) => handleDragStart(e, component.type)}
                onClick={() => onAddComponent(component.type)}
              >
                <Icon className="w-4 h-4 mr-3 text-gray-600" />
                <span className="text-sm">{component.label}</span>
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      <Separator />
      
      <div className="p-4">
        <div className="text-xs text-gray-500 space-y-1">
          <p>💡 Dica: Arraste componentes para posicioná-los</p>
          <p>✏️ Clique em um componente para editá-lo</p>
        </div>
      </div>
    </div>
  );
};
