
import { Component } from "../PageBuilderEditor";
import { ComponentRenderer } from "./ComponentRenderer";
import { DragDropZone } from "./DragDropZone";

interface EditorCanvasProps {
  components: Component[];
  selectedComponent: Component | null;
  onSelectComponent: (component: Component | null) => void;
  onUpdateComponent: (id: string, updates: Partial<Component>) => void;
  onDeleteComponent: (id: string) => void;
  isPreviewMode: boolean;
}

export const EditorCanvas = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
  isPreviewMode,
}: EditorCanvasProps) => {
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="min-h-full p-6">
        <div className={`mx-auto bg-white shadow-sm border border-gray-200 ${
          isPreviewMode ? "w-full" : "max-w-4xl"
        } rounded-lg overflow-hidden`}>
          {components.length === 0 ? (
            <DragDropZone onAddComponent={() => {}} />
          ) : (
            <div className="min-h-[500px]">
              {components.map((component) => (
                <ComponentRenderer
                  key={component.id}
                  component={component}
                  isSelected={selectedComponent?.id === component.id}
                  onSelect={() => onSelectComponent(component)}
                  onUpdate={(updates) => onUpdateComponent(component.id, updates)}
                  onDelete={() => onDeleteComponent(component.id)}
                  isPreviewMode={isPreviewMode}
                />
              ))}
            </div>
          )}
        </div>
        {!isPreviewMode && <div className="h-16" />}
      </div>
    </div>
  );
};
