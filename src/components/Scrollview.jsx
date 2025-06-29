import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Intro from './Intro';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const logoMaskRef = useRef(null);
  const heroImageRef = useRef(null);
  const overlayImageRef = useRef(null);
  const uiElementsRef = useRef(null);
  const introSectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animación de entrada del hero
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(heroImageRef.current, {
        scale: 1.2,
        duration: 1.5,
        ease: "power2.out"
      })
      .from(uiElementsRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=1");

      // Animación de máscara en scroll - MEJORADA
      const maskTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom center", // REDUCIDO para que termine antes
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            const maskSize = gsap.utils.interpolate(
              "clamp(300vh, 500vw, 600vh)",
              "min(15vh, 15vw)",
              progress
            );
            
            if (logoMaskRef.current) {
              gsap.set(logoMaskRef.current, {
                maskSize: maskSize,
                WebkitMaskSize: maskSize
              });
            }

            // Fade out más gradual
            gsap.set([overlayImageRef.current, uiElementsRef.current], {
              opacity: 1 - (progress * 0.8)
            });
          }
        }
      });

      // NUEVA ANIMACIÓN: Revelar la sección Intro
      gsap.fromTo(introSectionRef.current, 
        {
          y: "100vh",
          opacity: 0
        },
        {
          y: "0vh",
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "50% top", // Comienza cuando el hero está a la mitad
            end: "bottom top",
            scrub: 1
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const logoSvg = `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="80" fill="black"/>
      <text x="100" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="white">PROTEIN</text>
      <text x="100" y="115" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="white">EXPLORER</text>
      <circle cx="100" cy="100" r="85" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
    </svg>
  `)}`;

  return (
    <>
      {/* CONTENEDOR PRINCIPAL */}
      <section
        ref={sectionRef}
        className="relative w-full h-[200vh] overflow-hidden bg-slate-900"
      >
        {/* Contenedor de imagen con máscara */}
        <div
          ref={logoMaskRef}
          className="fixed inset-0 w-full h-screen bg-white z-10" // Z-INDEX CONTROLADO
          style={{
            maskImage: `url("${logoSvg}")`,
            maskPosition: "center center",
            maskRepeat: "no-repeat",
            maskSize: "clamp(300vh, 500vw, 600vh)",
            WebkitMaskImage: `url("${logoSvg}")`,
            WebkitMaskPosition: "center center",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "clamp(300vh, 500vw, 600vh)"
          }}
        >
          {/* Imagen de fondo principal */}
          <div
            ref={heroImageRef}
            className="relative w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80"
              alt="DNA Background"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            
            <img
              ref={overlayImageRef}
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80"
              alt="Protein Structure"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
              loading="eager"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
          </div>
        </div>

        {/* Elementos de UI */}
        <div
          ref={uiElementsRef}
          className="fixed inset-0 flex flex-col items-center justify-center h-screen px-4 sm:px-8 lg:px-20 py-8 lg:py-16 z-20" // Z-INDEX MÁS ALTO
        >
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
                Explora el Mundo
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  de las Proteínas
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto px-4">
                Descubre, analiza y visualiza estructuras proteicas
              </p>
            </div>
            <button className="px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
              Comenzar Ahora
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN INTRO CON ANIMACIÓN DE REVELADO */}
      <div 
        ref={introSectionRef}
        className="relative bg-slate-900 z-30" // Z-INDEX MÁS ALTO QUE EL HERO
        style={{
          // Asegurar que esté por encima del hero cuando aparezca
          transform: 'translateZ(0)' // Forzar nuevo contexto de apilamiento
        }}
      >
        <Intro />
      </div>
    </>
  );
};

export default HeroSection;
