
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

  const renderComponent = () => {
    switch (component.type) {
      case "heading":
        const HeadingTag = `h${component.props?.level || 1}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            className={`font-bold ${getSizeClass(component.props?.fontSize || "2xl")} cursor-pointer`}
            style={{ color: component.props?.color || "#1f2937" }}
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
            style={{ color: component.props?.color || "#4b5563" }}
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
          <Button
            variant={component.props?.variant === "secondary" ? "outline" : "default"}
            size={component.props?.size || "default"}
            className="cursor-pointer"
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
        );

      case "image":
        return (
          <div className="cursor-pointer">
            <img
              src={component.content || "/placeholder.svg"}
              alt={component.props?.alt || "Imagem"}
              className="max-w-full h-auto rounded-lg"
              onClick={handleEdit}
            />
          </div>
        );

      case "video":
        return (
          <div className="cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Vídeo</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="text-gray-600">Componente: {component.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative group p-6 transition-all duration-200 ${
        isSelected && !isPreviewMode
          ? "ring-2 ring-primary ring-offset-2 bg-primary/5"
          : "hover:bg-gray-50"
      } ${!isPreviewMode ? "cursor-pointer" : ""}`}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      {/* Component Controls */}
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

      {/* Component Content */}
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
