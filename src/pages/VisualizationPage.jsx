import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProteinArtCanvas from '../components/ProteinArtCanvas';

const VisualizationPage = () => {
  const location = useLocation();
  const protein = location.state?.protein;

  if (!protein) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No se encontró información de la proteína
          </h2>
          <p className="text-gray-600 mb-6">
            Por favor, regresa a los resultados de búsqueda y selecciona una proteína.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
              >
                ← Volver a búsqueda
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">
                Visualización de Proteína
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-xs text-white rounded-full ${
                protein.fuente === 'UniProt' ? 'bg-blue-500' :
                protein.fuente === 'NCBI' ? 'bg-purple-500' :
                protein.fuente === 'PDB' ? 'bg-green-500' : 'bg-gray-500'
              }`}>
                {protein.fuente}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Protein Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {protein.nombre}
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-mono">{protein.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Longitud:</span>
                  <span className="font-semibold">{protein.longitud.toLocaleString()} aa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Organismo:</span>
                  <span>{protein.organismo}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Función:</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {protein.funcion}
              </p>
            </div>
          </div>
        </div>

        {/* Visualization Component */}
        <ProteinArtCanvas protein={protein} />
      </div>
    </div>
  );
};

export default VisualizationPage;
