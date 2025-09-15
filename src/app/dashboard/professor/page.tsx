
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, FilePlus, ClipboardCheck, MessageSquare, CalendarPlus, ClipboardList, UserCheck } from "lucide-react";
import Link from 'next/link';
import { MeetingRequestCard } from "@/components/meeting-request-card";
import { meetingRequests } from "@/lib/data/meetings";

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Painel do Professor</h1>
        <p className="text-muted-foreground">Bem-vindo(a)! Gestão centralizada das suas atividades letivas.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Minhas Turmas
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Turmas ativas este semestre
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Trabalhos a Corrigir
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Envios pendentes de avaliação
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos de Reunião</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Aguardando a sua resposta
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Mensagens não lidas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas do Professor</CardTitle>
            <CardDescription>Atalhos para as suas tarefas mais frequentes.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button asChild variant="outline">
              <Link href="/dashboard/professor/content"><FilePlus className="mr-2 h-4 w-4" /> Publicar Conteúdo</Link>
            </Button>
             <Button asChild variant="outline">
              <Link href="/dashboard/professor/assignments"><ClipboardList className="mr-2 h-4 w-4" /> Gerir Trabalhos</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/assignments/grade"><ClipboardCheck className="mr-2 h-4 w-4" /> Corrigir com IA</Link>
            </Button>
             <Button asChild variant="outline">
              <Link href="#"><GraduationCap className="mr-2 h-4 w-4" /> Lançar Notas</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comunicação e Agendamento</CardTitle>
            <CardDescription>Aceda às suas mensagens e ao seu calendário.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/dashboard/professor/messages"><MessageSquare className="mr-2 h-4 w-4" /> Abrir Mensagens</Link>
            </Button>
             <Button asChild variant="outline" className="justify-start">
              <Link href="/dashboard/professor/calendar"><CalendarPlus className="mr-2 h-4 w-4" /> Ver Calendário</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Pedidos de Reunião Pendentes</CardTitle>
            <CardDescription>Responda aos pedidos de reunião dos encarregados de educação.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {meetingRequests.map((request, index) => (
                <MeetingRequestCard key={index} {...request} />
            ))}
          </CardContent>
        </Card>
    </div>
  )
}
