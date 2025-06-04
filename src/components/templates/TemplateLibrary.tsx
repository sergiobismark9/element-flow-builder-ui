
import { Component } from '../PageBuilderEditor';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Eye } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
  components: Component[];
}

interface TemplateLibraryProps {
  onApplyTemplate: (components: Component[]) => void;
  onClose: () => void;
}

const templates: Template[] = [
  {
    id: 'landing-1',
    name: 'Landing Page Simples',
    category: 'Landing Page',
    preview: '/placeholder.svg',
    components: [
      {
        id: 'hero-heading',
        type: 'heading',
        content: 'Bem-vindo ao Nosso Produto',
        props: { level: 1, fontSize: '3xl', color: '#1f2937', marginBottom: 16 }
      },
      {
        id: 'hero-text',
        type: 'text',
        content: 'Uma solução inovadora para suas necessidades. Descubra como podemos ajudar você a alcançar seus objetivos.',
        props: { fontSize: 'lg', color: '#6b7280', marginBottom: 24 }
      },
      {
        id: 'hero-button',
        type: 'button',
        content: 'Começar Agora',
        props: { variant: 'default', size: 'lg', backgroundColor: '#3b82f6', marginBottom: 48 }
      }
    ]
  },
  {
    id: 'about-1',
    name: 'Seção Sobre',
    category: 'Seções',
    preview: '/placeholder.svg',
    components: [
      {
        id: 'about-heading',
        type: 'heading',
        content: 'Sobre Nós',
        props: { level: 2, fontSize: '2xl', color: '#1f2937', marginBottom: 16 }
      },
      {
        id: 'about-columns',
        type: 'columns',
        content: '',
        props: { columns: 2, marginBottom: 32 }
      },
      {
        id: 'about-text',
        type: 'text',
        content: 'Nossa empresa está comprometida em fornecer soluções de alta qualidade para nossos clientes.',
        props: { fontSize: 'base', color: '#4b5563' }
      }
    ]
  },
  {
    id: 'contact-1',
    name: 'Formulário de Contato',
    category: 'Formulários',
    preview: '/placeholder.svg',
    components: [
      {
        id: 'contact-heading',
        type: 'heading',
        content: 'Entre em Contato',
        props: { level: 2, fontSize: '2xl', color: '#1f2937', marginBottom: 16 }
      },
      {
        id: 'contact-form',
        type: 'form',
        content: '',
        props: { marginBottom: 32 }
      }
    ]
  }
];

export const TemplateLibrary = ({ onApplyTemplate, onClose }: TemplateLibraryProps) => {
  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Biblioteca de Templates</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 flex">
          <div className="w-48 border-r bg-gray-50">
            <div className="p-4">
              <h3 className="font-medium text-sm text-gray-700 mb-3">Categorias</h3>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category}
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-200 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6 grid grid-cols-2 gap-4">
              {templates.map(template => (
                <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="font-medium mb-1">{template.name}</h4>
                  <p className="text-sm text-gray-500 mb-3">{template.category}</p>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      onApplyTemplate(template.components);
                      onClose();
                    }}
                  >
                    Usar Template
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
