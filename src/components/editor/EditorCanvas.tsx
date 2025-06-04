
import { Component } from "../PageBuilderEditor";
import { ComponentRenderer } from "./ComponentRenderer";
import { DragDropZone } from "./DragDropZone";
import { Breakpoint } from "@/hooks/useResponsive";

interface EditorCanvasProps {
  components: Component[];
  selectedComponent: Component | null;
  onSelectComponent: (component: Component | null) => void;
  onUpdateComponent: (id: string, updates: Partial<Component>) => void;
  onDeleteComponent: (id: string) => void;
  onAddComponent: (type: string, content?: string, index?: number) => void;
  isPreviewMode: boolean;
  currentBreakpoint: Breakpoint;
  canvasStyles?: React.CSSProperties;
}

export const EditorCanvas = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
  onAddComponent,
  isPreviewMode,
  currentBreakpoint,
  canvasStyles,
}: EditorCanvasProps) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("text/plain");
    if (componentType) {
      onAddComponent(componentType);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleComponentDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    const componentType = e.dataTransfer.getData("text/plain");
    if (componentType) {
      onAddComponent(componentType, undefined, targetIndex);
    }
  };

  const getCanvasClass = () => {
    if (isPreviewMode) return "w-full";
    
    switch (currentBreakpoint) {
      case 'mobile':
        return "max-w-sm mx-auto";
      case 'tablet':
        return "max-w-3xl mx-auto";
      default:
        return "max-w-6xl mx-auto";
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="min-h-full p-6">
        <div 
          className={`bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${getCanvasClass()}`}
          style={canvasStyles}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {components.length === 0 ? (
            <DragDropZone onAddComponent={onAddComponent} />
          ) : (
            <div className="min-h-[500px] relative">
              {components.map((component, index) => (
                <div key={component.id} className="relative">
                  {!isPreviewMode && (
                    <div
                      className="absolute inset-x-0 -top-2 h-4 bg-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20"
                      onDrop={(e) => handleComponentDrop(e, index)}
                      onDragOver={handleDragOver}
                    >
                      <div className="w-full h-0.5 bg-primary rounded-full shadow-sm"></div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm">
                        Soltar aqui
                      </div>
                    </div>
                  )}
                  <ComponentRenderer
                    component={component}
                    isSelected={selectedComponent?.id === component.id}
                    onSelect={() => onSelectComponent(component)}
                    onUpdate={(updates) => onUpdateComponent(component.id, updates)}
                    onDelete={() => onDeleteComponent(component.id)}
                    isPreviewMode={isPreviewMode}
                    onAddComponent={onAddComponent}
                  />
                </div>
              ))}
              {!isPreviewMode && (
                <div
                  className="h-8 bg-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity relative"
                  onDrop={(e) => handleComponentDrop(e, components.length)}
                  onDragOver={handleDragOver}
                >
                  <div className="w-full h-0.5 bg-primary rounded-full"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm">
                    Soltar no final
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {!isPreviewMode && <div className="h-16" />}
      </div>
    </div>
  );
};
