// Definición de aminoácidos con colores basados en sus propiedades químicas
export const AMINOACID_COLORS = {
    // Aminoácidos hidrofóbicos (tonos azules/verdes)
    'A': '#4A90E2', // Alanina - Azul claro
    'V': '#357ABD', // Valina - Azul medio
    'L': '#2E5984', // Leucina - Azul oscuro
    'I': '#1E3A5F', // Isoleucina - Azul muy oscuro
    'M': '#50C878', // Metionina - Verde esmeralda
    'F': '#228B22', // Fenilalanina - Verde bosque
    'W': '#006400', // Triptófano - Verde oscuro
    'P': '#32CD32', // Prolina - Verde lima

    'S': '#FFD700', // Serina - Dorado
    'T': '#FFA500', // Treonina - Naranja
    'N': '#FF8C00', // Asparagina - Naranja oscuro
    'Q': '#FF7F50', // Glutamina - Coral
    'Y': '#FF6347', // Tirosina - Tomate
    'C': '#FFFF00', // Cisteína - Amarillo (enlaces disulfuro)
  
    // Aminoácidos básicos (tonos rojos/magentas)
    'K': '#DC143C', // Lisina - Rojo carmesí
    'R': '#B22222', // Arginina - Rojo ladrillo
    'H': '#8B0000', // Histidina - Rojo oscuro
  
    // Aminoácidos ácidos (tonos púrpuras)
    'D': '#9932CC', // Ácido aspártico - Púrpura oscuro
    'E': '#8A2BE2', // Ácido glutámico - Violeta azul
  
    // Glicina (especial - muy pequeña)
    'G': '#FFFFFF', // Glicina - Blanco con borde
  
    // Color por defecto para aminoácidos no reconocidos
    'default': '#808080' // Gris
  };
  
  // Propiedades adicionales para la visualización
  export const AMINOACID_PROPERTIES = {
    'A': { name: 'Alanina', size: 0.8, type: 'hidrofóbico' },
    'V': { name: 'Valina', size: 1.2, type: 'hidrofóbico' },
    'L': { name: 'Leucina', size: 1.3, type: 'hidrofóbico' },
    'I': { name: 'Isoleucina', size: 1.3, type: 'hidrofóbico' },
    'M': { name: 'Metionina', size: 1.4, type: 'hidrofóbico' },
    'F': { name: 'Fenilalanina', size: 1.6, type: 'hidrofóbico' },
    'W': { name: 'Triptófano', size: 1.8, type: 'hidrofóbico' },
    'P': { name: 'Prolina', size: 1.0, type: 'hidrofóbico' },
    'S': { name: 'Serina', size: 0.9, type: 'polar' },
    'T': { name: 'Treonina', size: 1.1, type: 'polar' },
    'N': { name: 'Asparagina', size: 1.2, type: 'polar' },
    'Q': { name: 'Glutamina', size: 1.3, type: 'polar' },
    'Y': { name: 'Tirosina', size: 1.7, type: 'polar' },
    'C': { name: 'Cisteína', size: 1.0, type: 'polar' },
    'K': { name: 'Lisina', size: 1.4, type: 'básico' },
    'R': { name: 'Arginina', size: 1.6, type: 'básico' },
    'H': { name: 'Histidina', size: 1.3, type: 'básico' },
    'D': { name: 'Ácido aspártico', size: 1.1, type: 'ácido' },
    'E': { name: 'Ácido glutámico', size: 1.2, type: 'ácido' },
    'G': { name: 'Glicina', size: 0.6, type: 'especial' }
  };
  
  // Función para obtener color con opacidad
  export const getAminoacidColor = (aminoacid, opacity = 1) => {
    const color = AMINOACID_COLORS[aminoacid] || AMINOACID_COLORS.default;
    if (opacity === 1) return color;
    
    // Convertir hex a rgba
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  