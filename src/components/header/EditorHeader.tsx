
import { Button } from "@/components/ui/button";
import { Eye, Save, Globe, Undo, Redo, Smartphone, Tablet, Monitor, Grid3x3 } from "lucide-react";
import { Breakpoint } from "@/hooks/useResponsive";

interface EditorHeaderProps {
  onSave: () => void;
  onPublish: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onShowTemplates: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isPreviewMode: boolean;
  onPreviewToggle: (preview: boolean) => void;
  currentBreakpoint: Breakpoint;
  onBreakpointChange: (breakpoint: Breakpoint) => void;
}

export const EditorHeader = ({ 
  onSave, 
  onPublish,
  onUndo,
  onRedo,
  onShowTemplates,
  canUndo,
  canRedo,
  isPreviewMode, 
  onPreviewToggle,
  currentBreakpoint,
  onBreakpointChange
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

      <div className="flex items-center space-x-1">
        {/* Undo/Redo */}
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          className="flex items-center space-x-1"
        >
          <Undo className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          className="flex items-center space-x-1"
        >
          <Redo className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Responsive Controls */}
        <div className="flex items-center border rounded-md">
          <Button
            variant={currentBreakpoint === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onBreakpointChange('desktop')}
            className="border-0 rounded-none"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={currentBreakpoint === 'tablet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onBreakpointChange('tablet')}
            className="border-0 rounded-none"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={currentBreakpoint === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onBreakpointChange('mobile')}
            className="border-0 rounded-none"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Templates */}
        <Button
          variant="outline"
          size="sm"
          onClick={onShowTemplates}
          className="flex items-center space-x-2"
        >
          <Grid3x3 className="w-4 h-4" />
          <span>Templates</span>
        </Button>

        {/* Preview */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPreviewToggle(!isPreviewMode)}
          className="flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>{isPreviewMode ? "Editar" : "Preview"}</span>
        </Button>

        {/* Save */}
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Salvar</span>
        </Button>
        
        {/* Publish */}
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
