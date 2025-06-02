
import { useState } from "react";
import { Component } from "../PageBuilderEditor";
import { Button } from "@/components/ui/button";
import { Trash2, Move, Edit3 } from "lucide-react";

interface ComponentRendererProps {
  component: Component;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<Component>) => void;
  onDelete: () => void;
  isPreviewMode: boolean;
}

export const ComponentRenderer = ({
  component,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  isPreviewMode,
}: ComponentRendererProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(component.content || "");

  const handleEdit = () => {
    if (!isPreviewMode) {
      setIsEditing(true);
      setEditContent(component.content || "");
    }
  };

  const handleSaveEdit = () => {
    onUpdate({ content: editContent });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(component.content || "");
  };

  const spacingStyles = {
    marginTop: `${component.props?.marginTop || 0}px`,
    marginBottom: `${component.props?.marginBottom || 0}px`,
    paddingTop: `${component.props?.paddingTop || 0}px`,
    paddingBottom: `${component.props?.paddingBottom || 0}px`,
  };

  const renderComponent = () => {
    switch (component.type) {
      case "heading":
        const HeadingTag = `h${component.props?.level || 1}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            className={`font-bold ${getSizeClass(component.props?.fontSize || "2xl")} cursor-pointer`}
            style={{ 
              color: component.props?.color || "#1f2937",
              ...spacingStyles
            }}
            onClick={handleEdit}
          >
            {isEditing ? (
              <input
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onBlur={handleSaveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                  if (e.key === "Escape") handleCancelEdit();
                }}
                className="w-full bg-transparent border-b border-primary outline-none"
                autoFocus
              />
            ) : (
              component.content
            )}
          </HeadingTag>
        );

      case "text":
        return (
          <p
            className={`${getSizeClass(component.props?.fontSize || "base")} cursor-pointer leading-relaxed`}
            style={{ 
              color: component.props?.color || "#4b5563",
              ...spacingStyles
            }}
            onClick={handleEdit}
          >
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onBlur={handleSaveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Escape") handleCancelEdit();
                }}
                className="w-full bg-transparent border border-primary rounded p-2 outline-none resize-none"
                autoFocus
                rows={3}
              />
            ) : (
              component.content
            )}
          </p>
        );

      case "button":
        return (
          <div style={spacingStyles}>
            <Button
              variant={component.props?.variant || "default"}
              size={component.props?.size || "default"}
              className="cursor-pointer"
              style={{ backgroundColor: component.props?.backgroundColor }}
              onClick={!isPreviewMode ? handleEdit : undefined}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit();
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                  className="bg-transparent outline-none text-center min-w-[80px]"
                  autoFocus
                />
              ) : (
                component.content
              )}
            </Button>
          </div>
        );

      case "image":
        return (
          <div className="cursor-pointer" style={spacingStyles}>
            <img
              src={component.content || "/placeholder.svg"}
              alt={component.props?.alt || "Imagem"}
              className={`max-w-full h-auto rounded-lg ${getWidthClass(component.props?.width || "full")}`}
              onClick={handleEdit}
            />
            {isEditing && (
              <div className="mt-2">
                <input
                  type="url"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit();
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                  className="w-full p-2 border border-primary rounded outline-none"
                  placeholder="URL da imagem"
                  autoFocus
                />
              </div>
            )}
          </div>
        );

      case "video":
        return (
          <div className="cursor-pointer" style={spacingStyles} onClick={handleEdit}>
            {component.content && (component.content.includes("youtube") || component.content.includes("vimeo")) ? (
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={component.content}
                  className="w-full h-full"
                  allowFullScreen
                  title="Vídeo"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Clique para adicionar URL do vídeo</p>
                </div>
              </div>
            )}
            {isEditing && (
              <div className="mt-2">
                <input
                  type="url"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit();
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                  className="w-full p-2 border border-primary rounded outline-none"
                  placeholder="https://www.youtube.com/embed/..."
                  autoFocus
                />
              </div>
            )}
          </div>
        );

      case "list":
        const items = component.content?.split('\n').filter(item => item.trim()) || ['Item 1', 'Item 2', 'Item 3'];
        return (
          <div style={spacingStyles}>
            <ul className="list-disc list-inside space-y-1">
              {items.map((item, index) => (
                <li key={index} className={`${getSizeClass(component.props?.fontSize || "base")}`} style={{ color: component.props?.color || "#4b5563" }}>
                  {item}
                </li>
              ))}
            </ul>
            {isEditing && (
              <div className="mt-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                  className="w-full p-2 border border-primary rounded outline-none resize-none"
                  placeholder="Digite cada item em uma linha"
                  rows={3}
                  autoFocus
                />
              </div>
            )}
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="mt-2 text-sm text-primary hover:text-primary/80"
              >
                Editar lista
              </button>
            )}
          </div>
        );

      case "section":
        return (
          <div 
            className="min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-4"
            style={{
              backgroundColor: component.props?.backgroundColor || "transparent",
              ...spacingStyles
            }}
          >
            <div className="text-center text-gray-500">
              <h3 className="font-medium">Seção</h3>
              <p className="text-sm">Arraste componentes aqui</p>
            </div>
          </div>
        );

      case "columns":
        const columnCount = component.props?.columns || 2;
        return (
          <div className={`grid grid-cols-${columnCount} gap-4`} style={spacingStyles}>
            {Array.from({ length: columnCount }).map((_, index) => (
              <div key={index} className="min-h-[80px] border-2 border-dashed border-gray-300 rounded p-3">
                <p className="text-sm text-gray-500 text-center">Coluna {index + 1}</p>
              </div>
            ))}
          </div>
        );

      case "navigation":
        const navItems = component.props?.navItems || ['Home', 'Sobre', 'Serviços', 'Contato'];
        return (
          <nav className="bg-white shadow-sm border rounded-lg p-4" style={spacingStyles}>
            <ul className="flex space-x-6">
              {navItems.map((item: string, index: number) => (
                <li key={index}>
                  <a href="#" className="text-gray-700 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        );

      case "form":
        return (
          <div className="bg-white border rounded-lg p-6" style={spacingStyles}>
            <h3 className="text-lg font-medium mb-4">Formulário de Contato</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                <textarea rows={3} className="w-full p-2 border border-gray-300 rounded resize-none"></textarea>
              </div>
              <Button>Enviar</Button>
            </div>
          </div>
        );

      case "gallery":
        const galleryImages = component.props?.images || ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'];
        return (
          <div className="grid grid-cols-3 gap-2" style={spacingStyles}>
            {galleryImages.map((src: string, index: number) => (
              <img 
                key={index}
                src={src} 
                alt={`Galeria ${index + 1}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        );

      case "map":
        return (
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300" style={spacingStyles}>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Mapa do Google</p>
            </div>
          </div>
        );

      case "custom-html":
        return (
          <div className="bg-gray-50 border rounded-lg p-4" style={spacingStyles}>
            {component.content ? (
              <div dangerouslySetInnerHTML={{ __html: component.content }} />
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-sm">HTML Personalizado</p>
                <button onClick={handleEdit} className="text-primary text-sm mt-1">Clique para editar</button>
              </div>
            )}
            {isEditing && (
              <div className="mt-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                  className="w-full p-2 border border-primary rounded outline-none resize-none font-mono text-sm"
                  placeholder="<div>Seu HTML aqui</div>"
                  rows={4}
                  autoFocus
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded" style={spacingStyles}>
            <p className="text-gray-600">Componente: {component.type}</p>
            <p className="text-xs text-gray-500 mt-1">Este componente ainda não foi implementado</p>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative group transition-all duration-200 ${
        isSelected && !isPreviewMode
          ? "ring-2 ring-primary ring-offset-2 bg-primary/5"
          : "hover:bg-gray-50"
      } ${!isPreviewMode ? "cursor-pointer" : ""}`}
      onClick={!isPreviewMode ? onSelect : undefined}
      style={{ padding: "1.5rem" }}
    >
      {!isPreviewMode && (
        <div className={`absolute right-4 top-4 flex space-x-1 transition-opacity ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
            className="p-1.5 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Edit3 className="w-3 h-3 text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-1.5 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors cursor-move"
          >
            <Move className="w-3 h-3 text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 bg-white border border-gray-200 rounded shadow-sm hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-3 h-3 text-gray-600" />
          </button>
        </div>
      )}

      {renderComponent()}
    </div>
  );
};

function getSizeClass(size: string): string {
  const sizeMap: Record<string, string> = {
    "xs": "text-xs",
    "sm": "text-sm",
    "base": "text-base",
    "lg": "text-lg",
    "xl": "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  };
  return sizeMap[size] || "text-base";
}

function getWidthClass(width: string): string {
  const widthMap: Record<string, string> = {
    "auto": "w-auto",
    "1/2": "w-1/2",
    "3/4": "w-3/4",
    "full": "w-full",
  };
  return widthMap[width] || "w-full";
}
