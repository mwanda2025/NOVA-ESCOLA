
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { add, eachDayOfInterval, endOfWeek, format, startOfWeek, isToday as isTodayDateFns } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { sampleEvents, CalendarEvent } from '@/lib/data/calendar';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];


const EventBadge = ({ event, onBook, canBook }: { event: CalendarEvent, onBook: (event: CalendarEvent) => void, canBook: boolean }) => {
    if (event.type === 'appointment' && canBook) {
        return (
             <Dialog>
                <DialogTrigger asChild>
                    <button className={cn("w-full text-left text-xs font-normal whitespace-normal mb-1 p-1 rounded-md transition-colors hover:bg-opacity-80", event.color, "text-white cursor-pointer")}>
                        <div className="font-semibold">{event.title}</div>
                        {event.time && <div className="text-xs">{event.time}</div>}
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar Agendamento</DialogTitle>
                        <DialogDescription>
                            Tem a certeza de que deseja marcar este horário?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 my-4">
                        <div className="flex items-center gap-2 p-4 bg-muted rounded-md">
                            <Clock className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-bold">{event.title}</p>
                                <p className="text-sm text-muted-foreground">{event.time}</p>
                            </div>
                        </div>
                         <p className="text-sm text-muted-foreground">Após a confirmação, o professor será notificado. O horário será reservado para si.</p>
                    </div>
                    <DialogFooter>
                        <DialogTrigger>
                           <Button variant="ghost">Cancelar</Button>
                        </DialogTrigger>
                        <DialogTrigger>
                            <Button onClick={() => onBook(event)}><CheckCircle className="mr-2 h-4 w-4" /> Confirmar</Button>
                        </DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
    
    return (
        <Badge className={cn("w-full text-left text-xs font-normal whitespace-normal mb-1 p-1 rounded-md", event.color, "text-white")}>
            <div className="font-semibold">{event.title}</div>
            {event.time && <div className="text-xs">{event.time}</div>}
        </Badge>
    );
};


const MonthlyView = ({ currentDate, handlePrevMonth, handleNextMonth, handleToday, events, onBookEvent, canBook }: { currentDate: Date, handlePrevMonth: () => void, handleNextMonth: () => void, handleToday: () => void, events: Record<string, CalendarEvent[]>, onBookEvent: (date: string, event: CalendarEvent) => void, canBook: boolean }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold font-headline">{months[month]} {year}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleToday}>Hoje</Button>
          <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px border-t border-l bg-border">
        {daysOfWeek.map(day => (
          <div key={day} className="py-2 text-center font-medium text-sm text-muted-foreground bg-card">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="border-b border-r bg-muted/50" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, day) => {
          const date = day + 1;
          const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
          const isToday = isTodayDateFns(new Date(year, month, date));
          const dayEvents = events[fullDate] || [];

          return (
            <div key={date} className="relative h-32 p-2 border-b border-r bg-card flex flex-col">
              <span className={cn(
                "font-medium h-7 w-7 flex items-center justify-center",
                isToday ? "bg-primary text-primary-foreground rounded-full" : "text-foreground"
              )}>
                {date}
              </span>
              <div className="mt-1 flex-grow overflow-y-auto">
                {dayEvents.map((event, index) => (
                   <EventBadge key={index} event={event} onBook={() => onBookEvent(fullDate, event)} canBook={canBook} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const WeeklyView = ({ currentDate, handlePrevWeek, handleNextWeek, handleToday, events, onBookEvent, canBook }: { currentDate: Date, handlePrevWeek: () => void, handleNextWeek: () => void, handleToday: () => void, events: Record<string, CalendarEvent[]>, onBookEvent: (date: string, event: CalendarEvent) => void, canBook: boolean }) => {
    const weekStart = startOfWeek(currentDate, { locale: pt });
    const weekEnd = endOfWeek(currentDate, { locale: pt });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
         <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-headline">
                    {format(weekStart, 'd MMM', { locale: pt })} - {format(weekEnd, 'd MMM, yyyy', { locale: pt })}
                </h2>
                <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" onClick={handleToday}>Hoje</Button>
                    <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleNextWeek}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col">
                {days.map(day => {
                    const fullDate = format(day, 'yyyy-MM-dd');
                    const isToday = isTodayDateFns(day);
                    const dayEvents = events[fullDate] || [];
                    return (
                        <div key={fullDate} className="flex border-t py-2 min-h-20">
                            <div className="w-16 flex flex-col items-center">
                                <span className="text-sm text-muted-foreground">{format(day, 'EEE', { locale: pt })}</span>
                                <span className={cn(
                                    "font-medium mt-1 text-lg h-7 w-7 flex items-center justify-center",
                                    isToday ? "bg-primary text-primary-foreground rounded-full" : "text-foreground"
                                )}>
                                    {format(day, 'd')}
                                </span>
                            </div>
                            <div className="flex-1 border-l pl-4">
                                {dayEvents.length > 0 ? dayEvents.map((event, index) => (
                                     <EventBadge key={index} event={event} onBook={() => onBookEvent(fullDate, event)} canBook={canBook} />
                                )) : <p className="text-sm text-muted-foreground h-full flex items-center">Nenhum evento.</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

type CalendarViewProps = {
  viewType: 'aluno' | 'professor' | 'encarregado';
};

export function CalendarView({ viewType }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(sampleEvents);
  const isMobile = useIsMobile();
  const [view, setView] = useState('month');
  
  useEffect(() => {
    setView(isMobile ? 'week' : 'month');
  }, [isMobile]);
  
  // This would come from a real data source
  useEffect(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const dynamicEvents = { ...sampleEvents };
    dynamicEvents[`${y}-${m}-15`] = [{ title: 'Início das Provas', color: 'bg-red-500', type: 'event' }];
    dynamicEvents[`${y}-${m}-22`] = [{ title: 'Entrega do Projeto', color: 'bg-yellow-500', type: 'deadline' }];
    setEvents(dynamicEvents);
  }, []);

  const handleBookEvent = (date: string, eventToBook: CalendarEvent) => {
    setEvents(prevEvents => {
        const dayEvents = prevEvents[date] || [];
        const updatedDayEvents = dayEvents.map(event => {
            if (event.title === eventToBook.title && event.time === eventToBook.time) {
                return { ...event, title: `Reservado: ${event.title}`, type: 'booked', color: 'bg-gray-400' } as CalendarEvent;
            }
            return event;
        });
        return { ...prevEvents, [date]: updatedDayEvents };
    });
  };

  const handlePrev = () => {
    if (view === 'month') {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    } else {
        setCurrentDate(prev => add(prev, { weeks: -1 }));
    }
  };

  const handleNext = () => {
    if (view === 'month') {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    } else {
        setCurrentDate(prev => add(prev, { weeks: 1 }));
    }
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const canBook = viewType === 'aluno' || viewType === 'encarregado';

  return (
    <div className="p-4 bg-card rounded-lg shadow-sm">
      {view === 'month' ? (
        <MonthlyView 
            currentDate={currentDate} 
            handlePrevMonth={handlePrev} 
            handleNextMonth={handleNext} 
            handleToday={handleToday}
            events={events}
            onBookEvent={handleBookEvent}
            canBook={canBook}
        />
      ) : (
        <WeeklyView 
            currentDate={currentDate} 
            handlePrevWeek={handlePrev} 
            handleNextWeek={handleNext}
            handleToday={handleToday}
            events={events}
            onBookEvent={handleBookEvent}
            canBook={canBook}
        />
      )}
    </div>
  );
}
