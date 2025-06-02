
import { Button } from "@/components/ui/button";
import { Eye, Save, Globe, Menu } from "lucide-react";

interface EditorHeaderProps {
  onSave: () => void;
  onPublish: () => void;
  isPreviewMode: boolean;
  onPreviewToggle: (preview: boolean) => void;
}

export const EditorHeader = ({ 
  onSave, 
  onPublish, 
  isPreviewMode, 
  onPreviewToggle 
}: EditorHeaderProps) => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PB</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            PageBuilder
          </h1>
        </div>
        
        <div className="text-sm text-gray-500 flex items-center">
          <span>/</span>
          <span className="ml-1">Minha Página</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPreviewToggle(!isPreviewMode)}
          className="flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>{isPreviewMode ? "Editar" : "Preview"}</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Salvar</span>
        </Button>
        
        <Button
          size="sm"
          onClick={onPublish}
          className="flex items-center space-x-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
        >
          <Globe className="w-4 h-4" />
          <span>Publicar</span>
        </Button>
      </div>
    </header>
  );
};
