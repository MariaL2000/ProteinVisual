import React, { useState, useMemo, useCallback } from 'react';
import Results from './Results';
import { searchProteins } from '../services/ProteinServices';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [proteins, setProteins] = useState({
    uniprot: [],
    ncbi: [],
    pdb: []
  });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const totalProteins = useMemo(() => {
    return proteins.uniprot.length + proteins.ncbi.length + proteins.pdb.length;
  }, [proteins]);

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchProteins(searchTerm);
      setProteins(results);
      setHasSearched(true);
    } catch (error) {
      console.error('Error en búsqueda:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 p-5">
         
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Búsqueda de
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Proteínas
            </span>
          </h1>
          
          <p className="text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
            Explora millones de proteínas en múltiples bases de datos científicas
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-12 lg:mb-16">
          <div className="relative">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar proteína (ej: insulin, hemoglobin, p53)"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-lg backdrop-blur-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-blue-300/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <button
                onClick={handleSearch}
                disabled={loading || !searchTerm.trim()}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center min-w-[140px]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Buscando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Buscar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {hasSearched && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-300 mb-2">{totalProteins}</div>
                <div className="text-sm lg:text-base text-blue-100/80 font-medium">Total Encontradas</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-emerald-300 mb-2">{proteins.uniprot.length}</div>
                <div className="text-sm lg:text-base text-emerald-100/80 font-medium">UniProt</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-300 mb-2">{proteins.ncbi.length}</div>
                <div className="text-sm lg:text-base text-purple-100/80 font-medium">NCBI</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-300 mb-2">{proteins.pdb.length}</div>
                <div className="text-sm lg:text-base text-orange-100/80 font-medium">PDB</div>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {hasSearched && totalProteins > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {[...proteins.uniprot, ...proteins.ncbi, ...proteins.pdb].map((protein, index) => (
              <Results key={`${protein.fuente}-${protein.id}-${index}`} protein={protein} />
            ))}
          </div>
        )}

        {/* No Results State */}
        {hasSearched && totalProteins === 0 && !loading && (
          <div className="text-center py-16 lg:py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-slate-600/20 to-blue-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-slate-400/20">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                No se encontraron resultados
              </h3>
              
              <p className="text-lg text-blue-100/70 mb-8 leading-relaxed">
                Intenta con otro término de búsqueda o verifica la ortografía
              </p>
              
              <div className="space-y-2 text-sm text-blue-200/60">
                <p>Sugerencias:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {['insulin', 'hemoglobin', 'collagen', 'albumin'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchTerm(suggestion)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-blue-200 hover:text-white transition-all duration-200 border border-white/10 hover:border-white/20"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
