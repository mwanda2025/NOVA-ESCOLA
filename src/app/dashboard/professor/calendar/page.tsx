
'use client';

import { useState } from "react";
import { CalendarView } from "@/components/calendar-view";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

export default function TeacherCalendarPage() {
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">Calendário do Professor</h1>
            <p className="text-muted-foreground">Gira a sua agenda, marque horários de atendimento e veja os eventos da escola.</p>
        </div>
         <Dialog open={isCreatingEvent} onOpenChange={setIsCreatingEvent}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Marcar Disponibilidade
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Marcar Novo Horário de Atendimento</DialogTitle>
                    <DialogDescription>
                        Crie um novo bloco de horário para atendimento a alunos ou encarregados. Eles poderão agendar este horário.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="event-title">Título do Horário</Label>
                        <Input id="event-title" placeholder="Ex: Horário de Dúvidas de Matemática" />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="event-date">Data</Label>
                            <Input id="event-date" type="date" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="event-time">Hora</Label>
                            <Input id="event-time" type="time" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => setIsCreatingEvent(false)}>Cancelar</Button>
                    <Button onClick={() => setIsCreatingEvent(false)}>Guardar Horário</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
      <CalendarView viewType="professor" />
    </div>
  );
}
