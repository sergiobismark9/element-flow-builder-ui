import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Heading, Type, MousePointer, Image, Video, Navigation, Menu, Grid3x3, FileText, Code, Timer, MessageCircle, ShoppingCart } from "lucide-react";

interface ComponentSidebarProps {
  onAddComponent: (type: string, content?: string) => void;
}

interface ComponentItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  isPro?: boolean;
}

const components: ComponentItem[] = [
  // Layout Components
  { id: "section", name: "Seção", icon: <div className="w-4 h-4 border border-gray-400" />, category: "layout" },
  { id: "columns", name: "Colunas", icon: <div className="w-4 h-4 border border-gray-400 border-r-2" />, category: "layout" },
  { id: "grid", name: "Grid", icon: <div className="w-4 h-4 border border-gray-400" style={{backgroundImage: "linear-gradient(to right, transparent 50%, #9ca3af 50%), linear-gradient(to bottom, transparent 50%, #9ca3af 50%)", backgroundSize: "8px 8px"}} />, category: "layout" },
  
  // Content Components
  { id: "heading", name: "Título", icon: <Heading className="w-4 h-4" />, category: "content" },
  { id: "text", name: "Texto", icon: <Type className="w-4 h-4" />, category: "content" },
  { id: "list", name: "Lista", icon: <div className="w-4 h-4 flex flex-col"><div className="h-1 bg-gray-400 mb-0.5"></div><div className="h-1 bg-gray-400 mb-0.5"></div><div className="h-1 bg-gray-400"></div></div>, category: "content" },
  { id: "image", name: "Imagem", icon: <Image className="w-4 h-4" />, category: "content" },
  { id: "video", name: "Vídeo", icon: <Video className="w-4 h-4" />, category: "content" },
  { id: "button", name: "Botão", icon: <MousePointer className="w-4 h-4" />, category: "content" },
  
  // Interactive Components
  { id: "navigation", name: "Navegação", icon: <Navigation className="w-4 h-4" />, category: "interactive" },
  { id: "menu", name: "Menu", icon: <Menu className="w-4 h-4" />, category: "interactive" },
  { id: "gallery", name: "Galeria", icon: <Grid3x3 className="w-4 h-4" />, category: "interactive" },
  { id: "map", name: "Mapa", icon: <div className="w-4 h-4 border border-gray-400 rounded-full" />, category: "interactive" },
  { id: "form", name: "Formulário", icon: <FileText className="w-4 h-4" />, category: "interactive" },
  
  // Advanced Components
  { id: "custom-html", name: "HTML", icon: <Code className="w-4 h-4" />, category: "advanced" },
  { id: "animation", name: "Animação", icon: <div className="w-4 h-4 border border-gray-400 rounded-full" />, category: "advanced", isPro: true },
  { id: "shape", name: "Forma", icon: <div className="w-4 h-4 bg-gray-400 rounded" />, category: "advanced", isPro: true },
  { id: "countdown", name: "Contador", icon: <Timer className="w-4 h-4" />, category: "advanced", isPro: true },
  { id: "chat", name: "Chat", icon: <MessageCircle className="w-4 h-4" />, category: "advanced", isPro: true },
  { id: "shop", name: "Loja", icon: <ShoppingCart className="w-4 h-4" />, category: "advanced", isPro: true },
];

const categories = [
  { id: "layout", name: "Layout" },
  { id: "content", name: "Conteúdo" },
  { id: "interactive", name: "Interativo" },
  { id: "advanced", name: "Avançado" },
];

export const ComponentSidebar = ({ onAddComponent }: ComponentSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Components");

  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleComponentClick = (componentId: string) => {
    onAddComponent(componentId);
  };

  return (
    <div className="w-64 border-r border-gray-200 bg-white shadow-sm">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button 
          className={`flex-1 py-4 text-sm font-medium transition-colors ${
            activeTab === "Components" 
              ? "text-primary border-b-2 border-primary bg-primary/5" 
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("Components")}
        >
          Componentes
        </button>
        <button 
          className={`flex-1 py-4 text-sm font-medium transition-colors ${
            activeTab === "Pages" 
              ? "text-primary border-b-2 border-primary bg-primary/5" 
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("Pages")}
        >
          Páginas
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar componentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </div>

      {/* Components */}
      <div className="flex-1 overflow-y-auto">
        {categories.map(category => {
          const categoryComponents = filteredComponents.filter(c => c.category === category.id);
          if (categoryComponents.length === 0) return null;

          return (
            <div key={category.id} className="px-4 py-2">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                {category.name}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {categoryComponents.map(component => (
                  <div
                    key={component.id}
                    onClick={() => handleComponentClick(component.id)}
                    className="relative flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md group"
                  >
                    {component.isPro && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-xs px-1.5 py-0.5 rounded-full text-white font-medium text-[10px]">
                        PRO
                      </span>
                    )}
                    <div className="w-8 h-8 flex items-center justify-center text-gray-600 group-hover:text-primary transition-colors">
                      {component.icon}
                    </div>
                    <span className="text-xs mt-1 text-center text-gray-700 group-hover:text-primary transition-colors">
                      {component.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
