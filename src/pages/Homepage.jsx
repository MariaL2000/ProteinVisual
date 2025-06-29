import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Importance from '../components/Importance';
import HeroSection from '../components/Scrollview'; // Usar HeroSection en lugar de HeroAnimation

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation - Siempre visible */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section con Intro integrado */}
        <HeroSection />

        {/* Contenido adicional que aparece después del scroll */}
        <div className="relative z-40 bg-slate-900">
          {/* Search Call-to-Action Section */}
          <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="mb-16">
                 
                  
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight">
                    Explora el
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400">
                      Universo Proteómico
                    </span>
                  </h2>
                  
                  <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                    Accede a millones de proteínas de las principales bases de datos científicas mundiales.
                    Herramientas avanzadas para investigación y análisis molecular.
                  </p>
                </div>

                {/* Main Search Button */}
                <div className="mb-20">
                  <Link
                    to="/search"
                    className="group inline-flex items-center px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg sm:text-xl rounded-2xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 border border-blue-400/30 hover:border-blue-300/50"
                  >
                    <span className="mr-3">Iniciar Búsqueda</span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16 max-w-4xl mx-auto">
                  <div className="text-left p-8 lg:p-10 bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:bg-slate-800/60">
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                      Base de Datos Completa
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      Más de 600 millones de proteínas de NCBI, UniProt y PDB.
                      Información actualizada y verificada científicamente.
                    </p>
                  </div>
                  
                  <div className="text-left p-8 lg:p-10 bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:bg-slate-800/60">
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                      Análisis Avanzado
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      Visualización 3D interactiva y algoritmos de última generación
                      para análisis estructural y funcional.
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
                  <div className="text-center p-6 lg:p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-300">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-2">2.3M+</div>
                    <div className="text-sm sm:text-base text-slate-400 font-medium">Búsquedas</div>
                  </div>
                  <div className="text-center p-6 lg:p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-300">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-400 mb-2">150+</div>
                    <div className="text-sm sm:text-base text-slate-400 font-medium">Países</div>
                  </div>
                  <div className="text-center p-6 lg:p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-300">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-400 mb-2">99.9%</div>
                    <div className="text-sm sm:text-base text-slate-400 font-medium">Disponibilidad</div>
                  </div>
                  <div className="text-center p-6 lg:p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-300">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-400 mb-2">24/7</div>
                    <div className="text-sm sm:text-base text-slate-400 font-medium">Soporte</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Importance Section */}
          <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Importance />
            </div>
          </section>

          {/* Additional CTA Section */}
          <section className="w-full py-16 sm:py-20 lg:py-24 bg-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
                  ¿Listo para comenzar tu
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    investigación científica?
                  </span>
                </h2>
                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                  Únete a miles de investigadores que confían en nuestra plataforma
                  para sus descubrimientos científicos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/search"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Explorar Ahora
                  </Link>
                  <Link
                    to="/about"
                    className="px-8 py-4 bg-slate-700 text-white font-semibold rounded-2xl hover:bg-slate-600 transition-all duration-300"
                  >
                    Saber Más
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
