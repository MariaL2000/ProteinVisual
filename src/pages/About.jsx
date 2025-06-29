
import { FaMicroscope,FaSearch, FaDna,FaBiohazard } from "react-icons/fa";

const About = () => {
  const features = [
    {
      title: "Búsqueda Avanzada",
      description: "Motor de búsqueda que consulta múltiples bases de datos científicas simultáneamente",
      icon:<FaSearch/>
    },
    {
      title: "Visualización 3D",
      description: "Representación interactiva de estructuras proteicas con animaciones en tiempo real",
      icon: <FaDna/>
    },
    {
      title: "Múltiples Bases de Datos",
      description: "Integración con UniProt, NCBI y PDB para resultados completos",
      icon: <FaMicroscope/> 
    },
    {
      title: "Análisis en Tiempo Real",
      description: "Procesamiento instantáneo de secuencias y composición de aminoácidos",
      icon: <FaBiohazard/>
    }
  ];

  const databases = [
    {
      name: "UniProt",
      description: "Base de datos universal de proteínas con información funcional completa",
      stats: "200M+ secuencias"
    },
    {
      name: "NCBI",
      description: "Centro Nacional de Información Biotecnológica con GenBank y RefSeq",
      stats: "300M+ secuencias"
    },
    {
      name: "PDB",
      description: "Banco de Datos de Proteínas con estructuras tridimensionales",
      stats: "200K+ estructuras"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Plataforma de
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Análisis Proteómico
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            Una herramienta avanzada para la exploración, análisis y visualización de proteínas 
            que integra múltiples bases de datos científicas en una interfaz moderna e intuitiva.
          </p>
        </div>

        {/* Overview */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">¿Qué es ProteinExplorer?</h2>
              <div className="space-y-4 text-blue-100 text-lg">
                <p>
                  ProteinExplorer es una plataforma web avanzada diseñada para investigadores, 
                  estudiantes y profesionales en bioinformática que necesitan acceder, analizar 
                  y visualizar información proteómica de manera eficiente.
                </p>
                <p>
                  Nuestra herramienta integra las principales bases de datos científicas mundiales, 
                  ofreciendo una experiencia unificada para la exploración de estructuras proteicas, 
                  análisis de secuencias y visualización molecular interactiva.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-500/20 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">500M+</div>
                  <div className="text-sm text-blue-200">Proteínas Indexadas</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">200K+</div>
                  <div className="text-sm text-blue-200">Estructuras 3D</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-400 mb-2">99.9%</div>
                  <div className="text-sm text-blue-200">Tiempo Activo</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">&lt;2s</div>
                  <div className="text-sm text-blue-200">Tiempo Respuesta</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-blue-100 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Databases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Bases de Datos Integradas</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {databases.map((db, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{db.name}</h3>
                <p className="text-blue-100 mb-6">{db.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <span className="text-blue-200">Contenido:</span>
                  <span className="text-lg font-bold text-white">{db.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold text-white mb-6"> Nuestra Misión</h3>
            <p className="text-blue-100">
              Democratizar el acceso a la información proteómica mediante herramientas 
              tecnológicas avanzadas que aceleren la investigación científica y el 
              descubrimiento de nuevos tratamientos médicos.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold text-white mb-6"> Nuestra Visión</h3>
            <p className="text-blue-100">
              Ser la plataforma líder mundial en análisis proteómico, facilitando 
              breakthroughs científicos que transformen la medicina personalizada 
              y la biotecnología del futuro.
            </p>
          </div>
        </div>

        {/* Technology */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-12 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Tecnologías Utilizadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
            
              <div className="text-white font-bold">React 18</div>
              <div className="text-blue-200 text-sm">Frontend</div>
            </div>
            <div className="text-center">
            
              <div className="text-white font-bold">Canvas API</div>
              <div className="text-blue-200 text-sm">Visualización</div>
            </div>
            <div className="text-center">
            
              <div className="text-white font-bold">Tailwind</div>
              <div className="text-blue-200 text-sm">Estilos</div>
            </div>
            <div className="text-center">
             
              <div className="text-white font-bold">REST APIs</div>
              <div className="text-blue-200 text-sm">Integración</div>
            </div>
            <div className="text-center">
            
              <div className="text-white font-bold">Web Workers</div>
              <div className="text-blue-200 text-sm">Performance</div>
            </div>
            <div className="text-center">
            
              <div className="text-white font-bold">IndexedDB</div>
              <div className="text-blue-200 text-sm">Cache</div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default About;


