
'use client';

import { CalendarView } from "@/components/calendar-view";

export default function GuardianCalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Calendário Escolar</h1>
        <p className="text-muted-foreground">Consulte os eventos importantes da escola, feriados e reuniões.</p>
      </div>
      <CalendarView viewType="encarregado" />
    </div>
  );
}
