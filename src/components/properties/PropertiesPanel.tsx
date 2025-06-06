
import { Component } from "../PageBuilderEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface PropertiesPanelProps {
  component: Component;
  onUpdateComponent: (id: string, updates: Partial<Component>) => void;
}

export const PropertiesPanel = ({ component, onUpdateComponent }: PropertiesPanelProps) => {
  const updateProps = (key: string, value: any) => {
    onUpdateComponent(component.id, {
      props: {
        ...component.props,
        [key]: value,
      },
    });
  };

  const updateContent = (content: string) => {
    onUpdateComponent(component.id, { content });
  };

  return (
    <div className="w-72 border-l border-gray-200 bg-white shadow-sm slide-in-right">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
          Propriedades
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {getComponentDisplayName(component.type)}
        </p>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
        {/* Content */}
        {!["section", "columns", "navigation", "form", "gallery", "map"].includes(component.type) && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Conteúdo</Label>
            {component.type === "text" || component.type === "list" || component.type === "custom-html" ? (
              <textarea
                value={component.content || ""}
                onChange={(e) => updateContent(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md text-sm resize-none"
                rows={component.type === "custom-html" ? 5 : 3}
                placeholder={getPlaceholderText(component.type)}
              />
            ) : (
              <Input
                value={component.content || ""}
                onChange={(e) => updateContent(e.target.value)}
                placeholder={getPlaceholderText(component.type)}
                className="text-sm"
              />
            )}
          </div>
        )}

        {/* Typography */}
        {(component.type === "heading" || component.type === "text" || component.type === "list") && (
          <>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Tamanho da Fonte</Label>
              <Select
                value={component.props?.fontSize || "base"}
                onValueChange={(value) => updateProps("fontSize", value)}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">Muito Pequeno</SelectItem>
                  <SelectItem value="sm">Pequeno</SelectItem>
                  <SelectItem value="base">Normal</SelectItem>
                  <SelectItem value="lg">Grande</SelectItem>
                  <SelectItem value="xl">Muito Grande</SelectItem>
                  <SelectItem value="2xl">Extra Grande</SelectItem>
                  <SelectItem value="3xl">Gigante</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Cor do Texto</Label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={component.props?.color || "#1f2937"}
                  onChange={(e) => updateProps("color", e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <Input
                  value={component.props?.color || "#1f2937"}
                  onChange={(e) => updateProps("color", e.target.value)}
                  className="text-sm font-mono"
                  placeholder="#1f2937"
                />
              </div>
            </div>
          </>
        )}

        {/* Heading Level */}
        {component.type === "heading" && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Nível do Título</Label>
            <Select
              value={String(component.props?.level || 1)}
              onValueChange={(value) => updateProps("level", parseInt(value))}
            >
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">H1 - Principal</SelectItem>
                <SelectItem value="2">H2 - Seção</SelectItem>
                <SelectItem value="3">H3 - Subseção</SelectItem>
                <SelectItem value="4">H4 - Subtítulo</SelectItem>
                <SelectItem value="5">H5 - Pequeno</SelectItem>
                <SelectItem value="6">H6 - Menor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Button Properties */}
        {component.type === "button" && (
          <>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Estilo</Label>
              <Select
                value={component.props?.variant || "default"}
                onValueChange={(value) => updateProps("variant", value)}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Preenchido</SelectItem>
                  <SelectItem value="outline">Contornado</SelectItem>
                  <SelectItem value="ghost">Fantasma</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Tamanho</Label>
              <Select
                value={component.props?.size || "default"}
                onValueChange={(value) => updateProps("size", value)}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Pequeno</SelectItem>
                  <SelectItem value="default">Normal</SelectItem>
                  <SelectItem value="lg">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Cor de Fundo</Label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={component.props?.backgroundColor || "#4338ca"}
                  onChange={(e) => updateProps("backgroundColor", e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <Input
                  value={component.props?.backgroundColor || "#4338ca"}
                  onChange={(e) => updateProps("backgroundColor", e.target.value)}
                  className="text-sm font-mono"
                  placeholder="#4338ca"
                />
              </div>
            </div>
          </>
        )}

        {/* Image Properties */}
        {component.type === "image" && (
          <>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Texto Alternativo</Label>
              <Input
                value={component.props?.alt || ""}
                onChange={(e) => updateProps("alt", e.target.value)}
                placeholder="Descrição da imagem..."
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Largura</Label>
              <Select
                value={component.props?.width || "full"}
                onValueChange={(value) => updateProps("width", value)}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Automática</SelectItem>
                  <SelectItem value="1/2">50%</SelectItem>
                  <SelectItem value="3/4">75%</SelectItem>
                  <SelectItem value="full">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Section Properties */}
        {component.type === "section" && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Cor de Fundo</Label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={component.props?.backgroundColor || "#ffffff"}
                onChange={(e) => updateProps("backgroundColor", e.target.value)}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                value={component.props?.backgroundColor || "#ffffff"}
                onChange={(e) => updateProps("backgroundColor", e.target.value)}
                className="text-sm font-mono"
                placeholder="#ffffff"
              />
            </div>
          </div>
        )}

        {/* Columns Properties */}
        {component.type === "columns" && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Número de Colunas</Label>
            <Select
              value={String(component.props?.columns || 2)}
              onValueChange={(value) => updateProps("columns", parseInt(value))}
            >
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Coluna</SelectItem>
                <SelectItem value="2">2 Colunas</SelectItem>
                <SelectItem value="3">3 Colunas</SelectItem>
                <SelectItem value="4">4 Colunas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Navigation Properties */}
        {component.type === "navigation" && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Itens do Menu</Label>
            <textarea
              value={component.props?.navItems?.join('\n') || "Home\nSobre\nServiços\nContato"}
              onChange={(e) => updateProps("navItems", e.target.value.split('\n').filter(item => item.trim()))}
              className="w-full p-2 border border-gray-200 rounded-md text-sm resize-none"
              rows={4}
              placeholder="Digite cada item em uma linha"
            />
          </div>
        )}

        {/* Gallery Properties */}
        {component.type === "gallery" && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">URLs das Imagens</Label>
            <textarea
              value={component.props?.images?.join('\n') || "/placeholder.svg\n/placeholder.svg\n/placeholder.svg"}
              onChange={(e) => updateProps("images", e.target.value.split('\n').filter(item => item.trim()))}
              className="w-full p-2 border border-gray-200 rounded-md text-sm resize-none"
              rows={4}
              placeholder="Digite cada URL em uma linha"
            />
          </div>
        )}

        {/* Spacing */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">Espaçamento</Label>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Margem Superior</span>
                <span>{component.props?.marginTop || 0}px</span>
              </div>
              <Slider
                value={[component.props?.marginTop || 0]}
                onValueChange={([value]) => updateProps("marginTop", value)}
                max={100}
                step={4}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Margem Inferior</span>
                <span>{component.props?.marginBottom || 0}px</span>
              </div>
              <Slider
                value={[component.props?.marginBottom || 0]}
                onValueChange={([value]) => updateProps("marginBottom", value)}
                max={100}
                step={4}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Padding Superior</span>
                <span>{component.props?.paddingTop || 0}px</span>
              </div>
              <Slider
                value={[component.props?.paddingTop || 0]}
                onValueChange={([value]) => updateProps("paddingTop", value)}
                max={100}
                step={4}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Padding Inferior</span>
                <span>{component.props?.paddingBottom || 0}px</span>
              </div>
              <Slider
                value={[component.props?.paddingBottom || 0]}
                onValueChange={([value]) => updateProps("paddingBottom", value)}
                max={100}
                step={4}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

function getPlaceholderText(type: string): string {
  const placeholders: Record<string, string> = {
    heading: "Digite o título...",
    text: "Digite o texto...",
    button: "Texto do botão...",
    image: "URL da imagem...",
    video: "URL do vídeo (YouTube embed)...",
    list: "Digite cada item em uma linha...",
    "custom-html": "<div>Seu HTML aqui</div>",
  };
  return placeholders[type] || "Digite o conteúdo...";
}
