
import { Plus } from "lucide-react";

interface DragDropZoneProps {
  onAddComponent: (type: string, content?: string) => void;
}

export const DragDropZone = ({ onAddComponent }: DragDropZoneProps) => {
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

  return (
    <div 
      className="min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg m-6 transition-colors hover:border-primary hover:bg-primary/5"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Plus className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Comece a construir sua página
        </h3>
        <p className="text-gray-500 mb-4 max-w-sm">
          Arraste componentes da barra lateral ou clique em um componente para começar
        </p>
        <button
          onClick={() => onAddComponent("heading")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar primeiro componente
        </button>
      </div>
    </div>
  );
};
