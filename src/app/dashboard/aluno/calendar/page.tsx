
'use client';

import { CalendarView } from "@/components/calendar-view";

export default function StudentCalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Calendário do Aluno</h1>
        <p className="text-muted-foreground">Consulte as suas aulas, prazos de trabalhos e agende horários de apoio.</p>
      </div>
      <CalendarView viewType="aluno" />
    </div>
  );
}
