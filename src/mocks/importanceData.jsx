import { GiMedicines } from "react-icons/gi";
import { FaMicroscope,FaSearch, FaDna,FaBiohazard } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { IoIosFlash } from "react-icons/io";
import { SiGooglecolab ,SiAlchemy} from "react-icons/si";


export const importanceData = [
    {
        id: 'drug-discovery',
        title: 'Descubrimiento de Fármacos',
        icon: <GiMedicines  />,
        description: 'La búsqueda y visualización de proteínas es fundamental para el desarrollo de nuevos medicamentos',
        details: [
            'Identificación de sitios activos para el diseño de fármacos',
            'Análisis de interacciones proteína-ligando',
            'Predicción de efectos secundarios mediante homología',
            'Optimización de compuestos terapéuticos'
        ],

stats: {
            value: '90%',
            label: 'de los fármacos actúan sobre proteínas'
        },
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700'
    },
    {
        id: 'disease-research',
        title: 'Investigación de Enfermedades',
        icon: <FaMicroscope />,
        description: 'Comprender las bases moleculares de las enfermedades a través del análisis proteico',
        details: [
            'Identificación de biomarcadores de enfermedades',
            'Estudio de mutaciones patogénicas',
            'Análisis de vías metabólicas alteradas',
            'Desarrollo de terapias personalizadas'
        ],
        stats: {
            value: '7000+',
            label: 'enfermedades raras identificadas'
        },
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-700'
    },
    {
        id: 'evolutionary-biology',
        title: 'Biología Evolutiva',
        icon: <FaDna />,
        description: 'Rastrear la evolución y relaciones filogenéticas mediante análisis de secuencias',
        details: [
            'Construcción de árboles filogenéticos',
            'Análisis de presión selectiva',
            'Identificación de regiones conservadas',
            'Estudio de duplicaciones génicas'
        ],
        stats: {
            value: '3.8B',
            label: 'años de evolución documentados'
        },
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700'
    },
    {
        id: 'biotechnology',
        title: 'Biotecnología Industrial',
        icon: <FaBiohazard />,
        description: 'Aplicación de proteínas en procesos industriales y biotecnológicos',
        details: [
            'Diseño de enzimas industriales',
            'Optimización de procesos biocatalíticos',
            'Desarrollo de biosensores',
            'Producción de proteínas recombinantes'
        ],
        stats: {
            value: '$200B',
            label: 'mercado global de biotecnología'
        },
        color: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-700'
    }
];

export const visualizationBenefits = [
    {
        icon: <GoGoal className="text-white" />,
        title: 'Precisión en el Análisis',
        description: 'La visualización permite identificar patrones y estructuras que no son evidentes en datos tabulares'
    },
    {
        icon: <IoIosFlash className="text-white"/>,
        title: 'Velocidad de Comprensión',
        description: 'Procesar información visual es 60,000 veces más rápido que leer texto'
    },
    {
        icon: <FaSearch className="text-white"/>,
        title: 'Detección de Anomalías',
        description: 'Identificar rápidamente secuencias atípicas, mutaciones o regiones de interés'
    },
    {
        icon:<SiGooglecolab className="text-white"/>,
        title: 'Colaboración Científica',
        description: 'Facilita la comunicación de resultados complejos entre equipos multidisciplinarios'
    }
];

export const searchCapabilities = [
    {
        database: 'NCBI',
        icon: <FaDna />,
        records: '400M+',
        specialty: 'Secuencias genómicas y proteómicas',
        color: 'bg-purple-100 text-purple-800'
    },
    {
        database: 'UniProt',
        icon: <SiAlchemy/>,
        records: '200M+',
        specialty: 'Anotación funcional de proteínas',
        color: 'bg-blue-100 text-blue-800'
    },
    {
        database: 'PDB',
        icon: <FaMicroscope />,
        records: '200K+',
        specialty: 'Estructuras tridimensionales',
        color: 'bg-green-100 text-green-800'
    }
];

export const impactStatistics = [
    {
        value: '2.3M+',
        label: 'Artículos científicos publicados anualmente',
        color: 'text-blue-600'
    },
    {
        value: '15K+',
        label: 'Nuevos fármacos en desarrollo',
        color: 'text-purple-600'
    },
    {
        value: '95%',
        label: 'Reducción en tiempo de análisis',
        color: 'text-green-600'
    },
    {
        value: '$180B',
        label: 'Inversión global en investigación',
        color: 'text-orange-600'
    }
];

export const futureVisionCards = [
    {
        icon: <GoGoal />,
        title: 'Diagnóstico Preciso',
        description: 'Identificación temprana de enfermedades mediante análisis proteómico avanzado'
    },
    {
        icon: <GiMedicines />,
        title: 'Terapias Dirigidas',
        description: 'Medicamentos diseñados para interactuar con proteínas específicas'
    },
    {
        icon: <IoIosFlash />,
        title: 'Resultados Inmediatos',
        description: 'Análisis en tiempo real para decisiones médicas críticas'
    }
];
