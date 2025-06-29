import { FaMicroscope,FaSearch, FaDna,FaBiohazard } from "react-icons/fa";
export const databases = [
    {
      id: 'ncbi',
      name: 'NCBI',
      fullName: 'National Center for Biotechnology Information',
      description: 'The largest collection of biomedical and genomic information, providing access to literature, sequences, and molecular databases.',
      features: [
        'PubMed - Biomedical literature database',
        'GenBank - DNA sequence database',
        'Protein - Protein sequence database',
        'Structure - 3D protein structures'
      ],
      stats: {
        records: '400M+',
        dailyUsers: '3M+',
        databases: '40+'
      },
      color: 'blue',
      icon: <FaDna/>,
      website: 'https://www.ncbi.nlm.nih.gov/',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'uniprot',
      name: 'UniProt',
      fullName: 'Universal Protein Resource',
      description: 'Comprehensive resource for protein sequence and annotation data, providing high-quality protein information.',
      features: [
        'UniProtKB - Protein knowledge base',
        'Functional annotation',
        'Protein families and domains',
        'Cross-references to other databases'
      ],
      stats: {
        records: '200M+',
        reviewed: '570K+',
        species: '12K+'
      },
      color: 'green',
      icon:<FaMicroscope/>,
      website: 'https://www.uniprot.org/',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      id: 'pdb',
      name: 'PDB',
      fullName: 'Protein Data Bank',
      description: 'Repository for 3D structural data of biological macromolecules, including proteins, nucleic acids, and complex assemblies.',
      features: [
        'X-ray crystallography structures',
        'NMR structures',
        'Cryo-electron microscopy',
        'Experimental methods data'
      ],
      stats: {
        records: '200K+',
        proteins: '180K+',
        methods: '10+'
      },
      color: 'purple',
      icon: <FaBiohazard/>,
      website: 'https://www.rcsb.org/',
      gradient: 'from-purple-400 to-violet-500'
    }
  ];
  
  /**
   * Utilidades para trabajar con databases
   */
  
  // Obtener database por ID
  export const getDatabaseById = (id) => {
    return databases.find(db => db.id === id);
  };
  
  // Obtener databases por color
  export const getDatabasesByColor = (color) => {
    return databases.filter(db => db.color === color);
  };
  
  // Obtener colores de gradiente mapeados
  export const getGradientColors = (gradient) => {
    const gradientMap = {
      'from-blue-400 to-cyan-500': '#60a5fa, #06b6d4',
      'from-emerald-400 to-teal-500': '#34d399, #14b8a6',
      'from-purple-400 to-violet-500': '#a78bfa, #8b5cf6'
    };
    
    return gradientMap[gradient] || '#60a5fa, #06b6d4';
  };
  
  // Estadísticas totales
  export const getTotalStats = () => {
    return databases.reduce((totals, db) => {
      // Extraer números de las estadísticas (ej: "400M+" -> 400)
      Object.entries(db.stats).forEach(([key, value]) => {
        const numericValue = parseInt(value.replace(/[^\d]/g, ''));
        if (!totals[key]) totals[key] = 0;
        totals[key] += numericValue;
      });
      return totals;
    }, {});
  };
  
  // Configuración de colores por tipo
  export const colorConfig = {
    blue: {
      gradient: 'from-blue-400 to-cyan-500',
      colors: '#60a5fa, #06b6d4',
      textColor: 'text-blue-400'
    },
    green: {
      gradient: 'from-emerald-400 to-teal-500',
      colors: '#34d399, #14b8a6',
      textColor: 'text-emerald-400'
    },
    purple: {
      gradient: 'from-purple-400 to-violet-500',
      colors: '#a78bfa, #8b5cf6',
      textColor: 'text-purple-400'
    }
  };
  