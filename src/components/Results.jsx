import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Results = ({ protein }) => {
  const [showSequence, setShowSequence] = useState(false);
  
  const getSourceColor = (fuente) => {
    switch (fuente) {
      case 'UniProt': return 'bg-blue-500';
      case 'NCBI': return 'bg-purple-500';
      case 'PDB': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSourceIcon = (fuente) => {
    switch (fuente) {
      case 'UniProt': return '🧪';
      case 'NCBI': return '🧬';
      case 'PDB': return '🔬';
      default: return '📊';
    }
  };

  const hasValidSequence = protein.secuencia && 
    protein.secuencia !== 'Secuencia no disponible' && 
    protein.secuencia.length > 0;

  const downloadProteinData = () => {
    const data = {
      id: protein.id,
      nombre: protein.nombre,
      organismo: protein.organismo,
      nombreComun: protein.nombreComun,
      funcion: protein.funcion,
      longitud: protein.longitud,
      secuencia: protein.secuencia,
      fuente: protein.fuente,
      fecha_descarga: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${protein.id}_protein_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copySequence = () => {
    if (hasValidSequence) {
      navigator.clipboard.writeText(protein.secuencia);
      // Aquí podrías agregar una notificación de éxito
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Header con fuente */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs text-white rounded-full ${getSourceColor(protein.fuente)} flex items-center gap-1`}>
            <span>{getSourceIcon(protein.fuente)}</span>
            {protein.fuente}
          </span>
          {hasValidSequence && (
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              ✓ Secuencia disponible
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500 font-mono">ID: {protein.id}</span>
      </div>
      
      {/* Nombre de la proteína */}
      <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
        {protein.nombre}
      </h3>
      
      {/* Información básica */}
      <div className="space-y-3 text-sm mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Longitud:</span>
          <span className="font-semibold text-blue-600">{protein.longitud.toLocaleString()} aa</span>
        </div>
        
        <div>
          <span className="text-gray-600">Organismo:</span>
          <p className="font-medium text-gray-800 mt-1">{protein.organismo}</p>
          {protein.nombreComun !== protein.organismo && (
            <p className="text-xs text-gray-500 italic">({protein.nombreComun})</p>
          )}
        </div>
        
        <div>
          <span className="text-gray-600">Función:</span>
          <p className="text-sm text-gray-700 mt-1 leading-relaxed">{protein.funcion}</p>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Botón principal de visualización */}
        {hasValidSequence && (
          <Link
            to="/visualize"
            state={{ protein }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <span className="mr-2">🎨</span>
            Ver Visualización
          </Link>
        )}

        {/* Botón de detalles */}
        <Link
          to={`/protein/${protein.id}`}
          state={{ protein }}
          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          <span className="mr-1">📊</span>
          Detalles
        </Link>

        {/* Botón de descarga */}
        <button
          onClick={downloadProteinData}
          className="inline-flex items-center px-3 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300"
          title="Descargar datos de la proteína"
        >
          <span className="mr-1">💾</span>
          Descargar
        </button>
      </div>
      
      {/* Sección de secuencia */}
      {hasValidSequence && (
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setShowSequence(!showSequence)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              <span className={`transform transition-transform ${showSequence ? 'rotate-90' : ''}`}>
                ▶
              </span>
              {showSequence ? 'Ocultar secuencia' : 'Ver secuencia'}
              <span className="text-xs text-gray-500">
                ({protein.secuencia.length} aminoácidos)
              </span>
            </button>
            
            {showSequence && (
              <button
                onClick={copySequence}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
                title="Copiar secuencia al portapapeles"
              >
                📋 Copiar
              </button>
            )}
          </div>
          
          {showSequence && (
            <div className="relative">
              <div className="p-3 bg-gray-50 rounded-lg border text-xs font-mono break-all max-h-40 overflow-y-auto leading-relaxed">
                {/* Formatear secuencia en grupos de 10 para mejor legibilidad */}
                {protein.secuencia.match(/.{1,10}/g)?.join(' ') || protein.secuencia}
              </div>
              
              {/* Estadísticas rápidas de la secuencia */}
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-600">
                <span>
                  <strong>A:</strong> {(protein.secuencia.match(/A/g) || []).length}
                </span>
                <span>
                  <strong>G:</strong> {(protein.secuencia.match(/G/g) || []).length}
                </span>
                <span>
                  <strong>C:</strong> {(protein.secuencia.match(/C/g) || []).length}
                </span>
                <span>
                  <strong>T:</strong> {(protein.secuencia.match(/T/g) || []).length}
                </span>
                {protein.secuencia.includes('L') && (
                  <span className="text-blue-600">
                    <strong>Proteína detectada</strong> (contiene aminoácidos)
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mensaje si no hay secuencia */}
      {!hasValidSequence && (
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>⚠️</span>
            <span>Secuencia no disponible para visualización</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
