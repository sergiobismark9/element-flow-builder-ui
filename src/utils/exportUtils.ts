
import { Component } from '@/components/PageBuilderEditor';

export const exportToHTML = (components: Component[], title: string = 'Minha Página') => {
  const generateComponentHTML = (component: Component): string => {
    const styles = generateInlineStyles(component);
    
    switch (component.type) {
      case 'heading':
        const tag = `h${component.props?.level || 1}`;
        return `<${tag} style="${styles}">${component.content || ''}</${tag}>`;
      
      case 'text':
        return `<p style="${styles}">${component.content || ''}</p>`;
      
      case 'button':
        return `<button style="${styles}">${component.content || ''}</button>`;
      
      case 'image':
        return `<img src="${component.content || '/placeholder.svg'}" alt="${component.props?.alt || ''}" style="${styles}" />`;
      
      case 'video':
        if (component.content?.includes('youtube') || component.content?.includes('vimeo')) {
          return `<iframe src="${component.content}" style="${styles}" frameborder="0" allowfullscreen></iframe>`;
        }
        return `<div style="${styles}">Vídeo: ${component.content}</div>`;
      
      case 'list':
        const items = component.content?.split('\n').filter(item => item.trim()) || [];
        const listItems = items.map(item => `<li>${item}</li>`).join('');
        return `<ul style="${styles}">${listItems}</ul>`;
      
      case 'section':
        return `<section style="${styles}">
          <div>Seção</div>
        </section>`;
      
      case 'columns':
        const columnCount = component.props?.columns || 2;
        const columnWidth = Math.floor(100 / columnCount);
        let columnsHTML = '';
        for (let i = 0; i < columnCount; i++) {
          columnsHTML += `<div style="width: ${columnWidth}%; float: left; padding: 10px;">Coluna ${i + 1}</div>`;
        }
        return `<div style="${styles} overflow: hidden;">${columnsHTML}</div>`;
      
      case 'navigation':
        const navItems = component.props?.navItems || ['Home', 'Sobre', 'Contato'];
        const navHTML = navItems.map(item => `<a href="#" style="margin-right: 20px;">${item}</a>`).join('');
        return `<nav style="${styles}">${navHTML}</nav>`;
      
      case 'form':
        return `<form style="${styles}">
          <div style="margin-bottom: 15px;">
            <label>Nome:</label>
            <input type="text" style="width: 100%; padding: 8px; margin-top: 5px;" />
          </div>
          <div style="margin-bottom: 15px;">
            <label>Email:</label>
            <input type="email" style="width: 100%; padding: 8px; margin-top: 5px;" />
          </div>
          <div style="margin-bottom: 15px;">
            <label>Mensagem:</label>
            <textarea style="width: 100%; padding: 8px; margin-top: 5px; height: 100px;"></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>`;
      
      case 'gallery':
        const images = component.props?.images || ['/placeholder.svg'];
        const galleryHTML = images.map(src => 
          `<img src="${src}" style="width: 30%; margin: 1.5%; height: 200px; object-fit: cover;" />`
        ).join('');
        return `<div style="${styles}">${galleryHTML}</div>`;
      
      case 'custom-html':
        return component.content || '';
      
      default:
        return `<div style="${styles}">${component.content || ''}</div>`;
    }
  };

  const generateInlineStyles = (component: Component): string => {
    const props = component.props || {};
    const styles: string[] = [];

    // Spacing
    if (props.marginTop) styles.push(`margin-top: ${props.marginTop}px`);
    if (props.marginBottom) styles.push(`margin-bottom: ${props.marginBottom}px`);
    if (props.paddingTop) styles.push(`padding-top: ${props.paddingTop}px`);
    if (props.paddingBottom) styles.push(`padding-bottom: ${props.paddingBottom}px`);

    // Typography
    if (props.color) styles.push(`color: ${props.color}`);
    if (props.fontSize) {
      const fontSizeMap: Record<string, string> = {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px'
      };
      styles.push(`font-size: ${fontSizeMap[props.fontSize] || '16px'}`);
    }

    // Background
    if (props.backgroundColor) styles.push(`background-color: ${props.backgroundColor}`);

    // Button specific
    if (component.type === 'button') {
      styles.push('padding: 8px 16px', 'border: none', 'border-radius: 4px', 'cursor: pointer');
    }

    return styles.join('; ');
  };

  const htmlContent = components.map(generateComponentHTML).join('\n');

  const fullHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }
        * {
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

  return fullHTML;
};

export const downloadHTML = (components: Component[], filename: string = 'minha-pagina.html') => {
  const htmlContent = exportToHTML(components);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
