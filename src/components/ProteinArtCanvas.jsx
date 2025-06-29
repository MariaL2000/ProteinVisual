import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { AMINOACID_COLORS, AMINOACID_PROPERTIES, getAminoacidColor } from '../mocks/AminoacidsColors';

const ProteinArtCanvas = ({ protein }) => {
  // useRef para referenciar el canvas sin causar re-renders
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Estados para interactividad
  const [hoveredAminoacid, setHoveredAminoacid] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [visualizationMode, setVisualizationMode] = useState('spiral');
  const [isAnimating, setIsAnimating] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // useMemo para cálculos costosos que no deben repetirse
  const aminoacidSequence = useMemo(() => {
    if (!protein?.secuencia || protein.secuencia === 'Secuencia no disponible') {
      // Secuencia de ejemplo para demostración
      return 'MKTVRQERLKSIVRILERSKEPVSGAQLAEELSVSRQVIVQDIAYLRSLGYNIVATPRGYVLAGG';
    }
    return protein.secuencia.replace(/[^ACDEFGHIKLMNPQRSTVWY]/g, ''); // Solo aminoácidos válidos
  }, [protein?.secuencia]);

  // useMemo para estadísticas de aminoácidos (cálculo costoso)
  const aminoacidStats = useMemo(() => {
    const stats = {};
    const total = aminoacidSequence.length;
    
    for (const aa of aminoacidSequence) {
      stats[aa] = (stats[aa] || 0) + 1;
    }
    
    // Convertir a porcentajes
    Object.keys(stats).forEach(aa => {
      stats[aa] = {
        count: stats[aa],
        percentage: ((stats[aa] / total) * 100).toFixed(1)
      };
    });
    
    return stats;
  }, [aminoacidSequence]);

  // useCallback para funciones que se pasan como props o se usan en efectos
  const drawAminoacid = useCallback((ctx, x, y, aminoacid, index, time) => {
    const props = AMINOACID_PROPERTIES[aminoacid] || AMINOACID_PROPERTIES['G'];
    const baseRadius = 8 * props.size;
    
    // Animación de pulsación
    const pulse = isAnimating ? 1 + 0.2 * Math.sin(time * 0.01 * animationSpeed + index * 0.1) : 1;
    const radius = baseRadius * pulse;
    
    // Color con efecto hover
    const isHovered = hoveredAminoacid === index;
    const color = getAminoacidColor(aminoacid, isHovered ? 1 : 0.8);
    
    // Sombra
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = isHovered ? 15 : 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Círculo principal
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Borde especial para Glicina
    if (aminoacid === 'G') {
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Efecto de brillo
    const gradient = ctx.createRadialGradient(x - radius/3, y - radius/3, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Texto del aminoácido
    if (isHovered || radius > 10) {
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = aminoacid === 'G' ? '#333' : '#fff';
      ctx.font = `bold ${Math.min(radius * 0.8, 14)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(aminoacid, x, y);
    }
  }, [hoveredAminoacid, isAnimating, animationSpeed]);

  // useCallback para diferentes modos de visualización
  const calculatePosition = useCallback((index, total, canvasWidth, canvasHeight, time) => {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    
    switch (visualizationMode) {
      case 'spiral':
        const angle = (index / total) * Math.PI * 8 + (time * 0.001 * animationSpeed);
        const radius = 50 + (index / total) * Math.min(canvasWidth, canvasHeight) * 0.3;
        return {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius
        };
        
      case 'circular':
        const circleAngle = (index / total) * Math.PI * 2 + (time * 0.002 * animationSpeed);
        const circleRadius = Math.min(canvasWidth, canvasHeight) * 0.35;
        return {
          x: centerX + Math.cos(circleAngle) * circleRadius,
          y: centerY + Math.sin(circleAngle) * circleRadius
        };
        
      case 'linear':
        const cols = Math.ceil(Math.sqrt(total));
        const spacing = Math.min(canvasWidth / cols, canvasHeight / cols) * 0.8;
        const startX = (canvasWidth - (cols - 1) * spacing) / 2;
        const startY = (canvasHeight - (Math.ceil(total / cols) - 1) * spacing) / 2;
        return {
          x: startX + (index % cols) * spacing,
          y: startY + Math.floor(index / cols) * spacing
        };
        
      case 'wave':
        const waveX = (index / total) * canvasWidth;
        const waveY = centerY + Math.sin((index / total) * Math.PI * 4 + time * 0.003 * animationSpeed) * 100;
        return { x: waveX, y: waveY };
        
      default:
        return { x: centerX, y: centerY };
    }
  }, [visualizationMode, animationSpeed]);

  // useCallback para el loop de animación
  const animate = useCallback((time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Limpiar canvas con gradiente de fondo
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#0f0f23');
    bgGradient.addColorStop(0.5, '#1a1a3a');
    bgGradient.addColorStop(1, '#0f0f23');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Dibujar conexiones entre aminoácidos
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    const positions = [];
    for (let i = 0; i < aminoacidSequence.length; i++) {
      const pos = calculatePosition(i, aminoacidSequence.length, width, height, time);
      positions.push(pos);
      
      if (i > 0) {
        ctx.moveTo(positions[i-1].x, positions[i-1].y);
        ctx.lineTo(pos.x, pos.y);
      }
    }
    ctx.stroke();
    
    // Dibujar aminoácidos
    aminoacidSequence.split('').forEach((aminoacid, index) => {
      const pos = calculatePosition(index, aminoacidSequence.length, width, height, time);
      drawAminoacid(ctx, pos.x, pos.y, aminoacid, index, time);
    });
    
    // Continuar animación
    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [aminoacidSequence, calculatePosition, drawAminoacid, isAnimating]);

  // useCallback para manejo de mouse
  const handleMouseMove = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePos({ x, y });
    
    // Detectar hover sobre aminoácidos
    let hoveredIndex = null;
    const time = Date.now();
    
    for (let i = 0; i < aminoacidSequence.length; i++) {
      const pos = calculatePosition(i, aminoacidSequence.length, canvas.width, canvas.height, time);
      const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      const aminoacid = aminoacidSequence[i];
      const props = AMINOACID_PROPERTIES[aminoacid] || AMINOACID_PROPERTIES['G'];
      const radius = 8 * props.size;
      
      if (distance < radius) {
        hoveredIndex = i;
        break;
      }
    }
    
    setHoveredAminoacid(hoveredIndex);
  }, [aminoacidSequence, calculatePosition]);

  // useEffect para inicializar canvas y animación
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Configurar canvas
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Iniciar animación
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // useEffect para redimensionar canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-6 backdrop-blur-sm border border-purple-400/30">
            <span className="text-sm font-medium text-purple-200 uppercase tracking-wide">
              Visualización Molecular
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Estructura
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Proteómica 3D
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
            {protein?.nombre || 'Proteína de ejemplo'} • {aminoacidSequence.length} aminoácidos
          </p>
        </div>

        {/* Main Canvas Container */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6 lg:p-8 mb-8">
          
          {/* Controls */}
          <div className="mb-6 flex flex-wrap gap-4 items-center justify-center lg:justify-start">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <label className="text-sm font-medium text-white">Modo:</label>
              <select
                value={visualizationMode}
                onChange={(e) => setVisualizationMode(e.target.value)}
                className="bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50"
              >
                <option value="spiral" className="text-gray-800">Espiral</option>
                <option value="circular" className="text-gray-800">Circular</option>
                <option value="linear" className="text-gray-800">Lineal</option>
                <option value="wave" className="text-gray-800">Onda</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <label className="text-sm font-medium text-white">Velocidad:</label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="w-20 accent-purple-400"
              />
              <span className="text-sm text-blue-200 min-w-[30px]">{animationSpeed}x</span>
            </div>
            
            <button
            onClick={() => setIsAnimating(!isAnimating)}
className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
  isAnimating
    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white shadow-lg hover:shadow-red-500/25'
    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-lg hover:shadow-green-500/25'
}`}
>
<div className="w-4 h-4 flex items-center justify-center">
  {isAnimating ? (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
    </svg>
  ) : (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
    </svg>
  )}
</div>
{isAnimating ? 'Pausar' : 'Animar'}
</button>
</div>

{/* Canvas */}
<div className="relative mb-6">
<canvas
ref={canvasRef}
onMouseMove={handleMouseMove}
onMouseLeave={() => setHoveredAminoacid(null)}
className="w-full h-96 lg:h-[500px] rounded-2xl cursor-crosshair border border-white/20"
style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a3a)' }}
/>

{/* Tooltip */}
{hoveredAminoacid !== null && (
<div
  className="absolute bg-gradient-to-r from-gray-900 to-black text-white px-4 py-3 rounded-xl text-sm pointer-events-none z-10 shadow-2xl border border-white/20 backdrop-blur-sm"
  style={{
    left: mousePos.x + 10,
    top: mousePos.y - 10,
    transform: 'translate(0, -100%)'
  }}
>
  <div className="font-bold text-base mb-1">
    {aminoacidSequence[hoveredAminoacid]} - Posición {hoveredAminoacid + 1}
  </div>
  <div className="text-xs text-blue-200">
    {AMINOACID_PROPERTIES[aminoacidSequence[hoveredAminoacid]]?.name || 'Desconocido'}
  </div>
  <div className="text-xs text-purple-200">
    Tipo: {AMINOACID_PROPERTIES[aminoacidSequence[hoveredAminoacid]]?.type || 'N/A'}
  </div>
</div>
)}
</div>
</div>

{/* Statistics and Legend Grid */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

{/* Composition Statistics */}
<div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6 lg:p-8">
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
</div>
<h3 className="text-2xl font-bold text-white">Composición de Aminoácidos</h3>
</div>

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-80 overflow-y-auto custom-scrollbar">
{Object.entries(aminoacidStats)
  .sort((a, b) => b[1].count - a[1].count)
  .map(([aa, stats]) => (
    <div
      key={aa}
      className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
    >
      <div
        className="w-5 h-5 rounded-full border-2 border-white/30 shadow-lg"
        style={{ backgroundColor: AMINOACID_COLORS[aa] }}
      />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-white text-lg">{aa}</div>
        <div className="text-xs text-blue-200">
          {stats.count} ({stats.percentage}%)
        </div>
      </div>
    </div>
  ))}
</div>
</div>

{/* Color Legend */}
<div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6 lg:p-8">
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
  </svg>
</div>
<h3 className="text-2xl font-bold text-white">Leyenda de Colores</h3>
</div>

<div className="space-y-4">
<div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
  <div className="w-6 h-6 bg-blue-500 rounded-full shadow-lg border-2 border-white/30"></div>
  <div>
    <div className="font-semibold text-white">Hidrofóbicos</div>
    <div className="text-sm text-blue-200">Repelen el agua, forman núcleo proteico</div>
  </div>
</div>

<div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
  <div className="w-6 h-6 bg-yellow-500 rounded-full shadow-lg border-2 border-white/30"></div>
  <div>
    <div className="font-semibold text-white">Polares</div>
    <div className="text-sm text-blue-200">Interactúan con agua, superficie proteica</div>
  </div>
</div>

<div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
  <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg border-2 border-white/30"></div>
  <div>
    <div className="font-semibold text-white">Básicos</div>
    <div className="text-sm text-blue-200">Carga positiva, sitios activos</div>
  </div>
</div>

<div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
  <div className="w-6 h-6 bg-purple-500 rounded-full shadow-lg border-2 border-white/30"></div>
  <div>
    <div className="font-semibold text-white">Ácidos</div>
    <div className="text-sm text-blue-200">Carga negativa, enlaces iónicos</div>
  </div>
</div>
</div>
</div>
</div>
</div>

{/* Custom Scrollbar Styles */}
<style jsx>{`
.custom-scrollbar::-webkit-scrollbar {
width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
background: rgba(255, 255, 255, 0.1);
border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
background: rgba(255, 255, 255, 0.3);
border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
background: rgba(255, 255, 255, 0.5);
}
`}</style>
</div>
);
};

export default ProteinArtCanvas;
