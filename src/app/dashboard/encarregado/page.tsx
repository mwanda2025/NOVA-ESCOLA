
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ClipboardList, Percent, CalendarClock, Bell, FileDown, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const meetingSchema = z.object({
  teacher: z.string().min(1, "Selecione um professor."),
  reason: z.string().min(10, "Descreva o motivo com pelo menos 10 caracteres."),
  date: z.string().min(1, "Selecione uma data."),
  time: z.string().min(1, "Selecione uma hora."),
});

type MeetingFormData = z.infer<typeof meetingSchema>;

export default function GuardianDashboardPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingSchema)
  });

  const onSubmit = (data: MeetingFormData) => {
    console.log("Meeting request submitted:", data);
    toast({
      title: "Pedido Enviado!",
      description: "O seu pedido de reunião foi enviado para o professor. Será notificado quando ele responder.",
    });
    setIsDialogOpen(false);
    reset();
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Painel do Encarregado</h1>
        <p className="text-muted-foreground">Acompanhe o percurso educativo do seu educando.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral do Aluno</CardTitle>
          <div className="flex items-center gap-4 mt-2">
            <User className="h-8 w-8 text-primary" />
            <div>
                <p className="text-xl font-semibold">João da Silva</p>
                <p className="text-sm text-muted-foreground">Turma: 10º B</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Média de Notas
            </CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Média geral atual
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próximos Trabalhos
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Com prazo para esta semana
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assiduidade
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              Taxa de presença este mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Comunicados
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Comunicado não lido
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Comunicação com a Escola</CardTitle>
            <CardDescription>Aceda a mensagens e agende reuniões com os professores.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button asChild variant="outline">
                <Link href="/dashboard/encarregado/messages"><MessageCircle className="mr-2 h-4 w-4" /> Abrir Mensagens</Link>
              </Button>
               <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button><CalendarClock className="mr-2 h-4 w-4" /> Agendar Reunião</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agendar Reunião com Professor</DialogTitle>
                    <DialogDescription>
                      Selecione o professor e o motivo, e sugira um horário.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="teacher">Professor (Disciplina)</Label>
                      <Controller
                        name="teacher"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger id="teacher">
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="prof_mat">Prof. Borges (Matemática)</SelectItem>
                              <SelectItem value="prof_hist">Prof.ª Costa (História)</SelectItem>
                              <SelectItem value="prof_bio">Prof. Mendes (Biologia)</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.teacher && <p className="text-xs text-destructive">{errors.teacher.message}</p>}
                    </div>
                     <div className="grid gap-2">
                      <Label htmlFor="reason">Motivo da Reunião</Label>
                       <Controller
                        name="reason"
                        control={control}
                        render={({ field }) => (
                           <Textarea id="reason" placeholder="Ex: Dificuldades do aluno na matéria..." {...field} />
                        )}
                      />
                       {errors.reason && <p className="text-xs text-destructive">{errors.reason.message}</p>}
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="grid gap-2">
                          <Label htmlFor="date">Data Sugerida</Label>
                           <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                              <Input id="date" type="date" {...field} />
                            )}
                          />
                          {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="time">Hora Sugerida</Label>
                           <Controller
                            name="time"
                            control={control}
                            render={({ field }) => (
                               <Input id="time" type="time" {...field} />
                            )}
                          />
                          {errors.time && <p className="text-xs text-destructive">{errors.time.message}</p>}
                        </div>
                    </div>
                     <DialogFooter>
                      <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                      <Button type="submit">Enviar Pedido</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acesso Rápido</CardTitle>
            <CardDescription>Veja detalhes sobre o desempenho do seu educando.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button asChild variant="outline" className="justify-start">
                <Link href="#"><Percent className="mr-2 h-4 w-4" /> Ver Notas Detalhadas</Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                 <Link href="/dashboard/encarregado/assignments"><ClipboardList className="mr-2 h-4 w-4" /> Ver Trabalhos</Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                 <Link href="#"><CalendarClock className="mr-2 h-4 w-4" /> Ver Histórico de Faltas</Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                 <Link href="/dashboard/encarregado/community"><Bell className="mr-2 h-4 w-4" /> Avisos da Comunidade</Link>
              </Button>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Relatório Mensal do Aluno</CardTitle>
          <CardDescription>Resumo do desempenho no último mês.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Desempenho Académico</h4>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">85%</span>
              <div className="w-full">
                <p className="text-sm text-muted-foreground">Média Geral</p>
                <Progress value={85} className="w-full" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Trabalhos</h4>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Entregues</p>
                </div>
              </div>
               <div className="flex items-center gap-2 mt-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-bold">2</p>
                  <p className="text-xs text-muted-foreground">Pendentes</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Assiduidade</h4>
               <div className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-bold">98%</p>
                  <p className="text-xs text-muted-foreground">Presença nas Aulas</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Exportar como PDF
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
