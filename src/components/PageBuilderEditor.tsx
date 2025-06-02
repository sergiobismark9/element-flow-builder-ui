
import { useState } from "react";
import { ComponentSidebar } from "./sidebar/ComponentSidebar";
import { EditorCanvas } from "./editor/EditorCanvas";
import { PropertiesPanel } from "./properties/PropertiesPanel";
import { EditorHeader } from "./header/EditorHeader";
import { useToast } from "@/hooks/use-toast";

export interface Component {
  id: string;
  type: string;
  content?: string;
  props?: Record<string, any>;
  children?: Component[];
}

export const PageBuilderEditor = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { toast } = useToast();

  const addComponent = (type: string, content?: string) => {
    const newComponent: Component = {
      id: `${type}-${Date.now()}`,
      type,
      content: content || getDefaultContent(type),
      props: getDefaultProps(type),
    };

    setComponents([...components, newComponent]);
    setSelectedComponent(newComponent);
    
    toast({
      title: "Componente adicionado",
      description: `${getComponentDisplayName(type)} foi adicionado à página`,
    });
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ));
    
    if (selectedComponent?.id === id) {
      setSelectedComponent(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
    
    toast({
      title: "Componente removido",
      description: "O componente foi removido da página",
      variant: "destructive",
    });
  };

  const handleSave = () => {
    toast({
      title: "Página salva",
      description: "Suas alterações foram salvas com sucesso",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Página publicada",
      description: "Sua página foi publicada e está ao vivo",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <EditorHeader 
        onSave={handleSave}
        onPublish={handlePublish}
        isPreviewMode={isPreviewMode}
        onPreviewToggle={setIsPreviewMode}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {!isPreviewMode && (
          <ComponentSidebar onAddComponent={addComponent} />
        )}
        
        <EditorCanvas
          components={components}
          selectedComponent={selectedComponent}
          onSelectComponent={setSelectedComponent}
          onUpdateComponent={updateComponent}
          onDeleteComponent={deleteComponent}
          isPreviewMode={isPreviewMode}
        />
        
        {!isPreviewMode && selectedComponent && (
          <PropertiesPanel
            component={selectedComponent}
            onUpdateComponent={updateComponent}
          />
        )}
      </div>
    </div>
  );
};

function getDefaultContent(type: string): string {
  const defaults: Record<string, string> = {
    heading: "Título da Seção",
    text: "Digite seu texto aqui. Você pode editar este conteúdo clicando nele.",
    button: "Clique Aqui",
    image: "/placeholder.svg",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  };
  return defaults[type] || "";
}

function getDefaultProps(type: string): Record<string, any> {
  const defaults: Record<string, Record<string, any>> = {
    heading: { level: 1, color: "#1f2937", fontSize: "2xl" },
    text: { color: "#4b5563", fontSize: "base" },
    button: { variant: "primary", size: "medium" },
    image: { alt: "Imagem", width: "full" },
    video: { autoplay: false, controls: true },
  };
  return defaults[type] || {};
}

function getComponentDisplayName(type: string): string {
  const names: Record<string, string> = {
    heading: "Título",
    text: "Texto",
    button: "Botão",
    image: "Imagem",
    video: "Vídeo",
    form: "Formulário",
    gallery: "Galeria",
  };
  return names[type] || type;
}
