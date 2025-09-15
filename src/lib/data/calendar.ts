
export type EventType = 'deadline' | 'event' | 'appointment' | 'booked' | 'meeting';

export type CalendarEvent = {
  title: string;
  color: string;
  type: EventType;
  time?: string;
};

export const sampleEvents: Record<string, CalendarEvent[]> = {
  '2024-08-15': [{ title: 'Início das Provas', color: 'bg-red-500', type: 'event' }],
  '2024-08-22': [{ title: 'Entrega do Projeto', color: 'bg-yellow-500', type: 'deadline' }],
  '2024-08-05': [{ title: 'Feira de Ciências', color: 'bg-blue-500', type: 'event' }],
  '2024-08-10': [{ title: 'Reunião de Pais e Mestres', color: 'bg-blue-500', type: 'event' }],
  '2024-08-19': [{ title: 'Dúvidas de Matemática', color: 'bg-green-600', type: 'appointment', time: '10:00 - 11:00' }],
  '2024-08-21': [
      { title: 'Reunião com Encarregado', color: 'bg-green-600', type: 'appointment', time: '14:00 - 14:30' },
      { title: 'Dúvidas de História', color: 'bg-green-600', type: 'appointment', time: '15:00 - 16:00' },
  ],
   '2024-10-25': [{ title: 'Reunião: Família Pereira', color: 'bg-purple-600', type: 'meeting', time: '16:00 - 16:30' }],
};

export const calendarData = {
  '2024-08-15': [{ title: 'Entrega de Álgebra' }],
  '2024-08-18': [{ title: 'Entrega do Ensaio de História' }],
  '2024-08-20': [{ title: 'Quiz de Python' }],
  '2024-09-10': [{ title: 'Reunião de Pais e Mestres' }],
};
