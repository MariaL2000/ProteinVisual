import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { 
  databases, 
  getGradientColors, 
  colorConfig 
} from '../mocks/databasesData';

export default function Intro() {
  const [activeCard, setActiveCard] = useState(null)
  

  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const ctaRef = useRef(null)


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Crear contexto para cleanup automático
    const ctx = gsap.context(() => {
      
    
      gsap.fromTo(headerRef.current,
        {
          // Estado inicial: invisible, desplazado hacia abajo, pequeño
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          // Estado final: visible, en posición, tamaño normal
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out", // Curva de animación suave
          scrollTrigger: {
            trigger: sectionRef.current, // Elemento que activa la animación
            start: "top 70%", // Cuando el top del elemento llega al 70% del viewport
            toggleActions: "play none none reverse" // play al entrar, reverse al salir
          }
        }
      )

     
      gsap.fromTo(cardsRef.current.children, // Anima todos los hijos del container
        {
          // Estado inicial: invisible, abajo, pequeño, rotado
          opacity: 0,
          y: 80,
          scale: 0.8,
          rotationY: 15 // Rotación 3D en Y
        },
        {
          // Estado final: visible, en posición, tamaño normal, sin rotación
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "back.out(1.7)", // Efecto de rebote
          stagger: 0.2, // Delay de 0.2s entre cada card
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

     
      gsap.fromTo(ctaRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef) // Contexto limitado al sectionRef

  
    return () => ctx.revert()
  }, []) // Array vacío = solo se ejecuta una vez

 
  const getColors = (gradient) => {
    return getGradientColors(gradient)
  }

  return (
    <section
      ref={sectionRef} 
      id="information"
      className="relative py-20 sm:py-32 overflow-hidden"
      style={{
      
        background: `
          radial-gradient(circle at center, rgba(51, 65, 85, 0.4) 0%, rgba(15, 23, 42, 0.8) 40%, rgb(15, 23, 42) 100%),
          radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 50% 80%, rgba(34, 197, 94, 0.03) 0%, transparent 60%),
          rgb(15, 23, 42)
        `
      }}
    >
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
       
        <div ref={headerRef} className="text-center mb-20">
        
          
        
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Explore Scientific
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              Databases
            </span>
          </h2>
          
        
          <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Access the world's most comprehensive biological databases. Search through millions
            of sequences, structures, and scientific literature in one unified platform.
          </p>
        </div>

      
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 mb-20">
         
          {databases.map((db, index) => (
            <div
              key={db.id} 
              className={`group relative bg-slate-800/30 backdrop-blur-sm rounded-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 shadow-2xl ${
                activeCard === db.id ? 'scale-105 -translate-y-2 shadow-3xl' : ''
              }`}
              style={{
                //
                boxShadow: activeCard === db.id
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.2)'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
              }}
              
              onMouseEnter={() => setActiveCard(db.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
            
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
                style={{
                  background: `linear-gradient(135deg, ${getColors(db.gradient)})`
                }}
              />
              
              
              <div className="relative p-8">
                
              
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                  
                    <div
                      className="text-4xl p-4 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${getColors(db.gradient)})`
                      }}
                    >
                      {db.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{db.name}</h3>
                      <p className="text-sm text-slate-400 font-medium">{db.fullName}</p>
                    </div>
                  </div>
                </div>

              
                <p className="text-slate-300 leading-relaxed mb-6">
                  {db.description}
                </p>

               
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                  
                    {db.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                      
                        <span
                          className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0 shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${getColors(db.gradient)})`
                          }}
                        />


<span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              
                <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-slate-900/40 backdrop-blur-sm rounded-2xl">
               
                  {Object.entries(db.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      {/* Valor con gradiente de texto */}
                      <div
                        className="text-xl font-bold bg-clip-text text-transparent"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${getColors(db.gradient)})`
                        }}
                      >
                        {value}
                      </div>
                      {/* Label formateado */}
                      <div className="text-xs text-slate-400 capitalize font-medium mt-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={db.website}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="group/btn inline-flex items-center justify-center w-full px-6 py-4 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${getColors(db.gradient)})`
                  }}
                >
                  <span>Visit {db.name}</span>
                  {/* Flecha animada */}
                  <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-2">
                    →
                  </span>
                </a>
              </div>

              {/* ===== NÚMERO FLOTANTE MODERNO ===== */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-slate-700/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-sm font-bold shadow-2xl">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* ===== BOTTOM CTA MODERNO ===== */}
        <div ref={ctaRef} className="text-center">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-slate-800/40 backdrop-blur-sm rounded-full shadow-2xl hover:bg-slate-700/40 transition-all duration-300 transform hover:scale-105">
            <span className="text-slate-300 font-medium">Ready to start exploring?</span>
            <a
              href="#search"
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Begin Search
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
