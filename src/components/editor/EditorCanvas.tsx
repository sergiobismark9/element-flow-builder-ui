
import { Component } from "../PageBuilderEditor";
import { ComponentRenderer } from "./ComponentRenderer";
import { DragDropZone } from "./DragDropZone";

interface EditorCanvasProps {
  components: Component[];
  selectedComponent: Component | null;
  onSelectComponent: (component: Component | null) => void;
  onUpdateComponent: (id: string, updates: Partial<Component>) => void;
  onDeleteComponent: (id: string) => void;
  onAddComponent: (type: string, content?: string, index?: number) => void;
  isPreviewMode: boolean;
}

export const EditorCanvas = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
  onAddComponent,
  isPreviewMode,
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

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="min-h-full p-6">
        <div 
          className={`mx-auto bg-white shadow-sm border border-gray-200 ${
            isPreviewMode ? "w-full" : "max-w-4xl"
          } rounded-lg overflow-hidden`}
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
                      className="absolute inset-x-0 -top-2 h-4 bg-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10"
                      onDrop={(e) => handleComponentDrop(e, index)}
                      onDragOver={handleDragOver}
                    >
                      <div className="w-full h-0.5 bg-primary rounded-full"></div>
                    </div>
                  )}
                  <ComponentRenderer
                    component={component}
                    isSelected={selectedComponent?.id === component.id}
                    onSelect={() => onSelectComponent(component)}
                    onUpdate={(updates) => onUpdateComponent(component.id, updates)}
                    onDelete={() => onDeleteComponent(component.id)}
                    isPreviewMode={isPreviewMode}
                  />
                </div>
              ))}
              {!isPreviewMode && (
                <div
                  className="h-8 bg-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                  onDrop={(e) => handleComponentDrop(e, components.length)}
                  onDragOver={handleDragOver}
                >
                  <div className="w-full h-0.5 bg-primary rounded-full"></div>
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
