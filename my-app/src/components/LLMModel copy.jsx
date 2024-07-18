import React from 'react';

const GanttChart = () => {
  const phases = [
    { name: 'Fase 1: Investigación y Propuesta', start: '2024-01-01', end: '2024-03-31', color: '#3498db' },
    { name: 'Fase 2: Desarrollo Inicial', start: '2024-04-01', end: '2024-09-30', color: '#2ecc71' },
    { name: 'Fase 3: Desarrollo Avanzado y Optimización', start: '2024-10-01', end: '2025-03-31', color: '#e67e22' },
    { name: 'Fase 4: Entrega e Implementación', start: '2025-04-01', end: '2025-09-30', color: '#9b59b6' },
  ];

  const activities = [
    { name: 'Propuesta de Proyecto', start: '2024-01-01', end: '2024-02-15', phase: 0 },
    { name: 'Análisis y Diseño', start: '2024-02-01', end: '2024-03-31', phase: 0 },
    { name: 'Creación del Entorno Virtual', start: '2024-04-01', end: '2024-05-31', phase: 1 },
    { name: 'Creación Base de Datos', start: '2024-05-01', end: '2024-07-31', phase: 1 },
    { name: 'Creación del Departamento de Licitaciones', start: '2024-06-01', end: '2024-07-15', phase: 1 },
    { name: 'Diseño de la Interfaz Web', start: '2024-07-01', end: '2024-09-30', phase: 1 },
    { name: 'Creación del Departamento de Gestión de Contratación', start: '2024-10-01', end: '2024-12-31', phase: 2 },
    { name: 'Login Seguro', start: '2024-11-15', end: '2025-02-28', phase: 2 },
    { name: 'Creación del Agente "Project Manager Personalizado"', start: '2025-01-01', end: '2025-03-31', phase: 2 },
    { name: 'Implementación del Sistema de Correo para los Agentes', start: '2025-01-01', end: '2025-03-31', phase: 2 },
    { name: 'Pruebas de Integración y Usuario', start: '2025-04-01', end: '2025-05-31', phase: 3 },
    { name: 'Gestión del Cambio', start: '2025-06-01', end: '2025-08-15', phase: 3 },
    { name: 'Infraestructura y Arquitectura', start: '2024-01-01', end: '2025-09-30', phase: 3 },
    { name: 'Gestión del Proyecto', start: '2024-01-01', end: '2025-09-30', phase: 3 },
  ];

  const milestones = [
    { name: 'Aprobación de Propuesta', date: '2024-03-31', phase: 0 },
    { name: 'Lanzamiento Versión Alfa', date: '2024-09-30', phase: 1 },
    { name: 'Revisión de Medio Término', date: '2025-03-31', phase: 2 },
    { name: 'Lanzamiento Final', date: '2025-09-30', phase: 3 },
  ];

  const startDate = new Date('2024-01-01');
  const endDate = new Date('2025-09-30');
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

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

  return (
    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Cronograma del Proyecto de Plataforma de Licitaciones IA</h2>
      <div className="relative border-l border-t border-gray-300 mt-12 ml-48 bg-white">
        <div className="absolute top-0 left-0 w-full h-full">
          {getQuarters().map((quarter, index) => (
            <React.Fragment key={index}>
              <div className="absolute border-l border-gray-200" style={{ left: `${getPositionPercentage(quarter)}%`, height: '100%', top: '0' }}>
                <span className="absolute -top-8 -left-10 text-xs text-gray-500 w-20 text-center">
                  {quarter.toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}
                </span>
              </div>
              <div className="absolute border-t border-gray-100" style={{ left: '0', right: '0', top: `${index * 40}px` }}></div>
            </React.Fragment>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50 to-transparent opacity-50"></div>
        </div>
        {phases.map((phase, index) => (
          <div key={index} className="mb-12 relative z-10">
            <div className="h-8 rounded-full relative mb-4 shadow-sm" style={{ 
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
                
                return (
                  <React.Fragment key={actIndex}>
                    <div className="h-8 mb-2 flex items-center relative">
                      <div className="absolute right-full pr-4 w-48 text-right">
                        <span className="text-xs font-medium text-gray-700">{activity.name}</span>
                      </div>
                      <div className="absolute h-6 rounded-full shadow-sm" style={{
                        backgroundColor: phase.color,
                        left: `${startPos}%`,
                        width: `${width}%`,
                        minWidth: '8px'
                      }}></div>
                    </div>
                    <div className="absolute border-t border-gray-100" style={{ left: '-48px', right: '0' }}></div>
                  </React.Fragment>
                );
              })}
              {milestones.filter(milestone => milestone.phase === index).map((milestone, milestoneIndex) => {
                const position = getPositionPercentage(milestone.date);
                
                return (
                  <React.Fragment key={milestoneIndex}>
                    <div className="h-8 mb-2 flex items-center relative">
                      <div className="absolute right-full pr-4 w-48 text-right">
                        <span className="text-xs font-medium text-gray-700">{milestone.name}</span>
                      </div>
                      <div className="absolute h-6 w-6 rounded-full bg-red-500 flex items-center justify-center shadow-sm" style={{
                        left: `${position}%`,
                        transform: 'translateX(-50%)'
                      }}>
                        <span className="text-white text-xs">★</span>
                      </div>
                    </div>
                    <div className="absolute border-t border-gray-100" style={{ left: '-48px', right: '0' }}></div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;