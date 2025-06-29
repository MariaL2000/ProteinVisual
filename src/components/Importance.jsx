import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
    importanceData,
    visualizationBenefits,
    searchCapabilities,
    impactStatistics,
    futureVisionCards
} from '../mocks/importanceData';
import { FaMicroscope,FaSearch, FaDna,FaBiohazard } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";

const Importance = () => {

    // Controla qué sección del carrusel está activa (0, 1, 2, 3)
    const [activeSection, setActiveSection] = useState(0);
    
    // Detecta si el componente está visible en el viewport actual
    const [isVisible, setIsVisible] = useState(false);
    
    // Rastrea si el componente ya fue visible alguna vez (para evitar reset)
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    
    /**
     * useRef crea una referencia mutable que persiste durante toda la vida del componente
     * - No causa re-renders cuando cambia (a diferencia de useState)
     * - .current contiene el valor actual (inicialmente null)
     * - Se usa para acceder directamente a elementos DOM
     */
    const sectionRef = useRef(null);  
    useEffect(() => {
        /**
         * IntersectionObserver es una API nativa del navegador que observa
         * cuando un elemento entra o sale del viewport de manera eficiente
         */
        const observer = new IntersectionObserver(
            // Callback que se ejecuta cuando cambia la intersección
            ([entry]) => {
                const isIntersecting = entry.isIntersecting;//= true cuando el elemento es visible
                setIsVisible(isIntersecting);// Actualiza el estado de visibilidad actual
                
                // Si es visible Y nunca antes fue visible, marca como "ya visto"
                // Esto evita que se resetee el estado al hacer scroll hacia arriba
                if (isIntersecting && !hasBeenVisible) {
                    setHasBeenVisible(true);
                }
            },
            {
                // threshold: 0.1 significa que se activa cuando el 10% del elemento es visible
                threshold: 0.1,
            }
        );
        const currentElement = sectionRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }
        return () => {
            // Desconectamos el observer para evitar memory leaks
            observer.disconnect();
        };
    }, [hasBeenVisible]); // Dependencia: solo se re-ejecuta si hasBeenVisible cambia

    
    useEffect(() => { //para la rotacion automatica de las cards
        if (!isVisible || importanceData.length <= 1) return;
        const interval = setInterval(() => {
            setActiveSection((prev) => {
                return (prev + 1) % importanceData.length;
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [isVisible]); // Solo se re-ejecuta cuando cambia isVisible


    const handleSectionChange = useCallback((index) => {
        setActiveSection(index); //evito re-renders
    }, []); // Array vacío = la función nunca cambia

    const activeItem = useMemo(() => { //slo recalcula si activeSection cambia
        return importanceData[activeSection];
    }, [activeSection]); 

    return (
        <section 
            ref={sectionRef}
            className="py-16 sm:py-24 bg-slate-900 relative overflow-hidden"
        >
            {/* ===== DECORACIÓN DE FONDO ===== */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20"></div>
            
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* ===== HEADER PRINCIPAL ===== */}
                <header className="text-center mb-16">
                    {/* Badge con icono */}
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6 shadow-lg">
                        <span className="text-2xl mr-2" role="img" aria-label="microscope"> <FaMicroscope/></span>
                        <span className="text-sm font-semibold text-gray-700">¿Por qué es importante?</span>
                    </div>
                    
                    {/* Título principal con gradiente */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        La Revolución de la

                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Búsqueda Proteómica
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        La capacidad de buscar, analizar y visualizar proteínas está transformando la medicina,
                        la biotecnología y nuestra comprensión de la vida misma.
                    </p>
                </header>

                {/* ===== CARRUSEL PRINCIPAL ===== */}
                <section className="mb-20" aria-label="Aplicaciones principales">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            {/* Mapeo de datos importados */}
                            {importanceData.map((item, index) => (
                                <article
                                    key={item.id} 
                                    className={`transition-all duration-500 transform cursor-pointer ${
                                    
                                        activeSection === index
                                            ? 'opacity-100 translate-x-0 scale-100' // Activo: visible y en posición
                                            : 'opacity-40 translate-x-4 scale-95 hover:opacity-70' // Inactivo: semi-transparente y desplazado
                                    }`}
                                   
                                    onClick={() => handleSectionChange(index)}
                                    
                                    
                                    role="button" // Indica que es clickeable
                                    tabIndex={0}  // Permite navegación por teclado
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault(); 
                                            handleSectionChange(index);
                                        }
                                    }}
                                    aria-label={`Seleccionar ${item.title}`} 
                                >
                                    {/* Contenedor de la tarjeta */}
                                    <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                                        activeSection === index
                                            ? `${item.bgColor} border-current shadow-lg` // Activo: colores específicos
                                            : 'bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/30 hover:shadow-md' // Inactivo: glassmorphism
                                    }`}>
                                        
                                        {/* Header de la tarjeta */}
                                        <div className="flex items-center gap-4 mb-4">
                                            {/* Icono con gradiente */}
                                            <div className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg transform transition-transform duration-300 ${
                                                activeSection === index ? 'scale-110' : 'hover:scale-105'
                                            }`}>
                                                <span role="img" aria-label={item.title}>{item.icon}</span>
                                            </div>
                                            
                                            {/* Información */}
                                            <div>
                                                <h2 className={`text-xl font-bold transition-colors duration-300 ${
                                                    activeSection === index ? item.textColor : 'text-white'
                                                }`}>
                                                    {item.title}
                                                </h2>
                                                <div className={`text-2xl font-bold transition-colors duration-300 ${
                                                    activeSection === index ? item.textColor : 'text-gray-300'
                                                }`}>
                                                    {item.stats.value}
                                                </div>
                                                <div className="text-sm text-gray-400">{item.stats.label}</div>
                                            </div>
                                        </div>
                                        
                                        {/* Descripción */}
                                        <p className={`mb-4 leading-relaxed transition-colors duration-300 ${
                                            activeSection === index ? 'text-gray-700' : 'text-gray-300'
                                        }`}>
                                            {item.description}
                                        </p>
                                        
                                
                                        {/* Solo muestra detalles si está activo */}
                                        {activeSection === index && (
                                            <div className="animate-fadeIn">
                                                <ul className="space-y-2" role="list">
                                                    {item.details.map((detail, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                           
                                                            <span 
                                                                className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0" 
                                                                aria-hidden="true" // No es contenido, solo decoración
                                                            ></span>
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* ===== INDICADOR VISUAL ===== */}
                        <aside className="relative">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
                                <div className="text-center mb-8">
                                    {/* Icono animado del elemento activo */}
                                    <div className="text-6xl mb-4 animate-bounce">
                                        <span role="img" aria-label={activeItem.title}>{activeItem.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">
                                        {activeItem.title}
                                    </h3>
                                    <div className="text-3xl font-bold mb-1">
                                        {activeItem.stats.value}
                                    </div>
                                    <div className="text-blue-100">
                                        {activeItem.stats.label}
                                    </div>
                                </div>
                                
                                {/* ===== INDICADORES DE PROGRESO ===== */}
                                <nav className="flex justify-center gap-2" aria-label="Navegación del carrusel">
                                    {importanceData.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSectionChange(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
                                                activeSection === index
                                                    ? 'bg-white shadow-lg' // Activo: blanco sólido
                                                    : 'bg-white/30 hover:bg-white/50' // Inactivo: semi-transparente
                                            }`}
                                            aria-label={`Ir a ${importanceData[index].title}`}
                                        />
                                    ))}
                                </nav>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* ===== CAPACIDADES DE BASES DE DATOS ===== */}
                <section className="mb-20" aria-label="Capacidades de bases de datos">
                    <div className="text-center mb-12">




                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Acceso a Bases de Datos Globales
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Conectamos con las principales bases de datos científicas del mundo para ofrecerte
                            información completa y actualizada.
                        </p>
                    </div>
                    
                    {/* Grid responsivo de bases de datos */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {searchCapabilities.map((db, index) => (
                            <article
                                key={db.database} 
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 hover:border-white/30 group"
                            >
                                <div className="text-center">
                                    {/* Icono que escala con hover del grupo padre */}
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <span role="img" aria-label={db.database}>{db.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{db.database}</h3>
                                    
                                    {/* Badge con número de registros */}
                                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${db.color}`}>
                                        {db.records} registros
                                    </div>
                                    
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {db.specialty}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* ===== BENEFICIOS DE LA VISUALIZACIÓN ===== */}
                <section className="mb-16" aria-label="Beneficios de la visualización">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            El Poder de la Visualización
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            La visualización de datos proteómicos no es solo estética, es una herramienta
                            científica fundamental que acelera el descubrimiento.
                        </p>
                    </div>
                    
                    {/* Grid responsivo de beneficios */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {visualizationBenefits.map((benefit, index) => (
                            <article
                                key={index} 
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 group hover:border-blue-400/50"
                            >
                               
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <span role="img" aria-label={benefit.title}>{benefit.icon}</span>
                                </div>
                                
                                {/* Título con cambio de color en hover */}
                                <h3 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                    {benefit.title}
                                </h3>
                                
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

               
                <section className="bg-gradient-to-r from-blue-600 to-dark-600 rounded-2xl p-8 text-center text-white shadow-2xl mb-20">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Únete a la Revolución Científica
                        </h2>
                        <p className="text-lg mb-8 text-blue-100">
                            Cada búsqueda, cada visualización, cada descubrimiento nos acerca más a
                            resolver los misterios de la vida y desarrollar tratamientos que salvan vidas.
                        </p>
                   
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="flex items-center gap-2 text-blue-100">
                                <span className="text-2xl" role="img" aria-label="rocket"><IoIosRocket /></span>
                                <span className="font-semibold">Comienza tu búsqueda ahora</span>
                            </div>
                            
                         
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-1">
                                   
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></span>
                                    <span>600M+ proteínas disponibles</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" aria-hidden="true"></span>
                                    <span>Actualizado diariamente</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== ESTADÍSTICAS DE IMPACTO ===== */}
                <section className="mb-20" aria-label="Estadísticas de impacto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {impactStatistics.map((stat, index) => (
                            <div key={index} className="text-center group">
                                {/* Número grande con efecto hover */}
                                <div className={`text-3xl sm:text-4xl font-bold mb-2 transition-transform duration-300 group-hover:scale-110 ${stat.color}`}>
                                    {stat.value}
                                </div>
                                {/* Descripción */}
                                <div className="text-sm text-gray-300 leading-tight">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== VISIÓN DEL FUTURO ===== */}
                <section className="mb-16 bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden">
                    {/* Overlay decorativo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                    
                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <div className="text-4xl mb-4">
                                <span role="img" aria-label="crystal ball"><IoIosRocket /></span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                El Futuro de la Medicina Personalizada
                            </h2>
                            <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
                                Estamos construyendo un futuro donde cada tratamiento médico será diseñado
                                específicamente para el perfil proteómico único de cada paciente.
                            </p>
                        </div>
                        
                        {/* Grid de tarjetas de visión futura */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            {futureVisionCards.map((card, index) => (
                                <article
                                    key={index}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 group"
                                >
                                    <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                        <span role="img" aria-label={card.title}>{card.icon}</span>
                                    </div>
                                    <h3 className="font-bold mb-2">{card.title}</h3>
                                    <p className="text-sm text-blue-100">
                                        {card.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                
            </div>
        </section>
    );
};

export default Importance;
