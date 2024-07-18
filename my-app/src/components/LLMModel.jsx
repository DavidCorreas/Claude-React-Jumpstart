import React from 'react';

const GanttChart = () => {
  // const addMonths = (dateStr, months) => {
  //   const date = new Date(dateStr);
  //   date.setMonth(date.getMonth() + months);
  //   return date.toISOString().split('T')[0];
  // };

  // const months_to_add = 0;

  const startDate = new Date('2024-10-01');
  const endDate = new Date('2026-01-01');
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

  const phases = [
    { name: 'Fase 1: Investigación y Propuesta', start: '2024-10-01', end: '2024-12-30', color: '#3498db' },
    { name: 'Fase 2: Desarrollo Inicial', start: '2024-12-01', end: '2025-03-30', color: '#2ecc71' },
    { name: 'Fase 3: Desarrollo Avanzado y Optimización', start: '2025-03-30', end: '2025-06-30', color: '#e67e22' },
    { name: 'Fase 4: Entrega e Implementación', start: '2025-06-30', end: '2026-01-01', color: '#9b59b6' },
  ];
  
  const activities = [
    { name: 'Propuesta de Proyecto', start: '2024-10-01', end: '2024-11-15', phase: 0 },
    { name: 'Análisis y Diseño', start: '2024-11-15', end: '2024-12-30', phase: 0 },

    { name: 'Creación del Entorno Virtual', start: '2024-12-01', end: '2025-2-15', phase: 1 },
    { name: 'Creación Base de Datos', start: '2025-01-01', end: '2025-03-1', phase: 1 },
    { name: 'Creación del Departamento de Licitaciones', start: '2025-01-30', end: '2025-03-30', phase: 1 },
    { name: 'Diseño de la Interfaz Web', start: '2025-03-01', end: '2025-03-30', phase: 1 },
    
    { name: 'Creación del Departamento de Gestión de Contratación', start: '2025-03-30', end: '2025-05-15', phase: 2 },
    { name: 'Login Seguro', start: '2025-05-1', end: '2025-06-1', phase: 2 },
    { name: 'Creación del Agente "Project Manager Personalizado"', start: '2025-05-15', end: '2025-6-30', phase: 2 },
    { name: 'Implementación del Sistema de Correo para los Agentes', start: '2025-6-15', end: '2025-6-30', phase: 2 },
    
    { name: 'Pruebas de Integración y Usuario', start: '2025-6-30', end: '2025-10-01', phase: 3 },
    { name: 'Gestión del Cambio', start: '2025-10-01', end: '2026-01-01', phase: 3 },
    
    { name: 'Infraestructura y Arquitectura', start: startDate, end: endDate, phase: -1 },
    { name: 'Gestión del Proyecto', start: startDate, end: endDate, phase: -1 },
  ];
  
  const milestones = [
    { name: 'Aprobación de Propuesta', date: '2024-12-30', phase: 0 },
    { name: 'Lanzamiento Versión Alfa', date: '2025-03-30', phase: 1 },
    { name: 'Lanzamieno Versión Beta', date: '2025-06-30', phase: 2 },
    { name: 'Lanzamiento Final', date: '2026-01-01', phase: 3 },
  ];

  const holidayPeriods = [
    { start: '2024-12-20', end: '2025-01-15', label: 'Navidad' },
    { start: '2024-08-01', end: '2024-08-30', label: 'Verano' },
    { start: '2025-07-1', end: '2025-08-31', label: 'Verano' },
  ];

  const renderHolidayPeriods = () => {
    return holidayPeriods.map((period, index) => {
      const holidayStart = new Date(period.start);
      const holidayEnd = new Date(period.end);
      
      // Ajustar las fechas si están fuera del rango del proyecto
      const adjustedStart = holidayStart < startDate ? startDate : holidayStart;
      const adjustedEnd = holidayEnd > endDate ? endDate : holidayEnd;
      
      const startPos = getPositionPercentage(adjustedStart);
      const width = getWidthPercentage(adjustedStart, adjustedEnd);
      
      if (width <= 0) return null; // No renderizar si está fuera del rango del proyecto

      return (
        <div key={index} className="absolute h-full" style={{
          left: `${startPos}%`,
          width: `${width}%`,
          backgroundColor: 'rgba(200, 200, 200, 0.3)',
          zIndex: 1,
        }}>
          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
            {period.label}
          </span>
        </div>
      );
    });
  };

  const getPositionPercentage = (date) => {
    const days = (new Date(date) - startDate) / (1000 * 60 * 60 * 24);
    return (days / totalDays) * 100;
  };

  const getWidthPercentage = (start, end) => {
    const startDays = (new Date(start) - startDate) / (1000 * 60 * 60 * 24);
    const endDays = (new Date(end) - startDate) / (1000 * 60 * 60 * 24);
    return ((endDays - startDays) / totalDays) * 100;
  };

  const getQuarters = () => {
    const quarters = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      quarters.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 3);
    }
    return quarters;
  };

  const getLighterColor = (color, opacity = 0.6) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Cronograma del Proyecto de Plataforma de Licitaciones IA</h2>
      <div className="relative border-l border-t border-gray-300 mt-12 ml-48 bg-white">
      {renderHolidayPeriods()}
      <div className="absolute top-0 left-0 w-full h-full">
          {getQuarters().map((quarter, index) => (
            <React.Fragment key={index}>
              <div className="absolute border-l border-gray-200" style={{ left: `${getPositionPercentage(quarter)}%`, height: '100%', top: '0' }}>
                <span className="absolute -top-8 -left-10 text-xs text-gray-500 w-20 text-center">
                  {quarter.toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}
                </span>
              </div>
            </React.Fragment>
          ))}    
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50 to-transparent opacity-50"></div>
        </div>
        {phases.map((phase, index) => (
          <div key={index} className="mb-12 relative z-10">
            <div className="h-8 rounded-full relative mb-4 shadow-sm  border-2 border-black" style={{ 
              backgroundColor: phase.color,
              marginLeft: `${getPositionPercentage(phase.start)}%`,
              width: `${getWidthPercentage(phase.start, phase.end)}%`
            }}>
              <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-semibold">
                {phase.name}
              </span>
            </div>
            <div className="relative">
              {activities.filter(activity => activity.phase === index).map((activity, actIndex) => {
                const startPos = getPositionPercentage(activity.start);
                const width = getWidthPercentage(activity.start, activity.end);
                const activityColor = getLighterColor(phase.color);
                const rowBackgroundColor = getLighterColor(phase.color, 0.05);
                
                return (
                  <div key={actIndex} className="min-h-[2rem] mb-2 flex items-center relative"
                      style={{
                        background: `linear-gradient(to right, ${rowBackgroundColor} 0%, ${rowBackgroundColor} 100%)`,
                      }}>
                    <div className="absolute right-full pr-4 w-48 text-right">
                      <span className="text-xs font-medium text-gray-700 leading-tight block">
                        {activity.name}
                      </span>
                    </div>
                    <div className="absolute h-6 rounded-full shadow-sm" style={{
                      backgroundColor: activityColor,
                      left: `${startPos}%`,
                      width: `${width}%`,
                      minWidth: '8px'
                    }}></div>
                  </div>
                );
              })}
              {milestones.filter(milestone => milestone.phase === index).map((milestone, milestoneIndex) => {
                const position = getPositionPercentage(milestone.date);
                
                return (
                  <div key={milestoneIndex} className="h-8 mb-1 flex items-center relative">
                    <div className="absolute right-full pr-4 w-48 text-right">
                      <span className="text-xs font-medium text-gray-700 leading-tight">{milestone.name}</span>
                    </div>
                    <div className="absolute h-6 w-6 rounded-full bg-[#ff0000] flex items-center justify-center shadow-sm" style={{
                      left: `${position}%`,
                      transform: 'translateX(-50%)'
                    }}>
                      <span className="text-white text-xs">★</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {/* Actividades transversales */}
        <div className="relative z-10 mt-8">
          {activities.filter(activity => activity.phase === -1).map((activity, actIndex) => {
            const startPos = getPositionPercentage(activity.start);
            const width = getWidthPercentage(activity.start, activity.end);
            
            return (
              <div key={actIndex} className="min-h-[2rem] mb-2 flex items-center relative">
                <div className="absolute right-full pr-4 w-48 text-right">
                  <span className="text-xs font-medium text-gray-700 leading-tight block">
                    {activity.name.split(' ').map((word, i, arr) => (
                      <React.Fragment key={i}>
                        {word}
                        {i < arr.length - 1 && <>&nbsp;</>}
                        {i % 3 === 2 && i !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
                <div className="absolute h-6 rounded-full shadow-sm" style={{
                  backgroundColor: '#9c9c9c',
                  left: `${startPos}%`,
                  width: `${width}%`,
                  minWidth: '8px'
                }}></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;