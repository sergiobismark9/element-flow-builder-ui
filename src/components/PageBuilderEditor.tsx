
import { useState } from "react";
import { ComponentSidebar } from "./sidebar/ComponentSidebar";
import { EditorCanvas } from "./editor/EditorCanvas";
import { PropertiesPanel } from "./properties/PropertiesPanel";
import { EditorHeader } from "./header/EditorHeader";
import { TemplateLibrary } from "./templates/TemplateLibrary";
import { useToast } from "@/hooks/use-toast";
import { useHistory } from "@/hooks/useHistory";
import { useResponsive } from "@/hooks/useResponsive";

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
  const [showTemplates, setShowTemplates] = useState(false);
  const { toast } = useToast();
  
  const { 
    pushToHistory, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  } = useHistory(components);
  
  const { 
    currentBreakpoint, 
    setCurrentBreakpoint, 
    getBreakpointStyles 
  } = useResponsive();

  const addComponent = (type: string, content?: string, parentId?: string, index?: number) => {
    const newComponent: Component = {
      id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: content || getDefaultContent(type),
      props: getDefaultProps(type),
      children: [],
    };

    const addToParent = (items: Component[], targetParentId: string): Component[] => {
      return items.map(item => {
        if (item.id === targetParentId) {
          const newChildren = [...(item.children || [])];
          if (index !== undefined) {
            newChildren.splice(index, 0, newComponent);
          } else {
            newChildren.push(newComponent);
          }
          return { ...item, children: newChildren };
        }
        if (item.children && item.children.length > 0) {
          return { ...item, children: addToParent(item.children, targetParentId) };
        }
        return item;
      });
    };

    let newComponents;
    if (parentId) {
      newComponents = addToParent(components, parentId);
    } else {
      newComponents = [...components];
      if (index !== undefined) {
        newComponents.splice(index, 0, newComponent);
      } else {
        newComponents.push(newComponent);
      }
    }
    
    setComponents(newComponents);
    pushToHistory(newComponents);
    setSelectedComponent(newComponent);
    
    toast({
      title: "Componente adicionado",
      description: `${getComponentDisplayName(type)} foi adicionado à página`,
    });
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    const updateInTree = (items: Component[]): Component[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        if (item.children && item.children.length > 0) {
          return { ...item, children: updateInTree(item.children) };
        }
        return item;
      });
    };

    const newComponents = updateInTree(components);
    setComponents(newComponents);
    pushToHistory(newComponents);
    
    if (selectedComponent?.id === id) {
      setSelectedComponent(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteComponent = (id: string) => {
    const deleteFromTree = (items: Component[]): Component[] => {
      return items.filter(item => item.id !== id).map(item => {
        if (item.children && item.children.length > 0) {
          return { ...item, children: deleteFromTree(item.children) };
        }
        return item;
      });
    };

    const newComponents = deleteFromTree(components);
    setComponents(newComponents);
    pushToHistory(newComponents);
    
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
    
    toast({
      title: "Componente removido",
      description: "O componente foi removido da página",
      variant: "destructive",
    });
  };

  const handleUndo = () => {
    const prevComponents = undo();
    if (prevComponents) {
      setComponents(prevComponents);
      setSelectedComponent(null);
      toast({
        title: "Ação desfeita",
        description: "A última ação foi desfeita",
      });
    }
  };

  const handleRedo = () => {
    const nextComponents = redo();
    if (nextComponents) {
      setComponents(nextComponents);
      setSelectedComponent(null);
      toast({
        title: "Ação refeita",
        description: "A ação foi refeita",
      });
    }
  };

  const handleApplyTemplate = (templateComponents: Component[]) => {
    setComponents(templateComponents);
    pushToHistory(templateComponents);
    setSelectedComponent(null);
    
    toast({
      title: "Template aplicado",
      description: "O template foi aplicado com sucesso",
    });
  };

  const handleSave = () => {
    // Simular salvamento
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

  // Atalhos de teclado
  useState(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              handleRedo();
            } else {
              e.preventDefault();
              handleUndo();
            }
            break;
          case 'y':
            e.preventDefault();
            handleRedo();
            break;
          case 's':
            e.preventDefault();
            handleSave();
            break;
        }
      }
      
      if (e.key === 'Delete' && selectedComponent && !isPreviewMode) {
        deleteComponent(selectedComponent.id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="h-screen flex flex-col bg-white">
      <EditorHeader 
        onSave={handleSave}
        onPublish={handlePublish}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onShowTemplates={() => setShowTemplates(true)}
        canUndo={canUndo}
        canRedo={canRedo}
        isPreviewMode={isPreviewMode}
        onPreviewToggle={setIsPreviewMode}
        currentBreakpoint={currentBreakpoint}
        onBreakpointChange={setCurrentBreakpoint}
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
          onAddComponent={addComponent}
          isPreviewMode={isPreviewMode}
          currentBreakpoint={currentBreakpoint}
          canvasStyles={isPreviewMode ? undefined : getBreakpointStyles(currentBreakpoint)}
        />
        
        {!isPreviewMode && selectedComponent && (
          <PropertiesPanel
            component={selectedComponent}
            onUpdateComponent={updateComponent}
          />
        )}
      </div>

      {showTemplates && (
        <TemplateLibrary
          onApplyTemplate={handleApplyTemplate}
          onClose={() => setShowTemplates(false)}
        />
      )}
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
    list: "Item 1\nItem 2\nItem 3",
    section: "",
    columns: "",
    navigation: "",
    form: "",
    gallery: "",
    map: "",
    "custom-html": "<div>Seu HTML personalizado aqui</div>",
  };
  return defaults[type] || "";
}

function getDefaultProps(type: string): Record<string, any> {
  const defaults: Record<string, Record<string, any>> = {
    heading: { level: 1, color: "#1f2937", fontSize: "2xl", marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    text: { color: "#4b5563", fontSize: "base", marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    button: { variant: "default", size: "default", backgroundColor: "#4338ca", marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    image: { alt: "Imagem", width: "full", marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    video: { autoplay: false, controls: true, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    list: { color: "#4b5563", fontSize: "base", marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    section: { backgroundColor: "#ffffff", marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    columns: { columns: 2, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    navigation: { navItems: ["Home", "Sobre", "Serviços", "Contato"], marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    form: { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    gallery: { images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"], marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    map: { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    "custom-html": { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
  };
  return defaults[type] || { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 };
}

function getComponentDisplayName(type: string): string {
  const names: Record<string, string> = {
    heading: "Título",
    text: "Texto",
    button: "Botão",
    image: "Imagem",
    video: "Vídeo",
    list: "Lista",
    section: "Seção",
    columns: "Colunas",
    navigation: "Navegação",
    form: "Formulário",
    gallery: "Galeria",
    map: "Mapa",
    "custom-html": "HTML Personalizado",
  };
  return names[type] || type;
}
